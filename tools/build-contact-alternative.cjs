const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const out = path.join(root, '3');
fs.mkdirSync(out, { recursive: true });
for (const ext of ['css', 'js']) {
  fs.copyFileSync(path.join(root, `test-formularzy/formularz-kontaktowy.${ext}`), path.join(out, `formularz.${ext}`));
}
const version = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(out, file))).digest('hex').slice(0, 12);
const fragment = fs.readFileSync(path.join(root, 'test-formularzy/formularz-kontaktowy.html'), 'utf8');
let html = fs.readFileSync(path.join(root, 'kontakt.html'), 'utf8');
assert(html.includes('</main>'));
html = html.replace('<head>', `<head><base href="../"><link rel="stylesheet" href="3/formularz.css?v=${version('formularz.css')}"><script src="3/formularz.js?v=${version('formularz.js')}" defer></script>`);
html = html.replace('</main>', fragment + '</main>');
html = html.replace('href="#zapytanie"', 'href="3/#formularz-kontaktowy"');
html = html.replace('href="#main"', 'href="3/#main"');
html = html.replace('Przygotuj zapytanie', 'Napisz do nas');
html = html.replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"');
html = html.replace(/property="og:url" content="[^"]+"/, 'property="og:url" content="https://dzabrys.github.io/Staz1/3/"');
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log('Created /3/ contact form variant');
