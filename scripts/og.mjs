// Generates the link-preview images (1200x630) in public/og/.
// Run by hand after changing a page title or a project: `node scripts/og.mjs`
// Needs Playwright with Chromium installed (not a project dependency, so Vercel never runs this).
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/og');
const HOST = 'jakeroberts.vercel.app';
const COLORS = { pink: '#f4507a', teal: '#5cc8c0', yellow: '#f6d23a', orange: '#ff8a1f', lime: '#9bdb6a' };

// Minimal front-matter reader: only the flat `key: value` fields the cards need.
const frontmatter = (file) => {
  const block = readFileSync(file, 'utf8').split('---')[1] ?? '';
  const data = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^(\w+):\s*(.+)$/);
    if (m) data[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
};

// The homepage card shows the cut-out photo (inlined, since the card is rendered from a string).
const PHOTO = `data:image/webp;base64,${readFileSync(join(ROOT, 'public/images/me.webp')).toString('base64')}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pages = [
  { key: 'home', title: 'Software<br>Engineer', line: 'Projects, case studies and skills. Open to software, AI and data roles.', stickers: true },
  { key: 'about', title: 'About', line: 'Computer Science at SRM IST, class of 2027. Building tools for problems I run into myself.', letter: 'A', color: 'teal' },
  { key: 'projects', title: 'Projects', line: 'Case studies: the problem, the decisions, and what I learned.', letter: 'P', color: 'pink' },
  { key: 'skills', title: 'Skills', line: 'Every skill, its level, and the projects where I used it.', letter: 'S', color: 'yellow' },
  { key: 'contact', title: 'Contact', line: 'Write to me about a role, a project, or anything else.', letter: 'C', color: 'lime' },
];

const dir = join(ROOT, 'src/content/projects');
for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
  const d = frontmatter(join(dir, f));
  pages.push({
    key: `projects-${f.replace(/\.md$/, '')}`,
    kicker: 'Case study',
    title: esc(d.title),
    line: esc(d.summary),
    letter: d.letter,
    color: d.color,
    status: d.status,
    small: true,
  });
}

const html = (p) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Geist:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@900&display=swap">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0e0e0f; color: #f2ece4; font-family: Geist, sans-serif; position: relative; }
  .left { position: absolute; left: 72px; top: 64px; bottom: 60px; width: ${p.stickers || p.letter ? 700 : 1050}px; display: flex; flex-direction: column; }
  .kick { font: 500 20px 'JetBrains Mono', monospace; letter-spacing: .12em; text-transform: uppercase; color: #a7a29b; display: flex; align-items: center; gap: 14px; }
  .dot { width: 14px; height: 14px; border-radius: 50%; background: #9bdb6a; box-shadow: 0 0 0 6px rgba(155,219,106,.18); }
  h1 { margin-top: 34px; font: 400 ${p.small ? 104 : 150}px/0.9 Anton, sans-serif; text-transform: uppercase; letter-spacing: -.01em; }
  p { margin-top: 30px; font-size: 28px; line-height: 1.4; color: #a7a29b; max-width: 640px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .foot { margin-top: auto; font: 500 20px 'JetBrains Mono', monospace; letter-spacing: .06em; color: #f2ece4; }
  .panel { position: absolute; right: 0; top: 0; bottom: 0; width: ${p.stickers ? 470 : 400}px; border-radius: 999px 0 0 999px; background-color: #f2ece4;
    background-image: linear-gradient(#d6cfc4 1px, transparent 1px), linear-gradient(90deg, #d6cfc4 1px, transparent 1px); background-size: 44px 44px; }
  .letter { position: absolute; left: 50%; top: 50%; width: 270px; height: 270px; margin: -135px 0 0 -110px; border-radius: 50%; display: grid; place-items: center;
    font: 900 190px/1 'Playfair Display', serif; color: #111112; transform: rotate(-7deg); box-shadow: 0 6px 0 rgba(0,0,0,.25); }
  .st { position: absolute; font: 800 26px/1.05 'Bricolage Grotesque', sans-serif; text-transform: uppercase; color: #111112; padding: 14px 20px; border-radius: 16px; box-shadow: 0 4px 0 rgba(0,0,0,.25); }
  .status { position: absolute; right: 70px; bottom: 74px; font: 500 18px 'JetBrains Mono', monospace; letter-spacing: .1em; text-transform: uppercase; color: #111112; background: #f2ece4; border: 2px solid #111112; padding: 8px 14px; border-radius: 99px; transform: rotate(5deg); }
</style></head><body>
<div class="left">
  <div class="kick"><span class="dot"></span>Jake Roberts${p.kicker ? ` · ${p.kicker}` : ' · Software · AI · Data'}</div>
  <h1>${p.title}</h1>
  <p>${p.line}</p>
  <div class="foot">${HOST}</div>
</div>
${
  p.stickers
    ? `<div class="panel">
        <img src="${PHOTO}" style="position:absolute;left:58%;bottom:0;height:88%;transform:translateX(-50%)" alt="">
        <span class="st" style="background:${COLORS.pink};left:40px;top:70px;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;text-align:center;font-size:22px;transform:rotate(-8deg)">Case<br>studies</span>
        <span class="st" style="background:${COLORS.yellow};left:24px;top:390px;font-size:22px;transform:rotate(6deg)">Skills &amp;<br>tools →</span>
        <span class="st" style="background:${COLORS.lime};right:26px;top:300px;width:112px;height:112px;border-radius:50%;display:grid;place-items:center;text-align:center;font-size:18px;transform:rotate(10deg)">Say<br>hello</span>
      </div>`
    : p.letter
      ? `<div class="panel"><span class="letter" style="background:${COLORS[p.color] ?? COLORS.pink}">${esc(p.letter)}</span>${p.status ? `<span class="status">${esc(p.status)}</span>` : ''}</div>`
      : ''
}
</body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  await page.setContent(html(p), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, `${p.key}.png`) });
  console.log('wrote', `public/og/${p.key}.png`);
}
await browser.close();
