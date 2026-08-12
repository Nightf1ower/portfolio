import { mkdir, readdir, rm } from 'node:fs/promises';
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

// DXS has its own dedicated quality profile.
const SKIP_RELATIVE_PREFIXES = ['merch/dxs/'];

// Photos and simple mockups remain relatively light. Artwork with typography,
// grain, scans, linework or print detail gets a substantially larger preview.
const DEFAULT_PROFILE = { width: 1400, quality: 82 };
const DETAIL_PROFILE = { width: 1800, quality: 88 };
const CONCURRENCY = 6;

const DETAIL_PATTERNS = [
  /^(?:logo|logos|collage|collages)\//i,
  /^fable\//i,
  /^zny\/(?:afisha|prints|example|stickers)\//i,
  /^90-06\/(?:photoshoot|posters|logo-variations)\//i,
  /^VTB DESIGN TEAM\/print\//i,
  /^merch\/yablochko\/(?:brochure|print|poster|ad|billboard)\//i,
  /^stayugly\/(?:concept|final|package)\//i,
  /^pink-punk\//i,
  /^carnival(?:-records)?\//i,
  /^blandetto\//i,
];

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

function profileFor(source) {
  const relative = relativeFromWorks(source);
  return DETAIL_PATTERNS.some((pattern) => pattern.test(relative))
    ? DETAIL_PROFILE
    : DEFAULT_PROFILE;
}

function outputPath(source) {
  const relative = path.relative(WORKS_DIR, source);
  const parsed = path.parse(relative);
  return path.join(OUTPUT_DIR, parsed.dir, `${parsed.name}.webp`);
}

async function makeThumbnail(source) {
  const destination = outputPath(source);
  const profile = profileFor(source);
  await mkdir(path.dirname(destination), { recursive: true });

  try {
    await sharp(source, { animated: false, failOn: 'none', limitInputPixels: false })
      .rotate()
      .resize({ width: profile.width, withoutEnlargement: true, fastShrinkOnLoad: true })
      .webp({ quality: profile.quality, effort: 4, smartSubsample: true })
      .toFile(destination);
    return profile;
  } catch (error) {
    console.warn(`[portfolio thumbs] skipped ${path.relative(PUBLIC_DIR, source)}: ${error.message}`);
    return null;
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
let detailed = 0;

async function worker() {
  while (cursor < sources.length) {
    const index = cursor++;
    const profile = await makeThumbnail(sources[index]);
    if (profile) {
      generated += 1;
      if (profile === DETAIL_PROFILE) detailed += 1;
    }
  }
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, sources.length || 1) }, worker));
console.log(`[portfolio thumbs] generated=${generated}/${sources.length}, detailed=${detailed}, default=${DEFAULT_PROFILE.width}px/q${DEFAULT_PROFILE.quality}, detail=${DETAIL_PROFILE.width}px/q${DETAIL_PROFILE.quality}`);
