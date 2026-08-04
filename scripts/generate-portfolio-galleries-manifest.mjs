import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const OUTPUT = path.join(PUBLIC_DIR, 'portfolio-gallery-manifest.js');
const IMAGE_RE = /\.(?:avif|gif|jpe?g|png|webp)$/i;

const SOURCES = {
  logos: ['works/logo', 'works/logos'],
  collages: ['works/collage', 'works/collages'],
  posters: ['works/posters'],
  ankaPeresild: ['works/anka-peresild'],
};

const naturalCompare = (a, b) => a.localeCompare(b, 'en', {
  numeric: true,
  sensitivity: 'base',
});

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

function encodePublicUrl(absolutePath) {
  const relative = path.relative(PUBLIC_DIR, absolutePath);
  return `/${relative.split(path.sep).map(encodeURIComponent).join('/')}`;
}

async function collect(sourceDirectories) {
  const seen = new Set();
  const items = [];

  for (const sourceDirectory of sourceDirectories) {
    const absoluteSource = path.join(PUBLIC_DIR, sourceDirectory);
    const files = await walk(absoluteSource);

    for (const absoluteFile of files) {
      const src = encodePublicUrl(absoluteFile);
      if (seen.has(src)) continue;
      seen.add(src);

      const relative = path.relative(absoluteSource, absoluteFile).split(path.sep).join('/');
      const folder = path.posix.dirname(relative) === '.' ? 'root' : path.posix.dirname(relative);
      items.push({
        src,
        name: path.basename(absoluteFile),
        relative,
        folder,
      });
    }
  }

  return items.sort((a, b) => naturalCompare(a.relative, b.relative));
}

const manifest = {};
for (const [key, directories] of Object.entries(SOURCES)) {
  manifest[key] = await collect(directories);
}

const output = `(() => {\n  window.PORTFOLIO_GALLERY_MANIFEST = Object.freeze(${JSON.stringify(manifest, null, 2)});\n  if (!document.querySelector('script[src^="/project-list-expansion.js"]')) {\n    const script = document.createElement('script');\n    script.src = '/project-list-expansion.js?v=project-list-expansion-2';\n    script.async = false;\n    (document.currentScript || document.body).after(script);\n  }\n  if (!document.querySelector('script[src^="/merch-image-cleanup.js"]')) {\n    const script = document.createElement('script');\n    script.src = '/merch-image-cleanup.js?v=merch-image-cleanup-1';\n    script.async = false;\n    (document.currentScript || document.body).after(script);\n  }\n})();\n`;
await writeFile(OUTPUT, output, 'utf8');

console.log(
  `[portfolio galleries] logos=${manifest.logos.length}, collages=${manifest.collages.length}, posters=${manifest.posters.length}, ankaPeresild=${manifest.ankaPeresild.length}`,
);
