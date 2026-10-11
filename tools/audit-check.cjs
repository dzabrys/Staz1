const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 const base=process.argv[3]||'http://127.0.0.1:4173/';
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 const urls=new Set();
 for(const route of ['index','szkoly','firmy','gry-na-zamowienie','misja','kontakt']) {
  assert.equal((await page.goto(base+route+'.html')).status(),200);
  const markup=await page.content();
  const schema=await page.locator('script[type="application/ld+json"]').textContent();
  assert.ok(JSON.parse(schema).some(x=>x['@type']==='WebPage'));
  assert.ok(!markup.includes('id="detail-dialog"'));
  for(const href of await page.locator('a[href]').evaluateAll(a=>a.map(x=>x.href))) {
   const url=new URL(href); if(url.origin===new URL(base).origin){url.hash='';urls.add(url.href);}
  }
  if(route==='szkoly'||route==='firmy') {
   assert.equal(await page.locator('.game-details').count(),5);
   await page.locator('.game-details summary').first().click();
   if(process.argv[4]) {
    await page.addScriptTag({path:process.argv[4]});
    const axe=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}}));
    assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
   }
  }
 }
 for(const url of urls) assert.equal((await page.request.get(url)).status(),200,url);
 await page.goto(base);
 await page.getByRole('button',{name:'Menu',exact:true}).click();
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
 assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
 await page.locator('.menu-toggle').click();
 await page.mouse.click(380,500);
 assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
 const dots=await page.locator('[data-slide]').evaluateAll(a=>a.map(e=>({width:e.offsetWidth,height:e.offsetHeight})));
 assert.ok(dots.every(r=>r.width>=44&&r.height>=44));
 const cta=page.locator('.hero-copy .button'); await cta.focus(); await page.keyboard.press('ArrowRight');
 assert.ok(await cta.evaluate(e=>e===document.activeElement));
 assert.equal(await cta.getAttribute('href'),'firmy.html');
 assert.match(await page.locator('#carousel-status').innerText(),/2 z 3/);
 await page.locator('.search-toggle').click(); await page.getByRole('searchbox').fill('szkoly');
 assert.ok(await page.locator('#search-results a').count()>0);
 await page.getByRole('searchbox').fill('team');
 assert.equal(await page.locator('#search-results a').count(),1);
 assert.match(await page.locator('#search-results a').getAttribute('href'),/firmy.html#gra-team-building/);
 if(process.argv[4]) {
  await page.addScriptTag({path:process.argv[4]});
  const axe=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}}));
  assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
 }
 await page.locator('#search-results a').click(); await page.waitForURL('**/firmy.html#gra-team-building');
 assert.equal(await page.locator('[data-company-game="0"]').evaluate(e=>e.open),true);
 await page.locator('.search-toggle').click(); await page.getByRole('searchbox').fill('komunikacja');
 await page.getByRole('link',{name:'Komunikacja i współpraca — dla firm',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('[data-company-game="3"]').open);
 assert.equal(await page.locator('#search-dialog').evaluate(e=>e.open),false,'Same-page search closes its dialog');
 assert.ok(await page.locator('[data-company-game="3"] summary').evaluate(e=>e===document.activeElement));
 await page.locator('[data-company-game="3"] summary').click();
 await page.locator('.search-toggle').click(); await page.getByRole('searchbox').fill('komunikacja');
 await page.getByRole('link',{name:'Komunikacja i współpraca — dla firm',exact:true}).click();
 await page.waitForFunction(()=>document.querySelector('[data-company-game="3"]').open);
 await page.goto(base+'szkoly.html?gra=0');
 assert.equal(await page.locator('[data-game="0"]').evaluate(e=>e.open),true);
 const missing=await page.goto(base+'nie-ma-takiej-strony');
 assert.equal(missing.status(),404);
 assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'),'noindex');
 assert.equal((await page.request.get(await page.getByRole('link',{name:'Strona główna'}).getAttribute('href').then(h=>new URL(h,new URL('/Staz1/',base)).href))).status(),200);
 assert.equal((await page.request.get(base+'sitemap.xml')).status(),200);
 const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const nojs=await plain.newPage(); await nojs.goto(base+'szkoly.html#gra-obieg-zamkniety-wody');
 assert.ok(await nojs.locator('#navigation').isVisible());
 assert.equal(await nojs.locator('[data-game="0"]').evaluate(e=>e.open),true,'Browser reveals a native linked description without JavaScript');
 await page.goto(base+'kontakt.html');
 assert.match(await page.locator('.contact-card').innerText(),/Dane testowe/);
 assert.equal(await page.locator('form').count(),0);
 await fs.mkdir('artifacts',{recursive:true});
 await page.screenshot({path:'artifacts/kontakt-audit-390.png',fullPage:true});
 await page.setViewportSize({width:1366,height:768}); await page.goto(base+'kontakt.html');
 await page.screenshot({path:'artifacts/kontakt-audit-1366.png',fullPage:true});
 await page.goto(base+'misja.html'); await page.screenshot({path:'artifacts/misja-audit-1366.png',fullPage:true});
 assert.deepEqual(errors,[]);
 await browser.close();
 console.log('AUDIT PASS: all internal links, structured data, native descriptions, accent-free and company search, focus, Escape/outside menu closing, 44px dots, 404, sitemap and demo contact.');
})().catch(e=>{console.error(e);process.exit(1)});
