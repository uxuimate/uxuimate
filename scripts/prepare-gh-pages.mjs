import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const buildDir = resolve(process.cwd(), 'dist');
const indexHtml = resolve(buildDir, 'index.html');
const notFoundHtml = resolve(buildDir, '404.html');
const noJekyll = resolve(buildDir, '.nojekyll');

copyFileSync(indexHtml, notFoundHtml);
writeFileSync(noJekyll, '', 'utf8');

