/* Facts already visible on the contact page; no unverified prices, reviews or claims. */
module.exports = function siteEntities(base, page, faq = []) {
 const organization = {'@context':'https://schema.org','@type':'Organization','@id':base+'#organization',name:'Wielkie Gry Planszowe',url:base,logo:{'@type':'ImageObject',url:base+'assets/logo.svg'},email:'biuro@wielkiegryplanszowe.pl',telephone:'+48600894644',address:{'@type':'PostalAddress',streetAddress:'ul. Lubelska 37D',postalCode:'10-408',addressLocality:'Olsztyn',addressCountry:'PL'}};
 const website = {'@context':'https://schema.org','@type':'WebSite','@id':base+'#website',url:base,name:'Wielkie Gry Planszowe',inLanguage:'pl',publisher:{'@id':organization['@id']}};
 const nodes = [organization, website];
 if (page.file === 'gry-na-zamowienie.html') {
  const url = base + page.file;
  nodes.push({'@context':'https://schema.org','@type':'Service','@id':url+'#service',url,name:'Projektowanie i wykonanie gier na zamówienie',serviceType:'Gry wielkoformatowe, puzzle i memory na zamówienie',description:'Projektowanie gier dla szkół, firm i instytucji: dopasowanie tematu, zasad i grafiki oraz przygotowanie uzgodnionej wersji gry.',provider:{'@id':organization['@id']},mainEntityOfPage:{'@id':url+'#webpage'}});
  nodes.push({'@context':'https://schema.org','@type':'FAQPage','@id':url+'#pytania',isPartOf:{'@id':url+'#webpage'},inLanguage:'pl',mainEntity:faq.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))});
 }
 return nodes;
};
