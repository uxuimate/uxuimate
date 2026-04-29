import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');
const ignoreDirs = new Set(['node_modules', 'build', 'dist', '.git']);
const external = new Map();

const walk = currentDir => {
  for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
    const fullPath = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) {
        continue;
      }
      walk(fullPath);
      continue;
    }

    if (!/\.(jsx?|tsx?)$/.test(entry.name)) {
      continue;
    }

    const relPath = path.relative(root, fullPath).replace(/\\/g, '/');
    if (relPath.startsWith('src/assets/vendor/')) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    for (const match of content.matchAll(/\b(?:to|href)\s*[:=]\s*["'](https?:\/\/[^"']+)["']/g)) {
      const url = match[1];
      if (!external.has(url)) {
        external.set(url, []);
      }
      external.get(url).push(relPath);
    }
  }
};

const checkUrl = async url => {
  try {
    const head = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (head.ok || head.status === 405) {
      return { ok: true, status: head.status };
    }
    const get = await fetch(url, { method: 'GET', redirect: 'follow' });
    return { ok: get.ok, status: get.status };
  } catch (error) {
    return { ok: false, status: 'ERR', error: error.message };
  }
};

walk(srcDir);

console.log(`UNIQUE_EXTERNAL_LINKS ${external.size}`);

let failures = 0;
for (const [url, files] of external.entries()) {
  const result = await checkUrl(url);
  if (!result.ok) {
    failures += 1;
  }
  console.log(
    `${result.ok ? 'OK' : 'FAIL'} | ${result.status} | ${url} | ${[...new Set(files)].join(', ')}`
  );
}

console.log(`FAILURES ${failures}`);
