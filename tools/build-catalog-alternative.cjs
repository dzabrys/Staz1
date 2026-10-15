const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),out=path.join(root,'2');
const source=fs.readFileSync(path.join(root,'templates.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'offer-templates.js'),'utf8');
const context=vm.createContext({location:{pathname:'/Staz1/wielkie-gry-planszowe.html'},document:{body:{}},assetCrop:(s,x,y,w,h,cls='',alt='')=>`<img class="crop ${cls}" src="assets/${s}-${x}-${y}-${w}-${h}.webp" width="${w}" height="${h}" alt="${alt}" loading="lazy" decoding="async">`});
vm.runInContext(source,context);
const groups=vm.runInContext('JSON.stringify([{title:"Przygoda i wspólna zabawa",id:"przygodowe",items:classicGames},{title:"Nauka przez działanie",id:"dla-szkol",items:educationalGames},{title:"Wspólne wyzwania zespołu",id:"dla-firm",items:educationalGames.filter(g=>g.group==="company")}])',context);
const render=group=>{
 const cards=items=>vm.runInContext('('+JSON.stringify(items)+').map(catalogCard).join("")',context);
 const remaining=group.items.slice(5);
 return `<section class="catalog-section" id="${group.id}" aria-labelledby="title-${group.id}"><div class="catalog-section-heading"><h2 id="title-${group.id}">${group.title}</h2><span>${group.items.length} propozycji</span></div><div class="catalog-grid">${cards(group.items.slice(0,5))}</div>${remaining.length?`<details class="catalog-more"><summary><span class="more-label">Pokaż więcej gier (${remaining.length})</span><span class="less-label">Zwiń listę</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div class="catalog-more-content"><div class="catalog-grid">${cards(remaining)}</div></div></details>`:''}</section>`;
};
let html=fs.readFileSync(path.join(root,'wielkie-gry-planszowe.html'),'utf8');
const canonical=html.match(/rel="canonical" href="([^"]+)"/)[1];
const start=html.indexOf('<section class="catalog-section"'),end=html.indexOf('<div class="offer-note">',start);assert(start>0&&end>start);
html=html.slice(0,start)+JSON.parse(groups).map(render).join('')+html.slice(end);
const css=`
.catalog-variant-note{font-size:14px;color:#536076;margin-bottom:20px}
.catalog-variant-note a{text-decoration:underline;text-underline-offset:3px}
.catalog-more{margin-top:24px}
.catalog-more summary{display:flex;align-items:center;justify-content:center;gap:12px;width:max-content;max-width:100%;min-height:46px;margin-inline:auto;padding:12px 22px;list-style:none;cursor:pointer;color:var(--navy);background:#fff;border:1px solid #10247824;border-radius:999px;font-size:15px;line-height:1.25;font-weight:700;transition:background-color .35s ease,color .35s ease,transform .35s ease}
.catalog-more summary::-webkit-details-marker{display:none}
.catalog-more summary svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .35s ease}
.catalog-more .less-label{display:none}
.catalog-more[open] .less-label{display:inline}
.catalog-more[open] .more-label{display:none}
.catalog-more[open] summary svg{transform:rotate(180deg)}
.catalog-more-content{padding-top:24px}
.catalog-more[open] .catalog-more-content{animation:catalog-unfold .35s ease-out}
@keyframes catalog-unfold{from{opacity:.5;transform:translateY(6px)}to{opacity:1;transform:none}}
@media(hover:hover) and (pointer:fine){.catalog-more summary:is(:hover,:focus-visible){background:var(--navy);color:#fff;transform:scale(1.025)}.catalog-more summary:active{transform:scale(.98)}}
@media(prefers-reduced-motion:reduce){.catalog-more-content{animation:none!important}.catalog-more summary,.catalog-more summary svg{transition:none!important}.catalog-more summary{transform:none!important}}
`;
const hash=crypto.createHash('sha256').update(css).digest('hex').slice(0,12);
html=html.replace('<head>','<head><base href="../">').replace(/href="#([^"]+)"/g,'href="2/#$1"').replace(/name="robots" content="[^"]+"/,'name="robots" content="noindex,follow"')
 .replace('</head>',`<link rel="stylesheet" href="2/catalog.css?v=${hash}"></head>`)
 .replace(/(<meta property="og:url" content=")[^"]+/, '$1'+new URL('2/',canonical).href)
 .replace('<div class="offer-heading">','<p class="catalog-variant-note">Wariant katalogu · <a href="wielkie-gry-planszowe.html">Wróć do wersji głównej</a></p><div class="offer-heading">');
assert.equal((html.match(/<details class="catalog-more"/g)||[]).length,1);
assert.equal((html.match(/class="catalog-card"/g)||[]).length,20);
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'index.html'),html);fs.writeFileSync(path.join(out,'catalog.css'),css);
fs.writeFileSync(path.join(out,'README.md'),`# Wariant katalogu 2\n\nAdres: ${new URL('2/',canonical).href}\n\nKażda kategoria pokazuje najpierw pięć produktów. Gdy jest ich więcej, natywny element details rozwija następne karty w dół. Kategoria Nauka przez działanie zawiera w tym wariancie dziesięć istniejących gier edukacyjnych. Pozostałe dwie kategorie mają po pięć, więc nie pokazują przycisku rozwijania. Nie dodano fikcyjnych produktów.\n\nWszystkie karty i linki znajdują się w HTML. Rozwijanie działa bez JavaScriptu; animacje respektują ograniczenie ruchu. Wariant ma noindex,follow i canonical do głównego katalogu. Główna wersja katalogu pozostaje niezależna. Generator: tools/build-catalog-alternative.cjs.\n`);
console.log('Built /2/: three independent categories, 5 + expandable 5 cards in education.');
