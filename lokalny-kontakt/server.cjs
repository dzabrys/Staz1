// Local-only contact override. The public contact file stays untouched.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
http.createServer((req,res) => {
  let file;
  try {
    const url = new URL(req.url, 'http://localhost');
    const route = decodeURIComponent(url.pathname).replace(/^\/Staz1(?=\/)/,'');
    const localPages = {
      '/kontakt.html':path.join(__dirname, 'index.html'),
      '/gry-na-zamowienie.html':path.join(root,'lokalne-zamowienia','index.html'),
    };
    file = localPages[route] || path.resolve(root, '.' + route);
  } catch { res.writeHead(400).end(); return; }
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  fs.readFile(file,(err,data) => res.writeHead(err?404:200,{
    'Content-Type':types[path.extname(file)]||'application/octet-stream',
    'Cache-Control':'no-store',
  }).end(err?'Nie znaleziono strony':data));
}).listen(4175,'127.0.0.1',() => console.log('Local site: http://127.0.0.1:4175/\nContact form: http://127.0.0.1:4175/kontakt.html'));
