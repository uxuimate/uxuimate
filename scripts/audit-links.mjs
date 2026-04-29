import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const SRC_DIR = path.join(root, 'src');
const ROUTES_FILE = path.join(SRC_DIR, 'routes', 'index.jsx');

const routeFileContent = fs.readFileSync(ROUTES_FILE, 'utf8');
const routePaths = new Set(
  [...routeFileContent.matchAll(/path:\s*'([^']+)'/g)].map(match => match[1])
);

const linkRefs = [];
const ignoreDirs = new Set(['node_modules', 'build', 'dist', '.git']);

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
    for (const match of content.matchAll(/\b(?:to|href)=["']([^"']*)["']/g)) {
      linkRefs.push({
        file: relPath,
        value: match[1]
      });
    }
  }
};

walk(SRC_DIR);

const issues = [];

for (const link of linkRefs) {
  const value = link.value.trim();

  if (value === '') {
    issues.push({ ...link, issue: 'empty-link', resolvedPath: '' });
    continue;
  }

  if (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('#')
  ) {
    continue;
  }

  if (!value.startsWith('/')) {
    continue;
  }

  const resolvedPath = value.split('#')[0].split('?')[0] || '/';
  if (!routePaths.has(resolvedPath)) {
    issues.push({ ...link, issue: 'missing-route', resolvedPath });
  }
}

console.log(`ROUTES ${routePaths.size}`);
console.log(`LINKS ${linkRefs.length}`);
console.log(`ISSUES ${issues.length}`);

for (const issue of issues) {
  console.log(
    `${issue.issue} | ${issue.value} | ${issue.resolvedPath} | ${issue.file}`
  );
}
