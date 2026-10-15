/* Facts already visible on the contact page; no unverified prices, reviews or claims. */
module.exports = function siteEntities(base, page, faq = [], products = []) {
 const organization = {'@context':'https://schema.org','@type':'Organization','@id':base+'#organization',name:'Wielkie Gry Planszowe',url:base,logo:{'@type':'ImageObject',url:base+'assets/logo.svg'},email:'biuro@wielkiegryplanszowe.pl',telephone:'+48600894644',address:{'@type':'PostalAddress',streetAddress:'ul. Lubelska 37D',postalCode:'10-408',addressLocality:'Olsztyn',addressCountry:'PL'}};
 const website = {'@context':'https://schema.org','@type':'WebSite','@id':base+'#website',url:base,name:'Wielkie Gry Planszowe',inLanguage:'pl',publisher:{'@id':organization['@id']}};
 const nodes = [organization, website];
 const slug=title=>title.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu,'').replaceAll('ł','l').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
 if(page.game){
  const g=page.game,url=base+page.file;
  const product={'@context':'https://schema.org','@type':'Product','@id':url+'#product',name:g.title,url,description:g.detail,category:g.category,brand:{'@id':organization['@id']},mainEntityOfPage:{'@id':url+'#webpage'},additionalProperty:g.facts.map(([name,value])=>({'@type':'PropertyValue',name,value}))};
  // Illustrative topics are not passed off as photographs of a physical product.
  if(g.group==='classic'&&g.image)product.image=base+g.image;
  // Indicative display amounts are deliberately not represented as a real Offer.
  nodes.push(product);
 }
 const collectionGroups={'szkoly.html':g=>g.group==='school','firmy.html':g=>g.group==='company','wielkie-gry-planszowe.html':g=>g.group!=='custom','inne.html':g=>g.group==='custom'};
 if(collectionGroups[page.file]){
  const items=products.filter(collectionGroups[page.file]);
  nodes.push({'@context':'https://schema.org','@type':'ItemList','@id':base+page.file+'#catalog',name:page.label,numberOfItems:items.length,itemListElement:items.map((g,i)=>({'@type':'ListItem',position:i+1,name:g.title,url:base+'gra-'+slug(g.title)+'.html'}))});
 }
 if (page.file === 'gry-na-zamowienie.html') {
  const url = base + page.file;
  nodes.push({'@context':'https://schema.org','@type':'Service','@id':url+'#service',url,name:'Projektowanie i wykonanie gier na zamówienie',serviceType:'Gry wielkoformatowe, puzzle i memory na zamówienie',description:'Projektowanie gier dla szkół, firm i instytucji: dopasowanie tematu, zasad i grafiki oraz przygotowanie uzgodnionej wersji gry.',provider:{'@id':organization['@id']},mainEntityOfPage:{'@id':url+'#webpage'}});
  nodes.push({'@context':'https://schema.org','@type':'FAQPage','@id':url+'#pytania',isPartOf:{'@id':url+'#webpage'},inLanguage:'pl',mainEntity:faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))});
 }
 return nodes;
};
