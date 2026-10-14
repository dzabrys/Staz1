const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

// Build from the current homepage so its content, controls and motion stay in sync.
const root = path.resolve(__dirname, '..');
const out = path.join(root, '1');
const original = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const canonical = original.match(/rel="canonical" href="([^"]+)"/)[1];
const adjustment = `
/* Hero alternative: 90% of the main composition width, with a matching smaller header. */
@media(min-width:1201px){
 .page-home .home-main,.page-home .home-footer{width:calc(90% - clamp(64.8px,9vw,172.8px));max-width:1476px}
 .page-home #app{grid-template-rows:92px minmax(0,1fr) auto}
 .page-home #app>.header{width:calc(90% - clamp(64.8px,9vw,172.8px));max-width:1476px;height:92px;margin-inline:auto;padding:8px 0;gap:20px}
 .page-home #app>.header .brand{flex:0 0 clamp(240px,18vw,260px);width:clamp(240px,18vw,260px);height:76px;max-width:none}
 .page-home #app>.header nav{height:56px}
 .page-home #app>.header nav>a{font-size:14px;padding-inline:7px;gap:6px}
 .page-home #app>.header nav svg{width:28px;height:28px}
 .page-home #app>.header .search-toggle{width:44px;height:44px}
 .page-home #app>.header .search-toggle svg{width:26px;height:26px}
}
`;
const css = fs.readFileSync(path.join(root, 'site.css'), 'utf8')
 .replace(/url\((["']?)assets\//g, 'url($1../assets/') + adjustment;
const hash = crypto.createHash('sha256').update(css).digest('hex').slice(0, 12);
const html = original.replace('<head>', '<head><base href="../">')
 .replace(/name="robots" content="[^"]+"/, 'name="robots" content="noindex,follow"')
 .replace(/href="site\.css\?v=[a-f0-9]+"/, `href="1/site.css?v=${hash}"`)
 .replace(/(<meta property="og:url" content=")[^"]+/, '$1' + canonical + '1/');
assert(html.includes(`rel="canonical" href="${canonical}"`));
assert(html.includes('class="menu-icon"'));
assert(html.includes('nav-label-fill'));
assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
fs.mkdirSync(out, {recursive:true});
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, 'site.css'), css);
fs.writeFileSync(path.join(out, 'README.md'), `# Alternatywa hero 1

Podgląd: ${canonical}1/

Budowana z aktualnej strony głównej przez tools/build-hero-alternative.cjs. Zawiera te same kafle, cienie, subtelne obramowania, animacje, kropki i menu. Od 1201 px hero i pasek kompetencji mają 90% szerokości wersji głównej; navbar jest dopasowany do tej szerokości, ma wysokość 92 px oraz mniejsze logo i ikony. Telefon zachowuje aktualny wspólny układ.

Wariant ma noindex,follow oraz canonical do głównej strony. Nawigacja prowadzi do głównego serwisu. Uruchomienie zwykłego budowania odświeża również ten wariant.
`);
console.log(`Built hero alternative /1/ (${hash}).`);
