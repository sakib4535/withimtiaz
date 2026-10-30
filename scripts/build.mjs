import { readFile, writeFile, mkdir, copyFile, rm, realpath, cp } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { transform } from 'esbuild';
import { minify } from 'html-minifier-terser';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'source');
const dist = path.join(root, 'dist');
// Only this generated directory may be replaced; reject symlinks/junctions outside it.
if (path.dirname(dist) !== path.resolve(root)) throw new Error('Invalid output directory');
try {
  if ((await realpath(dist)).toLowerCase() !== dist.toLowerCase()) throw new Error('Output must not be a link');
} catch (error) { if (error.code !== 'ENOENT') throw error; }
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

let html = await readFile(path.join(source, 'index.html'), 'utf8');
const js = await readFile(path.join(source, 'scripts/main.js'), 'utf8');
const css = await readFile(path.join(source, 'styles/main.css'), 'utf8');
if (/<script\b(?![^>]*\bsrc=)|\son\w+\s*=/i.test(html)) throw new Error('Inline script/event handlers are forbidden');
if (/\binnerHTML\s*=|\beval\s*\(|\bnew\s+Function\s*\(/.test(js)) throw new Error('Unsafe dynamic code/HTML in portfolio engine');

// Copy only referenced images/videos, never arbitrary source or backup files.
const assets = new Set();
for (const match of html.matchAll(/\b(?:src|content)="([^"]+\.(?:svg|png|jpg|webp|mp4))"/gi)) assets.add(match[1]);
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) assets.add(path.posix.normalize(path.posix.join('styles', match[1])));
for (const match of js.matchAll(/\bsrc:\s*'([^']+)'/g)) assets.add(match[1]);
for (const asset of assets) {
  if (!/^[\w /.-]+\.(svg|png|jpg|webp|mp4)$/.test(asset) || asset.split('/').some(p => p.startsWith('.'))) {
    throw new Error(`Invalid public asset: ${asset}`);
  }
  const from = path.resolve(source, asset);
  const resolved = await realpath(from);
  if (!resolved.toLowerCase().startsWith((source + path.sep).toLowerCase())) throw new Error('Asset outside source');
  const to = path.join(dist, asset);
  await mkdir(path.dirname(to), { recursive: true });
  await copyFile(from, to);
}
// Keep third-party icon license with the distributed icon assets.
await copyFile(path.join(source, 'assets/tech/LICENSE-simple-icons.txt'), path.join(dist, 'assets/tech/LICENSE-simple-icons.txt'));

const sizes = [];
for (const [name, input, loader] of [['scripts/main', js, 'js'], ['styles/main', css, 'css']]) {
  const { code } = await transform(input, { loader, minify: true, legalComments: 'none', target: 'es2020' });
  const hash = createHash('sha256').update(code).digest('hex').slice(0, 12);
  const filename = `${name}.${hash}.${loader}`;
  await mkdir(path.dirname(path.join(dist, filename)), { recursive: true });
  await writeFile(path.join(dist, filename), code);
  html = html.replaceAll(`${name}.${loader}`, filename);
  sizes.push({ type: loader, before: Buffer.byteLength(input), after: Buffer.byteLength(code) });
}
const compact = await minify(html, {
  collapseWhitespace: true, conservativeCollapse: true, removeComments: true,
  removeRedundantAttributes: true, removeEmptyAttributes: true,
  minifyCSS: true, keepClosingSlash: true
});
await writeFile(path.join(dist, 'index.html'), compact);
sizes.push({ type: 'html', before: Buffer.byteLength(html), after: Buffer.byteLength(compact) });
await writeFile(path.join(dist, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><h1>Page not found</h1><p><a href="/">Return to the portfolio</a></p></html>');

const csp = "default-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; media-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests";
await writeFile(path.join(dist, '_headers'), `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
`);
await writeFile(path.join(dist, '_redirects'), `/index.html / 301!
/index / 301!
/source/* /404.html 404!
/.git/* /404.html 404!
/.env /404.html 404!
/node_modules/* /404.html 404!
`);
const before = sizes.reduce((n, s) => n + s.before, 0);
const after = sizes.reduce((n, s) => n + s.after, 0);
// Also provide a complete static entry at the project root for folder uploads.
// Merge scripts so the build and preview tools remain intact.
for (const entry of ['index.html', '404.html', '_headers', '_redirects', 'assets', 'styles', 'scripts']) {
  await cp(path.join(dist, entry), path.join(root, entry), { recursive: true });
}
console.log(`Built dist: ${assets.size} referenced media assets. HTML/CSS/JS: ${before} → ${after} bytes (${Math.round(100 * (1 - after / before))}% smaller).`);
