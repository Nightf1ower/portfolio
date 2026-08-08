import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const WORKS_DIR = path.join(PUBLIC_DIR, 'works');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'generated', 'portfolio-thumbs');
const IMAGE_RE = /\.(?:avif|gif|jpe?g|png|webp)$/i;

// Heavy projects that should never render full-resolution originals in their grids.
// Missing folders are ignored, so this list is safe across project revisions.
const TARGETS = [
  'logo',
  'logos',
  'collage',
  'collages',
  'anka-peresild',
  'fable',
  'zny',
  'stayugly',
  '90-06',
  'VTB DESIGN TEAM',
  'merch',
  'blandetto',
  'pink-punk',
  'carnival',
  'carnival-records',
];

// DXS already has its own smaller, more aggressive thumbnail pipeline.
const SKIP_RELATIVE_PREFIXES = ['merch/dxs/'];
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

function relativeFromWorks(source) {
  return path.relative(WORKS_DIR, source).split(path.sep).join('/');
}

function shouldSkip(source) {
  const relative = relativeFromWorks(source).toLowerCase();
  return SKIP_RELATIVE_PREFIXES.some((prefix) => relative.startsWith(prefix.toLowerCase()));
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
      .webp({ quality: QUALITY, effort: 4, smartSubsample: true })
      .toFile(destination);
    return true;
  } catch (error) {
    console.warn(`[portfolio thumbs] skipped ${path.relative(PUBLIC_DIR, source)}: ${error.message}`);
    return false;
  }
}

await rm(OUTPUT_DIR, { recursive: true, force: true });

const unique = new Set();
for (const target of TARGETS) {
  const files = await walk(path.join(WORKS_DIR, target));
  files.forEach((file) => {
    if (!shouldSkip(file)) unique.add(file);
  });
}

const sources = [...unique];
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
