const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let page = fs.readFileSync(path.join(root, 'kontakt.html'), 'utf8');
// Keep this earlier standalone preview separate from the production form.
page = page.replace(/<section id="formularz-kontaktowy" class="contact-form-shell"[\s\S]*?<\/section>/, '');
page = page.replace(/<link rel="stylesheet" href="contact-form\.css[^\"]*">/, '');
page = page.replace(/<script src="contact-form\.js[^\"]*" defer><\/script>/, '');
page = page.replace(/class="button contact-form-trigger" href="#formularz-kontaktowy" aria-expanded="false" aria-controls="formularz-kontaktowy"/, 'class="button" href="#zapytanie"');
const fragment = fs.readFileSync(path.join(__dirname, 'formularz-kontaktowy.html'), 'utf8');
page = page.replace('<head>', '<head><base href="../"><link rel="stylesheet" href="test-formularzy/formularz-kontaktowy.css"><script src="test-formularzy/formularz-kontaktowy.js" defer></script>');
page = page.replace('</main>', fragment + '</main>');
page = page.replace('href="#zapytanie"', 'href="test-formularzy/kontakt-podglad.html#formularz-kontaktowy"');
page = page.replace('href="#main"', 'href="test-formularzy/kontakt-podglad.html#main"');
page = page.replace('Przygotuj zapytanie', 'Napisz do nas');
page = page.replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"');
fs.writeFileSync(path.join(__dirname, 'kontakt-podglad.html'), page);
