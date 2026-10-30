// Local-only preview of dist and its security headers. Netlify remains the production server.
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, stat, realpath } from 'node:fs/promises';
import { createReadStream } from 'node:fs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const headerText = await readFile(path.join(dist, '_headers'), 'utf8');
const headers = Object.fromEntries(headerText.split('\n').filter(l => l.startsWith('  ')).map(l => {
  const i = l.indexOf(':');
  return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
}));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8' };
export const server = http.createServer(async (req, res) => {
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end(); }
  if (['/index.html', '/index'].includes(pathname)) { res.writeHead(301, { Location: '/' }); return res.end(); }
  try {
    if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').some(p => p.startsWith('.') || p.startsWith('_'))) throw new Error('Private path');
    const candidate = path.resolve(dist, '.' + (pathname === '/' ? '/index.html' : pathname));
    const file = await realpath(candidate);
    if (!file.toLowerCase().startsWith(dist.toLowerCase()) || !types[path.extname(file)]) throw new Error('Not public');
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    res.setHeader('Content-Type', types[path.extname(file)]);
    res.setHeader('Accept-Ranges', 'bytes');
    let start = 0, end = info.size - 1;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2])) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); return res.end(); }
      if (match[1]) { start = Number(match[1]); if (match[2]) end = Number(match[2]); }
      else start = Math.max(0, info.size - Number(match[2]));
      end = Math.min(end, info.size - 1);
      if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); return res.end(); }
      res.statusCode = 206;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${info.size}`);
    }
    res.setHeader('Content-Length', end - start + 1);
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(file, { start, end });
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(req.method === 'HEAD' ? undefined : await readFile(path.join(dist, '404.html')));
  }
});
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  server.listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
}
