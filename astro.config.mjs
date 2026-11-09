// @ts-check
import { defineConfig } from 'astro/config';
import { execFileSync } from 'node:child_process';

// Pull fresh data from GitHub at the start of every build (study notes and the Now page),
// whichever command runs the build. Each script keeps its last good data if GitHub can't be reached.
const syncData = {
  name: 'sync-github-data',
  hooks: {
    'astro:config:setup': ({ command, logger }) => {
      if (command !== 'build' || process.env.SKIP_SYNC) return;
      for (const script of ['scripts/sync-notes.mjs', 'scripts/sync-now.mjs']) {
        try {
          execFileSync(process.execPath, [script], { stdio: 'inherit' });
        } catch {
          logger.warn(`${script} failed; building with the last synced data`);
        }
      }
    },
  },
};

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Public address; used for canonical links, link previews and the sitemap.
  site: 'https://jakeroberts.vercel.app',
  integrations: [syncData],
});
