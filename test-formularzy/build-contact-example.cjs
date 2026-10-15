const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let page = fs.readFileSync(path.join(root, 'kontakt.html'), 'utf8');
const fragment = fs.readFileSync(path.join(__dirname, 'formularz-kontaktowy.html'), 'utf8');
if(page.includes('refreshed-contact')){
 page=page.replace('<head>','<head><base href="../">').replace(/href="#([^"]+)"/g,'href="test-formularzy/kontakt-podglad.html#$1"').replace(/name="robots" content="[^"]+"/,'name="robots" content="noindex,follow"');
 fs.writeFileSync(path.join(__dirname,'kontakt-podglad.html'),page);
 return;
}

page = page.replace('<head>', '<head><base href="../"><link rel="stylesheet" href="test-formularzy/formularz-kontaktowy.css"><script src="test-formularzy/formularz-kontaktowy.js" defer></script>');
page = page.replace('</main>', fragment + '</main>');
page = page.replace('href="#zapytanie"', 'href="test-formularzy/kontakt-podglad.html#formularz-kontaktowy"');
page = page.replace('href="#main"', 'href="test-formularzy/kontakt-podglad.html#main"');
page = page.replace('Przygotuj zapytanie', 'Napisz do nas');
page = page.replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"');
fs.writeFileSync(path.join(__dirname, 'kontakt-podglad.html'), page);
