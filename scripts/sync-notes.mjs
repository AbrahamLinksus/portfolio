// Sync study notes from the notes repo into the Skill Cortex.
//
// Runs before every build (npm "prebuild"). It clones github.com/AbrahamLinksus/notes,
// reads every Markdown note and the commit history, and writes
// src/data/knowledge/notes.json, which the Skills page turns into topic neurons and memories.
//
// If the repo can't be reached (offline, GitHub down), the last committed notes.json is kept,
// so the build never fails because of the notes repo.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = process.env.NOTES_REPO ?? 'https://github.com/AbrahamLinksus/notes';
const BRANCH = process.env.NOTES_BRANCH ?? 'main';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, '.cache', 'notes');
const OUT = join(ROOT, 'src', 'data', 'knowledge', 'notes.json');
const ACTIONS = new Set(['learn', 'revise', 'plan', 'move', 'chore']);

const git = (...args) => execFileSync('git', ['-C', CACHE, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

function fetchRepo() {
  if (existsSync(join(CACHE, '.git'))) {
    git('fetch', '--quiet', 'origin', BRANCH);
    git('reset', '--quiet', '--hard', `origin/${BRANCH}`);
  } else {
    rmSync(CACHE, { recursive: true, force: true });
    mkdirSync(dirname(CACHE), { recursive: true });
    execFileSync('git', ['clone', '--quiet', '--branch', BRANCH, REPO, CACHE], { stdio: 'pipe' });
  }
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.md') ? [p] : [];
  });
}

// "studied: 2026-11-07 · status: done · source: Data_Science.pdf (p. 27)"
function parseMeta(line) {
  const meta = {};
  for (const part of line.split('·')) {
    const m = part.match(/^\s*(studied|status|source)\s*:\s*(.+?)\s*$/i);
    if (m) meta[m[1].toLowerCase()] = m[2];
  }
  return meta;
}

function parseNote(abs, rel) {
  const text = readFileSync(abs, 'utf8');
  const lines = text.split(/\r?\n/);
  const title = (lines.find((l) => /^#\s+/.test(l)) ?? '').replace(/^#\s+/, '').trim() || posix.basename(rel, '.md');
  const takeaway = (lines.find((l) => /^>\s*/.test(l)) ?? '').replace(/^>\s*/, '').trim();
  const metaLine = lines.find((l) => /studied\s*:|status\s*:/i.test(l)) ?? '';
  const meta = parseMeta(metaLine);
  const status = ['done', 'sketch', 'planned'].includes((meta.status ?? '').toLowerCase()) ? meta.status.toLowerCase() : 'done';
  // Relative Markdown links to other notes become threads between memories.
  const links = [...text.matchAll(/\]\(([^)\s]+\.md)\)/g)]
    .map((m) => posix.normalize(posix.join(posix.dirname(rel), m[1])))
    .filter((p) => !p.startsWith('..'));
  return { title, takeaway, studied: meta.studied ?? null, status, source: meta.source ?? null, links };
}

// "- data-science/nlp → skill: natural language processing · region: data science (suggested)"
function parseTopics(file) {
  if (!existsSync(file)) return {};
  const out = {};
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*[-*]\s*`?([a-z0-9][a-z0-9/_-]*)`?\s*(?:→|->)\s*(.+)$/i);
    if (!m) continue;
    const entry = { suggested: /\(suggested\)/i.test(m[2]) };
    for (const part of m[2].replace(/\(suggested\)/i, '').split('·')) {
      const kv = part.match(/^\s*(skill|region|level)\s*:\s*(.+?)\s*$/i);
      if (kv) entry[kv[1].toLowerCase()] = kv[2];
    }
    out[m[1].replace(/\/+$/, '')] = entry;
  }
  return out;
}

// Walk the history oldest-first to learn when each note appeared and how often it was revised.
function readHistory() {
  const raw = git('log', '--reverse', '--format=%x1e%H%x1f%aI%x1f%s', '--name-status', '-M', BRANCH, '--', 'notes');
  const notes = new Map(); // path -> { firstSeen, lastChanged, revisions, actions:Set }
  for (const block of raw.split('\x1e').filter(Boolean)) {
    const [head, ...rest] = block.split('\n');
    const [sha, date, subject] = head.split('\x1f');
    const cm = subject.match(/^(\w+)\(([^)]+)\)\s*:/);
    const action = cm && ACTIONS.has(cm[1]) ? cm[1] : null;
    for (const line of rest.filter((l) => l.trim())) {
      const [st, a, b] = line.split('\t');
      const path = st.startsWith('R') ? b : a;
      if (!path?.endsWith('.md')) continue;
      if (st.startsWith('R') && notes.has(a)) { notes.set(b, notes.get(a)); notes.delete(a); }
      if (st === 'D') { notes.delete(path); continue; }
      const rec = notes.get(path) ?? { firstSeen: date, lastChanged: date, revisions: 0, sha };
      if (st === 'M' && action === 'revise') rec.revisions++;
      rec.lastChanged = date;
      notes.set(path, rec);
    }
  }
  return notes;
}

function main() {
  try {
    fetchRepo();
  } catch (e) {
    console.warn(`[sync-notes] Could not reach ${REPO}; keeping the last synced notes.json. (${String(e.message).split('\n')[0]})`);
    return;
  }
  const notesDir = join(CACHE, 'notes');
  const history = readHistory();
  const files = existsSync(notesDir) ? walk(notesDir) : [];
  const topics = new Map();
  for (const abs of files.sort()) {
    const rel = relative(CACHE, abs).split('\\').join('/'); // notes/data-science/nlp/tf-idf.md
    const topic = posix.dirname(rel).replace(/^notes\/?/, '');
    if (!topic) continue;
    const note = parseNote(abs, rel);
    const h = history.get(rel);
    const item = {
      title: note.title,
      takeaway: note.takeaway,
      path: rel,
      day: note.studied ?? (h ? h.firstSeen.slice(0, 10) : null),
      kind: 'note',
      status: note.status,
      source: note.source,
      firstSeen: h?.firstSeen ?? null,
      lastChanged: h?.lastChanged ?? null,
      revisions: h?.revisions ?? 0,
      links: note.links,
    };
    if (!topics.has(topic)) topics.set(topic, []);
    topics.get(topic).push(item);
  }
  const topicMap = parseTopics(join(CACHE, '_topics.md'));
  const head = git('rev-parse', 'HEAD').trim();
  const data = {
    source: 'notes',
    url: REPO,
    branch: BRANCH,
    commit: head,
    syncedAt: new Date().toISOString(),
    topics: [...topics.entries()].map(([topic, items]) => ({ topic, map: topicMap[topic] ?? null, items })),
  };
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 1) + '\n');
  const count = data.topics.reduce((n, t) => n + t.items.length, 0);
  console.log(`[sync-notes] ${count} notes in ${data.topics.length} topics from ${REPO}@${head.slice(0, 7)}`);
}

main();
