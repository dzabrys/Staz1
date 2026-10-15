// Local comparison uses real page markup and the same assets/product links.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'mobile-propozycje');
fs.mkdirSync(out, { recursive: true });
const css = fs.readFileSync(path.join(root, 'mobile-options.css'), 'utf8');
const hash = crypto.createHash('sha256').update(css).digest('hex').slice(0, 12);
fs.writeFileSync(path.join(out, 'warianty.css'), css);
for (const page of ['firmy', 'szkoly']) {
  const source = fs.readFileSync(path.join(root, page + '.html'), 'utf8');
  for (const variant of ['siatka', 'karuzela']) {
    const html = source.replace('<head>', '<head><base href="../">').replace(/href="#([^"]+)"/g,`href="mobile-propozycje/${variant}-${page}.html#$1"`)
      .replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"')
      .replace('</head>', `<link rel="stylesheet" href="mobile-propozycje/warianty.css?v=${hash}"></head>`)
      .replace(/<body class="([^"]+)"/, `<body class="$1 mobile-${variant}"`)
      .replace('<div class="games-grid">', `<p class="mobile-layout-hint">${variant === 'karuzela' ? 'Przesuń karty, aby poznać kolejne gry' : 'Wybierz temat dla swojej grupy'}</p><div class="games-grid"${variant === 'karuzela' ? ' tabindex="0" role="region" aria-label="Gry — przewijana lista"' : ''}>`);
    fs.writeFileSync(path.join(out, variant + '-' + page + '.html'), html);
  }
}
const variants = [
  { id: 'przed', number: '01', title: 'Przed poprawką', desc: 'Zachowany wcześniejszy układ — do porównania zdjęcia i listy.', tag: 'Punkt odniesienia' },
  { id: 'teraz', number: '02', title: 'Poprawiona lista', desc: 'Dotychczasowe, wygodne karty. Zdjęcie kończy się w nagłówku.', tag: 'Aktualny widok' },
  { id: 'siatka', number: '03', title: 'Siatka ze zdjęciem', desc: 'Osobne zdjęcie nad listą i po dwie karty w rzędzie.', tag: 'Propozycja A' },
  { id: 'karuzela', number: '04', title: 'Karty przesuwane', desc: 'Większa fotografia gry i przewijanie kart w poziomie.', tag: 'Propozycja B' }
];
const panels = variants.map(v => `<article class="preview-card"><div class="preview-meta"><span class="preview-number">${v.number}</span><span class="preview-tag">${v.tag}</span></div><h2>${v.title}</h2><p>${v.desc}</p><a class="preview-open" data-variant="${v.id}" href="${v.id === 'teraz' ? '../firmy.html' : v.id + '-firmy.html'}">Otwórz ten widok <span aria-hidden="true">↗</span></a><div class="phone-shell"><iframe title="${v.title} — podgląd telefonu" loading="lazy" src="${v.id === 'teraz' ? '../firmy.html' : v.id + '-firmy.html'}" data-variant="${v.id}"></iframe></div></article>`).join('');
const gallery = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Porównanie układów mobilnych | Wielkie Gry Planszowe</title><link rel="icon" href="../assets/favicon.svg"><link rel="stylesheet" href="warianty.css?v=${hash}"></head><body class="mobile-gallery"><header class="gallery-header"><a href="../"><img src="../assets/logo.svg" width="260" height="78" alt="Wielkie Gry Planszowe — strona główna"></a><a href="../firmy.html">Wróć na stronę <span aria-hidden="true">↗</span></a></header><main><div class="gallery-intro"><p class="eyebrow">Lokalne propozycje · telefon</p><h1>Ta sama oferta.<br><em>Cztery sposoby prezentacji.</em></h1><p>Porównaj wcześniejszy widok z poprawioną listą i dwoma nowymi układami. Każdy podgląd można przewijać; przyciski prowadzą do tych samych gier.</p></div><nav class="gallery-switch" aria-label="Porównywana podstrona"><a href="?strona=firmy" data-page="firmy">Firmy i instytucje</a><a href="?strona=szkoly" data-page="szkoly">Szkoły</a></nav><section class="preview-grid" aria-label="Warianty układu mobilnego">${panels}</section><p class="gallery-footnote">To osobne podglądy. Propozycje A i B nie zastępują aktualnych podstron.</p></main><script src="porownanie.js"></script></body></html>`;
const controls='<div class="gallery-focus" role="group" aria-label="Fragment podglądu"><button type="button" data-focus="hero" aria-pressed="true">Od początku</button><button type="button" data-focus="cards" aria-pressed="false">Przejdź do kart gier ↓</button></div>';
fs.writeFileSync(path.join(out, 'index.html'), gallery.replace('<section class="preview-grid"', controls+'<section class="preview-grid"'));
fs.writeFileSync(path.join(out, 'porownanie.js'), `const page=new URLSearchParams(location.search).get('strona')==='szkoly'?'szkoly':'firmy';let focus='hero';const focusFrame=frame=>{const win=frame.contentWindow;const target=win.document.querySelector('.games-section');win.scrollTo({top:focus==='cards'&&target?target.getBoundingClientRect().top+win.scrollY-24:0,behavior:'instant'})};document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page')});document.querySelectorAll('[data-variant]').forEach(el=>{const variant=el.dataset.variant;const url=variant==='teraz'?'../'+page+'.html':variant+'-'+page+'.html';if(el.tagName==='IFRAME'){el.addEventListener('load',()=>focusFrame(el));el.src=url}else el.href=url});document.querySelectorAll('[data-focus]').forEach(button=>button.addEventListener('click',()=>{focus=button.dataset.focus;document.querySelectorAll('[data-focus]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('iframe').forEach(focusFrame)}));`);
console.log('Built local mobile comparison: before, current list, two-column grid and swipe cards.');
