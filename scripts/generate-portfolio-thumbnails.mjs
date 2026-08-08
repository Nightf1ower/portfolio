import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const WORKS_DIR = path.join(PUBLIC_DIR, 'works');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'generated', 'portfolio-thumbs');
const IMAGE_RE = /\.(?:avif|gif|jpe?g|png|webp)$/i;
const TARGETS = [
  'logo',
  'logos',
  'collage',
  'collages',
  'anka-peresild',
];
const MAX_WIDTH = 1200;
const QUALITY = 76;
const CONCURRENCY = 6;

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile() && IMAGE_RE.test(entry.name)) files.push(absolute);
  }
  return files;
}

function outputPath(source) {
  const relative = path.relative(WORKS_DIR, source);
  const parsed = path.parse(relative);
  return path.join(OUTPUT_DIR, parsed.dir, `${parsed.name}.webp`);
}

async function makeThumbnail(source) {
  const destination = outputPath(source);
  await mkdir(path.dirname(destination), { recursive: true });

  try {
    await sharp(source, { animated: false, failOn: 'none' })
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true, fastShrinkOnLoad: true })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(destination);
    return true;
  } catch (error) {
    console.warn(`[portfolio thumbs] skipped ${path.relative(PUBLIC_DIR, source)}: ${error.message}`);
    return false;
  }
}

const sources = [];
for (const target of TARGETS) {
  sources.push(...await walk(path.join(WORKS_DIR, target)));
}

let cursor = 0;
let generated = 0;

async function worker() {
  while (cursor < sources.length) {
    const index = cursor++;
    if (await makeThumbnail(sources[index])) generated += 1;
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, sources.length || 1) }, worker));
console.log(`[portfolio thumbs] generated=${generated}/${sources.length}, width<=${MAX_WIDTH}, quality=${QUALITY}`);
