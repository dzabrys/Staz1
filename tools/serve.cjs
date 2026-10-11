const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.woff2':'font/woff2', '.ttf':'font/ttf' };
http.createServer((req,res) => {
  let file;
  try { let pathname=decodeURIComponent(new URL(req.url, 'http://localhost').pathname); if(pathname.startsWith('/Staz1/'))pathname=pathname.slice(6); file = path.resolve(root, '.' + pathname); } catch { res.writeHead(400).end(); return; }
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  fs.readFile(file,(err,body) => { if(err) {fs.readFile(path.join(root,'404.html'),(failure,html)=>res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(failure?'Nie znaleziono strony':html));return;} res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'}).end(body); });
}).listen(4173,'127.0.0.1',() => console.log('Podgląd: http://127.0.0.1:4173'));
