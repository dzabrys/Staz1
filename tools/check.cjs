// Run: node tools/check.cjs <path-to-playwright-package>
const { chromium } = require(process.argv[2] || 'playwright');
const fs = require('node:fs/promises');
const assert = require('node:assert/strict');
(async()=>{
 const browser = await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL || 'msedge'});
 const page = await browser.newPage({viewport:{width:1536,height:1024},deviceScaleFactor:1});
 const errors=[];
 page.on('pageerror',err=>errors.push(err.message));
 const routes=['index.html','szkoly.html','gry-na-zamowienie.html','firmy.html','misja.html','kontakt.html'];
 await fs.mkdir('artifacts',{recursive:true});
 for(const width of [1536,768,390]){
  await page.setViewportSize({width,height:width===390?844:1024});
  for(const route of routes){
   const response=await page.goto('http://127.0.0.1:4173/'+route);
   assert.equal(response.status(),200,route);
   await page.evaluate(()=>document.fonts.ready);
   await page.locator('h1').waitFor();
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   assert.ok(dimensions.scroll<=width+1,`${route} overflows at ${width}: ${dimensions.scroll}`);
   assert.deepEqual(dimensions.images,[],`${route} has missing images`);
   if(!['misja.html','kontakt.html'].includes(route)) await page.screenshot({path:`artifacts/${route.replace('.html','')}-${width}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:1536,height:1024});
 await page.goto('http://127.0.0.1:4173/');
 await page.getByRole('button',{name:'Następny slajd'}).click();
 assert.ok(await page.locator('.hero-copy h1').innerText().then(t=>t.includes('dla szkół')));
 await page.getByRole('button',{name:'Pokaż slajd 3'}).click();
 assert.equal(await page.locator('[data-slide="2"]').getAttribute('aria-pressed'),'true');
 await page.getByRole('button',{name:'Otwórz wyszukiwarkę'}).click();
 await page.getByRole('searchbox').fill('wody');
 assert.equal(await page.locator('#search-results button').count(),1);
 await page.locator('#search-results button').click();
 await page.waitForURL('**/szkoly.html?gra=0');
 assert.ok(await page.locator('#detail-dialog').isVisible());
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('#detail-dialog').isVisible(),false);
 await page.goto('http://127.0.0.1:4173/firmy.html');
 await page.locator('[data-company-game="3"]').click();
 assert.ok(await page.getByRole('heading',{name:'Komunikacja i współpraca',exact:true}).last().isVisible());
 await page.keyboard.press('Escape');
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Menu'}).click();
 await page.getByRole('navigation').getByRole('link',{name:'Szkoły',exact:true}).click();
 await page.waitForURL('**/szkoly.html');
 assert.deepEqual(errors,[]);
 console.log('PASS: 6 routes × 3 widths; images, overflow, carousel, search, game dialogs, mobile navigation, no JavaScript errors.');
 await browser.close();
})().catch(err=>{console.error(err);process.exit(1)});
