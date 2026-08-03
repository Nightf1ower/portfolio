import { promises as fs } from 'node:fs';
import path from 'node:path';

const repositoryRoot = process.cwd();
const publicRoot = path.join(repositoryRoot, 'public');
const stickersRoot = path.join(publicRoot, 'works', 'stickers');
const outputFile = path.join(publicRoot, 'stickers-assets-manifest.js');
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

function toBrowserUrl(absolutePath) {
  const relative = path.relative(publicRoot, absolutePath).split(path.sep).join('/');
  return `/${relative.split('/').map(encodeURIComponent).join('/')}`;
}

function toPublicPath(absolutePath) {
  return `public/${path.relative(publicRoot, absolutePath).split(path.sep).join('/')}`;
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(absolutePath));
      continue;
    }

    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(absolutePath);
    }
  }

  return files;
}

function naturalCompare(left, right) {
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
}

async function buildManifest() {
  let projectDirectories = [];

  try {
    projectDirectories = (await fs.readdir(stickersRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const projects = {};

  for (const directory of projectDirectories) {
    const absoluteDirectory = path.join(stickersRoot, directory.name);
    const files = (await walk(absoluteDirectory)).sort((a, b) => naturalCompare(a, b));
    const key = directory.name.toLowerCase();

    projects[key] = {
      key,
      title: directory.name.toUpperCase(),
      items: files.map((absolutePath) => ({
        name: path.basename(absolutePath),
        path: toPublicPath(absolutePath),
        src: toBrowserUrl(absolutePath),
      })),
    };
  }

  const orderedProjects = {};
  for (const preferredKey of ['mnu', 'flawa']) {
    if (projects[preferredKey]) orderedProjects[preferredKey] = projects[preferredKey];
  }
  for (const key of Object.keys(projects).sort(naturalCompare)) {
    if (!orderedProjects[key]) orderedProjects[key] = projects[key];
  }

  const payload = {
    version: 'stickers-assets-manifest-1',
    projects: orderedProjects,
  };

  const source = `(() => {\n  window.STICKERS_ASSET_MANIFEST = ${JSON.stringify(payload, null, 2)};\n})();\n`;
  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, source, 'utf8');

  const imageCount = Object.values(orderedProjects)
    .reduce((total, project) => total + project.items.length, 0);
  console.log(`Generated stickers manifest with ${imageCount} images.`);
}

buildManifest().catch((error) => {
  console.error('Failed to generate stickers manifest:', error);
  process.exitCode = 1;
});
