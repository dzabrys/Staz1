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
fs.appendFileSync(path.join(out, 'formularz.css'), '\n' + fs.readFileSync(path.join(root, 'test-formularzy/kontakt-wariant.css'), 'utf8'));
const version = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(out, file))).digest('hex').slice(0, 12);
const fragment = fs.readFileSync(path.join(root, 'test-formularzy/formularz-kontaktowy.html'), 'utf8');
let html = fs.readFileSync(path.join(root, 'kontakt.html'), 'utf8');
assert(html.includes('</main>'));
html = html.replace('<head>', '<head><base href="../">');
html = html.replace('</head>', `<link rel="stylesheet" href="3/formularz.css?v=${version('formularz.css')}"><script src="3/formularz.js?v=${version('formularz.js')}" defer></script></head>`);
const breadcrumb = '<nav class="breadcrumb" aria-label="Ścieżka nawigacji"><ol><li><a href="./">Strona główna</a></li><li aria-current="page">Kontakt</li></ol></nav>';
const contact = `<aside class="contact-welcome" aria-labelledby="contact-heading">
<p class="contact-kicker">Wielkie gry zaczynają się od rozmowy</p>
<h1 id="contact-heading">Skontaktuj się<br><em class="underline">z nami</em></h1>
<p class="contact-lead">Masz pomysł na grę?<br>Pomóżmy mu nabrać kształtu.</p>
<p class="contact-description">Szukasz gry dla szkoły, planujesz wydarzenie dla zespołu, a może chcesz stworzyć coś własnego? Opowiedz nam o tym — wspólnie wybierzemy kierunek.</p>
<address class="contact-direct">
<div><span class="contact-symbol" aria-hidden="true">@</span><div><span class="contact-label">Napisz do nas</span><a href="mailto:biuro@wielkiegryplanszowe.pl">biuro@wielkiegryplanszowe.pl</a></div></div>
<div><span class="contact-symbol" aria-hidden="true">↗</span><div><span class="contact-label">Zadzwoń i porozmawiajmy</span><a href="tel:+48600894644">+48 600 894 644</a></div></div>
<div><span class="contact-symbol" aria-hidden="true">⌖</span><div><span class="contact-label">Tu nas znajdziesz</span><p>ul. Lubelska 37D<br>10-408 Olsztyn</p></div></div>
</address>
<p class="contact-handwritten">Twój pomysł. Nasza wspólna gra.</p>
</aside>`;
const inquiry = fragment.replace('Opowiedz nam <em>o swoim pomyśle</em>', 'Porozmawiajmy <em>o Twojej grze</em>');
html = html.replace(/<main id="main"[\s\S]*?<\/main>/, `<main id="main" class="supplemental">${breadcrumb}<div class="contact-columns">${contact}${inquiry}</div></main>`);
html = html.replace('class="page-contact"', 'class="page-contact contact-variant"');
html = html.replace('href="#main"', 'href="3/#main"');
html = html.replace('Przygotuj zapytanie', 'Napisz do nas');
html = html.replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"');
html = html.replace(/property="og:url" content="[^"]+"/, 'property="og:url" content="https://dzabrys.github.io/Staz1/3/"');
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log('Created /3/ contact form variant');
