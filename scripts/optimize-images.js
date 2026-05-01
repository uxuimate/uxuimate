import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const MAX_WIDTH = 1440;
const WEBP_QUALITY = 80;
const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveImageRoots() {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'src', 'assets'),
    path.join(cwd, 'src', 'pages'),
    path.join(cwd, 'public', 'images'),
    path.join(cwd, 'public', 'img')
  ];
  const roots = [];

  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      roots.push(candidate);
    }
  }

  if (roots.length === 0) {
    throw new Error('No image roots found. Checked src/assets, src/pages, public/images, and public/img.');
  }
  return roots;
}

async function collectImageFiles(dirPath, files = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await collectImageFiles(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, '.webp');
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const needsResize = typeof metadata.width === 'number' && metadata.width > MAX_WIDTH;

  let pipeline = image;
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  console.log(
    `Processed: ${inputPath} -> ${outputPath}${needsResize ? ` (resized to max ${MAX_WIDTH}px)` : ''}`
  );
}

async function main() {
  const imageRoots = await resolveImageRoots();
  const imageFiles = [];

  for (const root of imageRoots) {
    await collectImageFiles(root, imageFiles);
  }

  if (imageFiles.length === 0) {
    console.log(`No .png/.jpg/.jpeg files found in: ${imageRoots.join(', ')}`);
    return;
  }

  console.log(`Optimizing ${imageFiles.length} images across: ${imageRoots.join(', ')}`);

  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath);
  }

  console.log('Image optimization complete.');
}

main().catch((error) => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
