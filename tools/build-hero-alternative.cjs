const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

// Build from the current homepage so its content, controls and motion stay in sync.
const root = path.resolve(__dirname, '..');
const out = path.join(root, '1');
const original = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const canonical = original.match(/rel="canonical" href="([^"]+)"/)[1];
const css = fs.readFileSync(path.join(root, 'site.css'), 'utf8')
 .replace(/url\((["']?)assets\//g, 'url($1../assets/');
const hash = crypto.createHash('sha256').update(css).digest('hex').slice(0, 12);
const html = original.replace('<head>', '<head><base href="../">').replace(/href="#([^"]+)"/g,'href="1/#$1"')
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

Budowana z aktualnej strony głównej przez tools/build-hero-alternative.cjs. Zawiera te same kafle, cienie, subtelne obramowania, animacje, kropki i menu. Wybrany układ z bocznymi marginesami jest teraz wspólny z głównym indeksem. Ten adres pozostaje zgodnym podglądem tego samego układu.

Wariant ma noindex,follow oraz canonical do głównej strony. Nawigacja prowadzi do głównego serwisu. Uruchomienie zwykłego budowania odświeża również ten wariant.
`);
console.log(`Built hero alternative /1/ (${hash}).`);
