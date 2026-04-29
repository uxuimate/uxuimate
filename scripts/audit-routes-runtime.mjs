import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseUrl = process.argv[2] || 'http://127.0.0.1:4173';
const routeSource = fs.readFileSync(path.join(root, 'src', 'routes', 'index.jsx'), 'utf8');
const routes = [...routeSource.matchAll(/path:\s*'([^']+)'/g)].map(match => match[1]);
const uniqueRoutes = [...new Set(routes)];

let failures = 0;
console.log(`ROUTES ${uniqueRoutes.length}`);

for (const route of uniqueRoutes) {
  const url = `${baseUrl}${route}`;
  try {
    const response = await fetch(url, { redirect: 'follow' });
    const ok = response.status >= 200 && response.status < 400;
    if (!ok) {
      failures += 1;
    }
    console.log(`${ok ? 'OK' : 'FAIL'} | ${response.status} | ${route}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL | ERR | ${route} | ${error.message}`);
  }
}

console.log(`FAILURES ${failures}`);
