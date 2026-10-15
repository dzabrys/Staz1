// Static checks for the published category → catalog → product navigation.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const urls = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]));
const files = urls.map(url => url.pathname.split('/').pop() || 'index.html');
assert.equal(new Set(files).size, files.length, 'Duplicate sitemap page');
assert.equal(files.length, 28);
const base = new URL(process.env.SITE_URL || 'https://dzabrys.github.io/Staz1/');
let checkedLinks = 0;
for (const file of files) {
  const html = read(file);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, file+' main heading');
  assert.ok(html.includes('href="oferta.html"'), file+' offer navigation');
  assert.ok(!/Misja specjalna|Wersja demonstracyjna|Dane testowe|example\.com|XXX|Profile do uzupełnienia/.test(html), file+' old placeholders');
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(canonical, new URL(file==='index.html'?'':file,base).href, file+' canonical');
  for (const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:mailto:|tel:|data:|#)/.test(ref)) continue;
    const url = new URL(ref, new URL(file, base));
    if (url.origin !== base.origin) continue;
    const relative = decodeURIComponent(url.pathname.slice(base.pathname.length)) || 'index.html';
    assert.ok(fs.existsSync(path.join(root,relative)), file+' broken link: '+ref);
    checkedLinks++;
  }
  if (file.startsWith('gra-')) {
    assert.ok(html.includes('class="product-layout"'), file+' product layout');
    assert.match(html, /<a href="oferta\.html"\s+aria-current="page">[\s\S]*?<span[^>]*>Oferta<\/span>[\s\S]*?<\/a>/, file+' active offer header');
  }
}
assert.equal((read('wielkie-gry-planszowe.html').match(/class="catalog-card"/g)||[]).length, 15);
assert.equal((read('inne.html').match(/class="catalog-card"/g)||[]).length, 5);
assert.equal((read('oferta.html').match(/class="selection-card[ "]/g)||[]).length, 2);
assert.ok(read('misja.html').includes('content="0;url=oferta.html"'));
assert.ok(!read('sitemap.xml').includes('misja.html'));
console.log(`PASS: ${files.length} pages, ${checkedLinks} local links/assets, 2 categories, 20 product routes and legacy redirect.`);
