// Sync recent GitHub activity for the Now page.
//
// Runs before every build.
// 1. Finds repos: asks the GitHub API for every public repo of the owner, sorted by last push,
//    and keeps the ones pushed in the last WINDOW_DAYS (not forks, not archived, not excluded).
//    If the API can't be reached, it falls back to the repos listed in src/data/now.ts.
// 2. Reads commits: for each repo it makes (or updates) a bare, blob-less clone and reads the
//    latest commits with plain git, so no token is needed and there are no rate limits.
// Writes src/data/now.json. If a repo can't be reached, its last synced entry is kept.
// Set GITHUB_TOKEN to raise the API limit (optional; one API call is made per build).

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, '.cache', 'now');
const OUT = join(ROOT, 'src', 'data', 'now.json');
const SRC = join(ROOT, 'src', 'data', 'now.ts');

// Read settings from now.ts without a TypeScript loader.
const src = readFileSync(SRC, 'utf8');
const OWNER = src.match(/NOW_OWNER\s*=\s*'([^']+)'/)?.[1] ?? 'AbrahamLinksus';
const WINDOW_DAYS = Number(src.match(/WINDOW_DAYS\s*=\s*(\d+)/)?.[1] ?? 7);
const listed = [...src.matchAll(/repo:\s*'([^']+)'/g)].map((m) => m[1]);
const excludeBlock = src.match(/nowExclude[^=]*=\s*\[([\s\S]*?)\]/)?.[1] ?? '';
const exclude = new Set([...excludeBlock.matchAll(/'([^']+)'/g)].map((m) => m[1].toLowerCase()));

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { repos: {} };
const out = { syncedAt: new Date().toISOString(), source: 'list', repos: {} };

// 1. Which repos to read.
let candidates = [];
try {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-now-sync' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${OWNER}/repos?per_page=100&sort=pushed&type=owner`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const all = await res.json();
  if (!Array.isArray(all)) throw new Error('unexpected API response');
  const since = Date.now() - (WINDOW_DAYS + 1) * 864e5; // a day of slack; the page applies the exact window
  candidates = all
    .filter((r) => !r.fork && !r.archived && !exclude.has(r.full_name.toLowerCase()) && Date.parse(r.pushed_at) >= since)
    .map((r) => ({ repo: r.full_name, description: r.description ?? '', language: r.language ?? '', url: r.html_url }));
  out.source = 'github';
  console.log(`[sync-now] GitHub: ${all.length} repos, ${candidates.length} pushed in the last ${WINDOW_DAYS} days`);
} catch (e) {
  candidates = listed.filter((r) => !exclude.has(r.toLowerCase())).map((repo) => ({ repo, description: '', language: '' }));
  console.warn(`[sync-now] could not list repos (${String(e.message).split('\n')[0]}); using the ${candidates.length} repos in now.ts`);
}

// 2. Latest commits for each repo.
for (const c of candidates) {
  const { repo } = c;
  const dir = join(CACHE, repo.replace('/', '__') + '.git');
  try {
    if (existsSync(dir)) {
      execFileSync('git', ['-C', dir, 'fetch', '--quiet', '--prune', '--filter=blob:none', 'origin', '+refs/heads/*:refs/heads/*'], { stdio: 'pipe' });
    } else {
      mkdirSync(CACHE, { recursive: true });
      execFileSync('git', ['clone', '--quiet', '--bare', '--filter=blob:none', `https://github.com/${repo}`, dir], { stdio: 'pipe' });
    }
    const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8' }).trim();
    const commits = git('log', '-n', '5', '--format=%H%x1f%aI%x1f%s', 'HEAD')
      .split('\n')
      .filter(Boolean)
      .map((l) => {
        const [sha, date, subject] = l.split('\x1f');
        return { sha: sha.slice(0, 7), date, subject };
      });
    out.repos[repo] = {
      description: c.description || previous.repos?.[repo]?.description || '',
      language: c.language || previous.repos?.[repo]?.language || '',
      branch: git('symbolic-ref', '--short', 'HEAD'),
      total: Number(git('rev-list', '--count', 'HEAD')),
      last30: Number(git('rev-list', '--count', '--since=30.days', 'HEAD')),
      commits,
    };
    console.log(`[sync-now] ${repo}: last push ${commits[0]?.date.slice(0, 10) ?? 'never'}`);
  } catch (e) {
    if (previous.repos?.[repo]) out.repos[repo] = previous.repos[repo];
    console.warn(`[sync-now] ${repo}: could not sync (${String(e.message).split('\n')[0]}); ${previous.repos?.[repo] ? 'kept last sync' : 'skipped'}`);
  }
}

// If nothing could be read at all, keep the last good file rather than emptying the page.
if (!Object.keys(out.repos).length && Object.keys(previous.repos ?? {}).length) {
  console.warn('[sync-now] nothing synced; keeping the previous now.json');
} else {
  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
}
