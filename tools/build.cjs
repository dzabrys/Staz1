const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),out=root;
const cssLib=require('lightningcss');
const source=fs.readFileSync(path.join(root,'templates.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'offer-templates.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'custom-proposal.js'),'utf8');
const base=process.env.SITE_URL||'https://dzabrys.github.io/Staz1/';
const robots=process.env.SITE_INDEX==='0'?'noindex,follow':'index,follow';
const used=new Set(['assets/favicon.svg','assets/font-1.woff2','assets/font-2.woff2','assets/font-3.woff2','assets/font-4.woff2','assets/LICENSE-caveat.txt','assets/LICENSE-lato.txt','assets/hero-768.webp','assets/hero-1536.webp','assets/logo.svg']);
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const crop=(s,x,y,w,h,cls='',label='')=>{const name=`assets/${s}-${x}-${y}-${w}-${h}.webp`;used.add(name);return `<img class="crop ${cls}" src="${name}" width="${w}" height="${h}" alt="${esc(label)}" loading="${y<160||cls==='feature-icon'?'eager':'lazy'}" decoding="async">`;};
const context=file=>vm.createContext({assetCrop:crop,location:{pathname:new URL(base).pathname+file},document:{body:{}}});
const ctx=context('index.html');vm.runInContext(source,ctx);
const data=JSON.parse(vm.runInContext('JSON.stringify({games,companyGames,pages,steps,offerRoutes,offerProducts,searchEnabled,customFaq})',ctx));
const slug=s=>s.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu,'').replaceAll('ł','l').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const gameData=data.offerProducts;
const offerMeta={
 'gry-na-zamowienie.html':['Gry na zamówienie — plansze, puzzle i memory | Wielkie Gry Planszowe','Projektujemy gry na zamówienie dla szkół, firm i instytucji. Poznaj formaty, etapy tworzenia oraz odpowiedzi o wycenie, terminie i zawartości zestawu.'],
 'oferta.html':['Oferta — wielkie gry i projekty na zamówienie | Wielkie Gry Planszowe','Odkryj wielkie gry planszowe i inne gry customowe. Wybierz kategorię, poznaj plansze i znajdź pomysł dla swojej grupy.'],
 'wielkie-gry-planszowe.html':['Wielkie gry planszowe — katalog gier | Wielkie Gry Planszowe','Poznaj gry przygodowe, edukacyjne i zespołowe. Zobacz plansze, przeczytaj opisy i wybierz grę dla swojej grupy.'],
 'inne.html':['Inne gry — puzzle, memory i projekty customowe | Wielkie Gry Planszowe','Puzzle, memory, kółko i krzyżyk, tor do gry w kapsle i gry autorskie. Odkryj możliwości indywidualnego projektu.']
};
const pages=[...data.pages,...data.offerRoutes].map(([file,label])=>{
 if(offerMeta[file])return {file,label,title:offerMeta[file][0],desc:offerMeta[file][1]};
 const html=fs.readFileSync(path.join(root,file),'utf8');
 return {file,label,title:html.match(/<title>(.*?)<\/title>/)[1],desc:html.match(/name="description" content="([^"]+)"/)[1]};
});
gameData.forEach(g=>pages.push({file:'gra-'+slug(g.title)+'.html',label:g.title,title:g.title+' — '+(g.group==='custom'?'gra na zamówienie':'gra wielkoformatowa')+' | Wielkie Gry Planszowe',desc:g.title+': '+g.desc.replaceAll('<br>',' ')+'. Poznaj grę i porozmawiaj z nami o swojej grupie.',game:g}));
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(path.join(out,'assets'),{recursive:true});
const rawCSS=['design.css','offer.css','offer-landing.css','home-refinement.css','school-refinement.css','site-refinement.css','layout-refinement.css','viewport-fixes.css','home-index-layout.css','subpage-frame.css','custom-proposal.css'].map(file=>fs.readFileSync(path.join(root,file),'utf8')).join('\n');
fs.writeFileSync(path.join(out,'site.css'),cssLib.transform({filename:'site.css',code:Buffer.from(rawCSS),minify:true}).code);
for(const file of ['runtime.js','animations.js','design.css','templates.js'])fs.copyFileSync(path.join(root,file),path.join(out,file));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(out,file))).digest('hex').slice(0,12);
const search=pages.map(p=>({href:p.file,title:p.label,desc:p.desc}));
const dialogs=data.searchEnabled?`<dialog id="search-dialog" aria-labelledby="search-title"><button class="close-dialog" aria-label="Zamknij wyszukiwarkę">×</button><h2 id="search-title">Czego szukasz?</h2><label for="search-input">Wyszukaj stronę lub grę</label><input id="search-input" type="search" placeholder="Np. szkoły, puzzle, komunikacja…"><p id="search-status" role="status" aria-live="polite" aria-atomic="true"></p><div id="search-results"></div></dialog><script id="search-data" type="application/json">${JSON.stringify(search).replaceAll('<','\\u003c')}</script>`:'';
for(const p of pages){let markup,body,crumbs=[['Strona główna',base]];
if(!p.game){const c=context(p.file);markup=vm.runInContext(source+'\nrenderPage()',c);body=c.document.body.className;if(p.file!=='index.html')crumbs.push([p.label,base+p.file]);}
else{const g=p.game,c=context('oferta.html');vm.runInContext(source,c);body='page-product';crumbs.push(['Oferta',base+'oferta.html'],[g.category,base+g.categoryFile],[g.title,base+p.file]);markup=vm.runInContext('header+renderProduct('+JSON.stringify(g)+')',c);}
if(!p.game && data.offerRoutes.some(([file])=>file===p.file))crumbs=[['Strona główna',base],['Oferta',base+'oferta.html'],[p.label,base+p.file]];
markup=markup.replace(/((?:src|href)=")(assets\/[^"?]+)"/g,(_,prefix,file)=>{used.add(file);return prefix+file+'?v='+hash(file)+'"'});
const url=base+(p.file==='index.html'?'':p.file),schema=[{'@context':'https://schema.org','@type':'WebPage',name:p.title,description:p.desc,url,'@id':url+'#webpage',inLanguage:'pl',publisher:{'@id':base+'#organization'},isPartOf:{'@id':base+'#website'}}];if(crumbs.length>1)schema.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map(([name,item],i)=>({'@type':'ListItem',position:i+1,name,item}))});
schema.push(...require('./site-entities.cjs')(base,p,data.customFaq));
if(p.file==='gry-na-zamowienie.html')schema[0].mainEntity={'@id':url+'#service'};
let html=`<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#102478"><meta name="robots" content="${robots}"><title>${esc(p.title)}</title><meta name="description" content="${esc(p.desc)}"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:locale" content="pl_PL"><meta property="og:site_name" content="Wielkie Gry Planszowe"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${base}${p.file==='gry-na-zamowienie.html'?'assets/oferta-custom-cover.webp':'assets/hero-1536.webp'}"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="assets/favicon.svg"><link rel="preload" href="assets/font-4.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="site.css?v=${hash('site.css')}"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script><script src="runtime.js?v=${hash('runtime.js')}" defer></script><script src="animations.js?v=${hash('animations.js')}" defer></script></head><body class="${body}"><a class="skip-link" href="#main">Przejdź do treści</a><div id="app">${markup}</div>${dialogs}</body></html>`;
if(p.file==='kontakt.html')html=html.replace('</head>',`<link rel="stylesheet" href="contact-form.css?v=${hash('contact-form.css')}"><script src="contact-form.js?v=${hash('contact-form.js')}" defer></script></head>`);
fs.writeFileSync(path.join(out,p.file),html);
}
for(const file of used)fs.copyFileSync(path.join(root,file),path.join(out,file));
fs.writeFileSync(path.join(out,'misja.html'),'<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=oferta.html"><link rel="canonical" href="'+base+'oferta.html"><title>Oferta | Wielkie Gry Planszowe</title></head><body><a href="oferta.html">Przejdź do oferty</a></body></html>');
fs.writeFileSync(path.join(out,'.nojekyll'),'');
fs.writeFileSync(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(p=>`<url><loc>${base+(p.file==='index.html'?'':p.file)}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(out,'README.md'),`# Wielkie Gry Planszowe

Aktualna strona: ${base}

${pages.length} statycznych stron, lokalne fonty, WebP, responsywny układ i animacje respektujące prefers-reduced-motion. Źródła: templates.js, offer-templates.js, design.css, offer.css, offer-landing.css, home-refinement.css, school-refinement.css, site-refinement.css, layout-refinement.css, viewport-fixes.css, home-index-layout.css, subpage-frame.css, runtime.js i animations.js. Formularz w głównej zakładce Kontakt: contact-form.css i contact-form.js. Strona gier na zamówienie: custom-proposal.js i custom-proposal.css. Dane firmy i usługi: tools/site-entities.cjs. Zasady stylistyki: STYLE_GUIDE.md.

## Warianty do porównania

Osobna alternatywa hero z większą przestrzenią po bokach i mniejszym navbarem: ${base}1/. Jest budowana z aktualnej strony głównej przez tools/build-hero-alternative.cjs.

Katalog z rozwijanymi kategoriami: ${base}2/. Pierwsze pięć kart i kolejne rozwijane w dół osobno w każdej kategorii. Wariant ma noindex,follow i canonical do głównego katalogu.

Cztery propozycje nagłówków oferty: ${base}oferta-propozycje/a.html (biały pasek), b.html (granatowy pasek), c.html (biała etykieta), d.html (nazwa nad zdjęciem). Są budowane przez tools/build-offer-options.cjs. Warianty mają noindex,follow i canonical do głównego widoku.

## Podglądy projektu

Wszystkie podglądy: ${base}podglady/. Porównanie układów na telefonie: ${base}mobile-propozycje/. Strona Kontakt z formularzem: ${base}test-formularzy/kontakt-podglad.html. Porównanie usług formularzy: ${base}test-formularzy/.

Warianty mobilne buduje tools/build-mobile-options.cjs ze wspólnych stron. Wcześniejszy wygląd zachowano w mobile-propozycje/przed-*.html i przed.css. Główna strona Kontakt zawiera formularz przeniesiony z kontakt2.html; jego styl i zachowanie określają contact-form.css i contact-form.js. Osobny starszy podgląd generuje test-formularzy/build-contact-example.cjs. Strony porównawcze mają noindex,follow.

## Budowanie

npm ci
npm run build
npm start

Domyślny adres canonical: https://dzabrys.github.io/Staz1/. Można zmienić SITE_URL. Główna wersja ma index,follow; SITE_INDEX=0 wyłącza indeksowanie. Kopia /wersja-2/ ma noindex,follow.

## Treści i dane uporządkowane

Wyszukiwarka jest obecnie ukryta (searchEnabled=false). Strona zamówień pokazuje formaty z istniejącego katalogu, etapy, FAQ i przycisk e-mail ze szkicem briefu. Organization i WebSite są powiązane z każdą stroną. Service i FAQPage występują na podstronie gier na zamówienie; FAQ pochodzi z tego samego źródła co widoczne odpowiedzi. To nie gwarantuje cytowania przez AI.

Kontakt z formularzem w wariancie /3/ jest odtwarzany przez tools/build-contact-alternative.cjs.

## Materiały do uzupełnienia

Ceny oznaczone jako poglądowe są przykładowe (1 490 zł i 1 990 zł). Rzeczywiste ceny i brakujące parametry należy ustalić indywidualnie. Oznaczenia demonstracyjne i fikcyjne dane kontaktowe nie są publikowane. Źródła plansz i inspiracji opisano w OFFER_DESIGN.md.
`);
fs.mkdirSync(path.join(out,'tools'),{recursive:true});
fs.writeFileSync(path.join(out,'tools/serve.cjs'),`const http=require('http'),fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..'),types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};http.createServer((req,res)=>{let file;try{const url=new URL(req.url,'http://localhost');let p=decodeURIComponent(url.pathname);p=p.replace(/^\\/Staz1(?=\\/)/,'');file=path.resolve(root,'.'+p)}catch{res.writeHead(400).end();return}if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(err?'Nie znaleziono strony':data)})}).listen(4175,'127.0.0.1',()=>console.log('http://127.0.0.1:4175/Staz1/'));`);
require('./build-offer-options.cjs');
require('./build-hero-alternative.cjs');
require('./build-catalog-alternative.cjs');
require('./build-mobile-options.cjs');
require('../test-formularzy/build-contact-example.cjs');
require('./build-contact-alternative.cjs');
console.log(`Built ${pages.length} static pages and ${used.size} assets in ${out}. Preview robots: ${robots}`);
