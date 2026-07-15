const fs = require('fs');
const path = require('path');

const IGNORED_DIRS = new Set(['node_modules', '.git', '.venv', '.next']);
const LOG_PATTERNS = [
  /^.*\.log$/i,
  /^npm-debug.log/i,
  /^yarn-error.log/i,
  /^pnpm-debug.log/i,
  /^lerna-debug.log/i,
  /^build\.log$/i,
];

function shouldIgnore(dir) {
  return IGNORED_DIRS.has(path.basename(dir));
}

function matchesLog(filename) {
  return LOG_PATTERNS.some((re) => re.test(filename));
}

async function walkAndClean(dir) {
  let entries;
  try {
    entries = await fs.promises.readdir(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (shouldIgnore(entry.name)) continue;
      await walkAndClean(full);
      continue;
    }

    if (matchesLog(entry.name)) {
      try {
        await fs.promises.unlink(full);
        console.log('Deleted log file:', full);
      } catch (err) {
        // If delete fails, try truncating
        try {
          await fs.promises.truncate(full, 0);
          console.log('Truncated log file:', full);
        } catch (err2) {
          console.warn('Could not remove/truncate:', full, err2.message);
        }
      }
    }
  }
}

(async () => {
  const root = process.cwd();
  console.log('Cleaning log files under', root);
  await walkAndClean(root);
  console.log('Log cleanup complete.');
})();
