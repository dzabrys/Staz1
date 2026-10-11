// Publish complete HTML so content, navigation and metadata also work without JS.
// Run after editing the page templates in app.js: node tools/render.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8').split('/* Hydrate the published HTML;')[0];
const base = 'https://dzabrys.github.io/Staz1/';
const pages = [
  ['index.html', 'Wielkie gry planszowe dla szkół i firm | Wielkie Gry Planszowe', 'Edukacyjne gry wielkoformatowe dla szkół, firm i instytucji. Poznaj gry, które uczą i integrują, oraz projektowanie gier planszowych na zamówienie.'],
  ['szkoly.html', 'Edukacyjne gry wielkoformatowe dla szkół | Wielkie Gry Planszowe', 'Poznaj wielkie gry planszowe dla szkół: ekologia, cyberbezpieczeństwo i krytyczne myślenie. Nauka przez działanie, współpracę i wspólną zabawę.'],
  ['firmy.html', 'Gry dla firm i instytucji: integracja i szkolenia | Wielkie Gry Planszowe', 'Wielkoformatowe gry dla firm i instytucji na szkolenia, eventy i działania społeczne. Integracja zespołu, komunikacja i rozwijanie kompetencji.'],
  ['gry-na-zamowienie.html', 'Gry wielkoformatowe na zamówienie | Wielkie Gry Planszowe', 'Projektujemy gry wielkoformatowe dopasowane do Twoich celów i odbiorców. Poznaj etapy realizacji: od koncepcji i scenariusza po produkcję gotowej gry.'],
  ['misja.html', 'Misja specjalna: nauka przez wspólną grę | Wielkie Gry Planszowe', 'Wielkie gry planszowe wspierają krytyczne myślenie, współpracę, kreatywność i wrażliwość ekologiczną. Poznaj kompetencje rozwijane przez grę.'],
  ['kontakt.html', 'Kontakt i pomysł na własną grę | Wielkie Gry Planszowe', 'Planujesz zajęcia dla szkoły, wydarzenie dla firmy lub własną grę wielkoformatową? Dowiedz się, jak przygotować cele i pomysł na realizację gry.'],
];
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const dialogs = `<dialog id="detail-dialog" aria-labelledby="dialog-title"><button class="close-dialog" aria-label="Zamknij">×</button><div id="dialog-content"></div></dialog>
  <dialog id="search-dialog" aria-labelledby="search-title"><button class="close-dialog" aria-label="Zamknij">×</button><h2 id="search-title">Czego szukasz?</h2><label for="search-input">Wyszukaj stronę lub grę</label><input id="search-input" type="search" placeholder="Np. szkoły, ekologia, gry na zamówienie…"><div id="search-results" aria-live="polite"></div></dialog>`;
for (const [file, title, description] of pages) {
  const context = vm.createContext({ location: { pathname: '/Staz1/'+file }, document: { body: {} } });
  const markup = vm.runInContext(source+'\nrenderPage();', context).replaceAll('href="index.html"', 'href="./"');
  const url = base + (file === 'index.html' ? '' : file);
  const html = `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#072c76">
  <title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:site_name" content="Wielkie Gry Planszowe">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${base}assets/hero.png">
  <meta property="og:image:alt" content="Dzieci grają na wielkiej kolorowej planszy na szkolnym dziedzińcu">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/font-4.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="assets/fonts.css">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="responsive.css">
  <link rel="stylesheet" href="experience.css">
  <script src="app.js" defer></script>
  <script src="motion.js" defer></script>
</head>
<body class="${context.document.body.className}">
  <a class="skip-link" href="#main">Przejdź do treści</a>
  <div id="app">${markup}</div>
  ${dialogs}
</body>
</html>
`;
  fs.writeFileSync(path.join(root, file), html);
}
fs.writeFileSync(path.join(root,'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([file])=>`  <url><loc>${base}${file==='index.html'?'':file}</loc></url>`).join('\n')}
</urlset>
`);
console.log('Rendered 6 pages and sitemap.xml.');
