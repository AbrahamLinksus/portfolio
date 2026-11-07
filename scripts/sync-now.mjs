// Sync recent GitHub activity for the Now page.
//
// Runs before every build. For each repo in src/data/now.ts it makes (or updates) a bare,
// blob-less clone, so only commit history is downloaded, and reads the latest commits.
// Plain git over HTTPS: no API token and no rate limits.
// Writes src/data/now.json. If a repo can't be reached, its last synced entry is kept.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, '.cache', 'now');
const OUT = join(ROOT, 'src', 'data', 'now.json');
const SRC = join(ROOT, 'src', 'data', 'now.ts');

// Read the repo list from now.ts without a TypeScript loader.
const repos = [...readFileSync(SRC, 'utf8').matchAll(/repo:\s*'([^']+)'/g)].map((m) => m[1]);

const previous = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : { repos: {} };
const out = { syncedAt: new Date().toISOString(), repos: {} };

for (const repo of repos) {
  const dir = join(CACHE, repo.replace('/', '__') + '.git');
  try {
    if (existsSync(dir)) {
      execFileSync('git', ['-C', dir, 'fetch', '--quiet', '--prune', '--filter=blob:none', 'origin', '+refs/heads/*:refs/heads/*'], { stdio: 'pipe' });
    } else {
      mkdirSync(CACHE, { recursive: true });
      execFileSync('git', ['clone', '--quiet', '--bare', '--filter=blob:none', `https://github.com/${repo}`, dir], { stdio: 'pipe' });
    }
    const git = (...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8' }).trim();
    const log = git('log', '-n', '5', '--format=%H%x1f%aI%x1f%s', 'HEAD')
      .split('\n')
      .filter(Boolean)
      .map((l) => {
        const [sha, date, subject] = l.split('\x1f');
        return { sha: sha.slice(0, 7), date, subject };
      });
    out.repos[repo] = {
      branch: git('symbolic-ref', '--short', 'HEAD'),
      total: Number(git('rev-list', '--count', 'HEAD')),
      last30: Number(git('rev-list', '--count', '--since=30.days', 'HEAD')),
      commits: log,
    };
    console.log(`[sync-now] ${repo}: ${out.repos[repo].total} commits, last ${log[0]?.date.slice(0, 10) ?? 'never'}`);
  } catch (e) {
    if (previous.repos?.[repo]) out.repos[repo] = previous.repos[repo];
    console.warn(`[sync-now] ${repo}: could not sync (${String(e.message).split('\n')[0]}); ${previous.repos?.[repo] ? 'kept last sync' : 'skipped'}`);
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
