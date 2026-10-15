const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/forms.js', ['forms.js', 'text/javascript; charset=utf-8']],
]);
const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end();
    return;
  }
  const file = files.get(new URL(req.url, 'http://localhost').pathname);
  if (!file) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' });
  res.end(req.method === 'HEAD' ? undefined : fs.readFileSync(path.join(__dirname, file[0])));
});
server.listen(4177, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4177'));
