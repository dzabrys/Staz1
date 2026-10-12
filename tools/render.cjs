// Publish complete HTML so content, navigation and metadata also work without JS.
// Run after editing the page templates in app.js: node tools/render.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const {transform} = require('lightningcss');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8').split('/* Hydrate the published HTML;')[0];
const base = 'https://dzabrys.github.io/Staz1/';
const assetUrl = file => file+'?v='+crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex').slice(0,12);
const css = ['assets/fonts.css','styles.css','responsive.css','experience.css','audit-fixes.css','reference-layout.css'].map(file=>{
  let content=fs.readFileSync(path.join(root,file),'utf8');
  if(file==='assets/fonts.css') content=content.replace(/url\(([^)]+)\)/g,(_,font)=>'url('+assetUrl('assets/'+font)+')');
  return content;
}).join('\n');
fs.writeFileSync(path.join(root,'site.css'),transform({filename:'site.css',code:Buffer.from(css),minify:true}).code);
const pages = [
  ['index.html', 'Wielkie gry planszowe dla szkół i firm | Wielkie Gry Planszowe', 'Edukacyjne gry wielkoformatowe dla szkół, firm i instytucji. Poznaj gry, które uczą i integrują, oraz projektowanie gier planszowych na zamówienie.'],
  ['szkoly.html', 'Edukacyjne gry wielkoformatowe dla szkół | Wielkie Gry Planszowe', 'Poznaj wielkie gry planszowe dla szkół: ekologia, cyberbezpieczeństwo i krytyczne myślenie. Nauka przez działanie, współpracę i wspólną zabawę.'],
  ['firmy.html', 'Gry dla firm i instytucji: integracja i szkolenia | Wielkie Gry Planszowe', 'Wielkoformatowe gry dla firm i instytucji na szkolenia, eventy i działania społeczne. Integracja zespołu, komunikacja i rozwijanie kompetencji.'],
  ['gry-na-zamowienie.html', 'Gry wielkoformatowe na zamówienie | Wielkie Gry Planszowe', 'Projektujemy gry wielkoformatowe dopasowane do Twoich celów i odbiorców. Poznaj etapy realizacji: od koncepcji i scenariusza po produkcję gotowej gry.'],
  ['misja.html', 'Misja specjalna: nauka przez wspólną grę | Wielkie Gry Planszowe', 'Wielkie gry planszowe wspierają krytyczne myślenie, współpracę, kreatywność i wrażliwość ekologiczną. Poznaj kompetencje rozwijane przez grę.'],
  ['kontakt.html', 'Kontakt i pomysł na własną grę | Wielkie Gry Planszowe', 'Planujesz zajęcia dla szkoły, wydarzenie dla firmy lub własną grę wielkoformatową? Dowiedz się, jak przygotować cele i pomysł na realizację gry.'],
];
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const dialogs = `<dialog id="search-dialog" aria-labelledby="search-title"><button class="close-dialog" aria-label="Zamknij">×</button><h2 id="search-title">Czego szukasz?</h2><label for="search-input">Wyszukaj stronę lub grę</label><input id="search-input" type="search" placeholder="Np. szkoły, ekologia, gry na zamówienie…"><p id="search-status" role="status" aria-live="polite" aria-atomic="true"></p><div id="search-results"></div></dialog>`;
for (const [file, title, description] of pages) {
  const context = vm.createContext({ location: { pathname: '/Staz1/'+file }, document: { body: {} } });
  const markup = vm.runInContext(source+'\nrenderPage();', context).replaceAll('href="index.html"', 'href="./"').replace(/assets\/[\w.-]+\.(?:webp|png|svg|txt)/g,file=>assetUrl(file));
  const url = base + (file === 'index.html' ? '' : file);
  const structured = [{'@context':'https://schema.org','@type':'WebPage','name':title,'description':description,'url':url,'inLanguage':'pl','isPartOf':{'@type':'WebSite','name':'Wielkie Gry Planszowe','url':base}}];
  if(file!=='index.html') structured.push({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Strona główna','item':base},{'@type':'ListItem','position':2,'name':context.document.body.className==='page-school'?'Szkoły':context.document.body.className==='page-company'?'Firmy i instytucje':context.document.body.className==='page-custom'?'Gry na zamówienie':context.document.body.className==='page-mission'?'Misja specjalna':'Kontakt','item':url}]});
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
  <meta property="og:image:alt" content="Ilustracja dzieci grających na wielkiej kolorowej planszy na szkolnym dziedzińcu">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<','\\u003c')}</script>
  <link rel="icon" href="${assetUrl('assets/favicon.svg')}" type="image/svg+xml">
  <link rel="preload" href="${assetUrl('assets/font-4.woff2')}" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${assetUrl('site.css')}">
  <noscript><link rel="stylesheet" href="${assetUrl('nojs.css')}"></noscript>
  <script src="${assetUrl('app.js')}" defer></script>
  <script src="${assetUrl('motion.js')}" defer></script>
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
fs.writeFileSync(path.join(root,'404.html'), `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><base href="/Staz1/"><title>Nie znaleziono strony | Wielkie Gry Planszowe</title><link rel="stylesheet" href="${assetUrl('site.css')}"></head><body class="page-error"><main id="main"><h1>Nie znaleziono strony</h1><p>Ten adres nie prowadzi do dostępnej strony. Wybierz ofertę lub wróć na stronę główną.</p><a class="button" href="./">Strona główna</a><nav aria-label="Dostępne strony"><p><a class="footer-contact" href="szkoly.html">Gry dla szkół</a> · <a class="footer-contact" href="firmy.html">Gry dla firm</a> · <a class="footer-contact" href="kontakt.html">Kontakt</a></p></nav></main></body></html>`);
console.log('Rendered 6 pages, 404, sitemap.xml and minified site.css.');
