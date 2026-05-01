const fs = require('fs');
const path = require('path');

const root = process.cwd();
const srcRoot = path.join(root, 'src');
const pubRoot = path.join(root, 'public');
const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);
const changedFiles = [];

const imageRefRegex = /(["'])([^"']+?\.(?:png|jpg|jpeg))\1/gi;

function resolveRefPath(filePath, refPath) {
  if (refPath.startsWith('/img/')) {
    return path.join(pubRoot, refPath.slice(1));
  }
  if (refPath.startsWith('@/')) {
    return path.join(srcRoot, refPath.slice(2));
  }
  if (refPath.startsWith('./') || refPath.startsWith('../')) {
    return path.resolve(path.dirname(filePath), refPath);
  }
  return null;
}

function walk(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!exts.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    const source = fs.readFileSync(fullPath, 'utf8');
    let didReplace = false;

    const updated = source.replace(imageRefRegex, (match, quote, refPath) => {
      const absolutePath = resolveRefPath(fullPath, refPath);
      if (!absolutePath) {
        return match;
      }

      const webpPath = absolutePath.replace(/\.(png|jpe?g)$/i, '.webp');
      if (!fs.existsSync(webpPath)) {
        return match;
      }

      const webpRef = refPath.replace(/\.(png|jpe?g)$/i, '.webp');
      if (webpRef === refPath) {
        return match;
      }

      didReplace = true;
      return `${quote}${webpRef}${quote}`;
    });

    if (didReplace && updated !== source) {
      fs.writeFileSync(fullPath, updated, 'utf8');
      changedFiles.push(path.relative(root, fullPath).replace(/\\/g, '/'));
    }
  }
}

walk(srcRoot);
console.log(changedFiles.join('\n'));
