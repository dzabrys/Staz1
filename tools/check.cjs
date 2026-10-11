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
 for(const [width,height] of [[1920,1080],[1536,864],[1500,900],[1366,768],[1024,768],[900,768],[768,1024],[600,800],[390,844],[320,740]]){
  await page.setViewportSize({width,height});
  for(const route of routes){
   const response=await page.goto('http://127.0.0.1:4173/'+route);
   assert.equal(response.status(),200,route);
   await page.evaluate(()=>document.fonts.ready);
   await page.locator('h1').waitFor();
   // Verify all asset URLs, including images intentionally deferred below the fold.
   await page.evaluate(async()=>{
    await Promise.all([...document.images].map(async image=>{
     image.loading='eager';
     await image.decode().catch(()=>{});
    }));
   });
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   assert.ok(dimensions.scroll<=width+1,`${route} overflows at ${width}: ${dimensions.scroll}`);
   assert.deepEqual(dimensions.images,[],`${route} has missing images`);
   assert.equal(await page.locator('main h1').count(),1,`${route} must have one main heading`);
   assert.equal(await page.locator('link[rel="canonical"]').count(),1,`${route} must have one canonical`);
   if(route==='index.html') {
    const layout=await page.evaluate(()=>({
     height:document.documentElement.scrollHeight,
     clipped:[...document.querySelectorAll('.audience')].filter(card=>card.querySelector('.audience-copy').getBoundingClientRect().bottom>card.getBoundingClientRect().bottom+1).length
    }));
    assert.equal(layout.clipped,0,`Audience cards are clipped at ${width}`);
    if(width>=1024) assert.ok(layout.height<=height+1,`Home does not fit ${width}x${height}: ${layout.height}`);
   }
   if(['szkoly.html','firmy.html'].includes(route)) {
    assert.ok(await page.evaluate(()=>document.querySelector('.school-offer').getBoundingClientRect().bottom<=document.querySelector('.games-section').getBoundingClientRect().top+1),`${route} offer overlaps the games at ${width}`);
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.game-copy')].every(copy=>{
     const button=copy.querySelector('.game-more').getBoundingClientRect();
     return [...copy.querySelectorAll('h3,p')].every(text=>{
      const rect=text.getBoundingClientRect();
      const overlaps=rect.left<button.right-1&&rect.right>button.left+1&&rect.top<button.bottom-1&&rect.bottom>button.top+1;
      return !overlaps&&text.scrollWidth<=text.clientWidth+1;
     });
    })),`${route} card text overlaps an arrow or its column at ${width}`);
   }
   if(route!=='index.html') {
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('main h1, main h2, .steps h3, .steps p, .benefits .feature > span:not(.crop), .supplemental p')].every(text=>text.scrollWidth<=text.clientWidth+1)),`${route} text exceeds its column at ${width}`);
    assert.ok(await page.evaluate(()=>[...document.querySelectorAll('.company-photo > .crop, .custom-photo > .crop')].every(crop=>{
     const rect=crop.getBoundingClientRect();
     const ratio=parseFloat(crop.style.getPropertyValue('--crop-ratio'));
     return Math.abs(rect.width/rect.height-ratio)<.01;
    })),`${route} photo crop shows content outside its source rectangle at ${width}`);
   }
   if(route==='gry-na-zamowienie.html') {
    assert.ok(await page.evaluate(()=>{
     const process=document.querySelector('.process').getBoundingClientRect();
     return ['.custom-intro','.handwritten'].every(selector=>document.querySelector(selector).getBoundingClientRect().bottom<=process.top+1);
    }),`Custom introduction overlaps the process at ${width}`);
   }
   await page.screenshot({path:`artifacts/${route.replace('.html','')}-${width}.png`,fullPage:true});
  }
 }
 await page.setViewportSize({width:1536,height:1024});
 await page.goto('http://127.0.0.1:4173/');
 await page.getByRole('button',{name:'Następny slajd'}).click();
 assert.ok(await page.locator('.hero-copy .button').innerText().then(t=>t.includes('Poznaj gry dla szkół')));
 await page.getByRole('button',{name:'Pokaż slajd 3'}).click();
 assert.equal(await page.locator('[data-slide="2"]').getAttribute('aria-pressed'),'true');
 const heading=await page.locator('.hero-copy h1').innerText();
 assert.ok(heading.includes('Wielkie gry')&&heading.includes('planszowe'),'SEO heading stays stable across slides');
 const alignment=await page.evaluate(()=>[...document.querySelectorAll('.carousel-prev,.carousel-next,.hero-copy .button')].map(button=>{
  const b=button.getBoundingClientRect(),s=button.querySelector('svg').getBoundingClientRect();
  return {centerOffset:Math.abs((s.y+s.height/2)-(b.y+b.height/2)),outside:s.x<b.x||s.right>b.right};
 }));
 assert.ok(alignment.every(a=>a.centerOffset<1&&!a.outside),'Arrows must be centered and contained');
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
 await page.setViewportSize({width:320,height:740});
 await page.goto('http://127.0.0.1:4173/');
 await page.getByRole('button',{name:'Pokaż slajd 3'}).click();
 const cta=await page.locator('.hero-copy .button').boundingBox();
 assert.ok(cta.x>=0&&cta.x+cta.width<=320,'Long CTA fits a narrow mobile viewport');
 await page.screenshot({path:'artifacts/home-slide-3-320.png',fullPage:true});
 // A short laptop window may scroll vertically, but must never crop the cards.
 await page.setViewportSize({width:1280,height:600});
 await page.goto('http://127.0.0.1:4173/');
 assert.equal(await page.evaluate(()=>[...document.querySelectorAll('.audience')].filter(c=>c.querySelector('.audience-copy').getBoundingClientRect().bottom>c.getBoundingClientRect().bottom+1).length),0);
 const plain=await browser.newContext({javaScriptEnabled:false});
 const htmlPage=await plain.newPage();
 const titles=new Set(),descriptions=new Set();
 for(const route of routes){
  await htmlPage.goto('http://127.0.0.1:4173/'+route);
  assert.equal(await htmlPage.locator('main h1').count(),1,`${route} has content without JavaScript`);
  assert.ok(await htmlPage.locator('main').innerText().then(t=>t.length>150));
  titles.add(await htmlPage.title());
  descriptions.add(await htmlPage.locator('meta[name="description"]').getAttribute('content'));
  assert.ok((await htmlPage.locator('link[rel="canonical"]').getAttribute('href')).startsWith('https://dzabrys.github.io/Staz1/'));
 }
 assert.equal(titles.size,6,'Every page has a unique title');
 assert.equal(descriptions.size,6,'Every page has a unique description');
 await plain.close();
 assert.deepEqual(errors,[]);
 console.log('PASS: 6 routes × 10 viewports; desktop fit, card arrows separated from text, correct photo crops, readable process and footer, mobile CTA, images, carousel, search, dialogs, menu, unique SEO metadata and content without JavaScript.');
 await browser.close();
})().catch(err=>{console.error(err);process.exit(1)});
