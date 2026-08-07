import { mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SOURCE_DIR = path.join(PUBLIC_DIR, 'works', 'merch', 'dxs');
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'generated', 'dxs-thumbs');
const IMAGE_RE = /\.(?:avif|jpe?g|png|webp)$/i;

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
    if (entry.isDirectory()) {
      files.push(...await walk(absolute));
    } else if (entry.isFile() && IMAGE_RE.test(entry.name)) {
      files.push(absolute);
    }
  }
  return files;
}

await rm(OUTPUT_DIR, { recursive: true, force: true });
await mkdir(OUTPUT_DIR, { recursive: true });

const files = await walk(SOURCE_DIR);
let generated = 0;
let failed = 0;

for (const input of files) {
  const relative = path.relative(SOURCE_DIR, input);
  const parsed = path.parse(relative);
  const output = path.join(OUTPUT_DIR, parsed.dir, `${parsed.name}.webp`);

  try {
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(input, { limitInputPixels: false })
      .rotate()
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 70, effort: 4, smartSubsample: true })
      .toFile(output);
    generated += 1;
  } catch (error) {
    failed += 1;
    console.warn(`[dxs thumbs] skipped ${relative}: ${error?.message || error}`);
  }
}

console.log(`[dxs thumbs] generated=${generated}, failed=${failed}`);
