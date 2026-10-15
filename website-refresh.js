/* Local v60: concrete content and consistent layouts, built as static HTML. */
const audienceContent = {
 school: {
  title:'Wielkie gry <em>dla szkół</em>', crumb:'Szkoły',
  lead:'Przyroda, ekologia, bezpieczeństwo w sieci i krytyczne myślenie. Wybierz temat do wspólnej pracy z klasą.',
  label:'Gry dla szkół', heading:'Polecane gry <em>dla szkół</em>',
  photo:'assets/hero-768.webp', photoAlt:'Ilustracja dzieci podczas wspólnej gry na wielkiej planszy',
  items:educationalGames.filter(g=>g.group==='school'),
  topics:[['Przyroda i ekologia','gra-obieg-zamkniety-wody.html'],['Bezpieczeństwo w internecie','gra-niebezpieczna-siec.html'],['Media i informacje','gra-krytyczne-myslenie.html']],
  context:'Do wyboru tematu zajęć', note:'Oznaczenia na kartach wskazują klasy. Szczegóły i wariant gry ustalimy w zapytaniu.',
  benefits:[['Wybierz temat','Zacznij od zagadnienia, które chcesz omówić z klasą.'],['Poznaj grę','Sprawdź opis i sugerowaną grupę odbiorców.'],['Dopasuj wariant','Zapytaj o format i materiały do swoich zajęć.']]
 },
 company: {
  title:'Wielkie gry <em>dla firm i instytucji</em>', crumb:'Firmy i instytucje',
  lead:'Wspólna aktywność na szkolenie, wydarzenie lub spotkanie zespołu. Dobierz temat do celu i uczestników.',
  label:'Gry dla firm i instytucji', heading:'Propozycje <em>dla Twojego zespołu</em>',
  photo:'assets/company-650-106-538-444.webp', photoAlt:'Ilustracja wspólnej gry zespołu podczas wydarzenia',
  items:educationalGames.filter(g=>g.group==='company'),
  topics:[['Integracja zespołu','gra-team-building.html'],['Komunikacja i współpraca','gra-komunikacja-i-wspolpraca.html'],['Odpowiedzialność i ekologia','gra-zrownowazony-rozwoj.html']],
  context:'Zacznij od celu spotkania', note:'Na kartach znajdziesz sugerowany wiek. Zakres gry i sposób wykorzystania dobierzemy do grupy.',
  benefits:[['Cel spotkania','Integracja, komunikacja czy rozmowa o odpowiedzialności?'],['Uczestnicy','Określ liczbę osób i charakter zespołu.'],['Miejsce i termin','Podaj dostępną przestrzeń oraz datę wydarzenia.']]
 }
};
const audienceCard = g => `<article class="game-card"><a class="game-link" href="${productUrl(g)}" aria-label="Poznaj grę: ${g.title}"><div class="game-image">${productPhoto(g)}<span class="age">${g.group==='school'?'Klasy ':''}${g.age}</span></div><div class="game-copy"><h3>${cardTitle(g.title)}</h3><p>${textOnly(g.desc)}</p><div class="audience-card-bottom">${indicativePrice(g.group)}<span class="game-more" aria-hidden="true">${arrows}</span></div></div></a></article>`;
const renderAudience = type => {
 const d=audienceContent[type];
 return `<main id="main" class="${type==='school'?'schools-main':'company-main'} audience-page">
  ${breadcrumb(d.crumb)}
  <section class="audience-hero" aria-labelledby="audience-title"><div class="audience-hero-copy"><p class="site-eyebrow">${d.label}</p><h1 id="audience-title">${d.title}</h1><p class="audience-lead">${d.lead}</p><div class="audience-actions">${button('Zobacz propozycje','#polecane')}<a class="text-action" href="kontakt.html?rodzaj=dobor&temat=${encodeURIComponent(d.label)}#formularz-kontaktowy">Pomóżcie mi wybrać ${arrows}</a></div><nav class="audience-topics" aria-label="${d.context}"><span>${d.context}</span>${d.topics.map(([label,href])=>`<a href="${href}">${label}</a>`).join('')}</nav></div><figure class="audience-hero-media"><img src="${d.photo}" width="768" height="512" fetchpriority="high" decoding="async" alt="${d.photoAlt}"><figcaption>Wspólny temat. Wspólna rozgrywka.</figcaption></figure></section>
  <section class="games-section" id="polecane" aria-labelledby="recommended-title"><div class="audience-section-heading"><h2 id="recommended-title">${d.heading}</h2><p>${d.note}</p></div><div class="games-grid">${d.items.map(audienceCard).join('')}</div></section>
  <section class="audience-guidance" aria-labelledby="guidance-title"><h2 id="guidance-title">Jak dobrać <em>grę do grupy?</em></h2><ol>${d.benefits.map(([title,desc],i)=>`<li><span aria-hidden="true">0${i+1}</span><div><h3>${title}</h3><p>${desc}</p></div></li>`).join('')}</ol></section>
 </main>`;
};
const homeRefreshed = () => {
 let html=home().replace("Zobacz więcej</span>","Gry dla szkół</span>").replace("Zobacz więcej</span>","Gry dla firm</span>").replace("Zobacz więcej</span>","Własny projekt</span>");
 const audience=html.indexOf('<div class="audiences">'),hero=html.indexOf('<section class="hero-carousel"'),end=html.indexOf('</main>');
 return html.slice(0,audience)+html.slice(hero,end)+html.slice(audience,hero)+html.slice(end);
};
const contactForm = () => `<section class="game-inquiry contact-inquiry" id="formularz-kontaktowy" tabindex="-1" aria-labelledby="inquiry-heading">
 <div class="inquiry-intro"><p class="site-eyebrow">Od pomysłu do konkretów</p><h2 id="inquiry-heading">Napisz, czego <em>potrzebujesz.</em></h2><p>Wystarczy kilka zdań. Nie musisz znać wszystkich szczegółów.</p><p class="inquiry-required">* Pole wymagane</p></div>
 <form class="inquiry-form" action="https://formspree.io/f/myekbjrg" method="post">
  <div class="inquiry-grid">
   <label>Twoje imię *<input name="name" autocomplete="given-name" required maxlength="120" placeholder="Jak się do Ciebie zwracać?"></label>
   <label>Adres e-mail *<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="Adres do odpowiedzi"></label>
   <label>Telefon <span>(opcjonalnie)</span><input name="telefon" type="tel" autocomplete="tel" maxlength="40" placeholder="Jeśli wolisz rozmowę"></label>
   <label>Szkoła lub organizacja <span>(opcjonalnie)</span><input name="organizacja" autocomplete="organization" maxlength="180" placeholder="Nazwa szkoły, firmy lub instytucji"></label>
   <label>W czym możemy pomóc?<select name="rodzaj_zapytania"><option>Pomoc w wyborze gry</option><option>Wycena gotowej gry</option><option>Gra na zamówienie</option><option>Inna sprawa</option></select></label>
   <label>Gra lub temat <span>(opcjonalnie)</span><input name="gra" list="inquiry-games" maxlength="180" placeholder="Wybierz grę albo wpisz swój pomysł"><datalist id="inquiry-games">${offerProducts.map(g=>`<option value="${g.title}">`).join('')}</datalist></label>
   <label class="inquiry-wide">Twoja wiadomość *<textarea name="message" required rows="5" maxlength="10000" placeholder="Dla kogo szukasz gry? Jaki temat lub cel masz na myśli? Jeśli znasz miejsce i termin, też możesz je podać."></textarea></label>
  </div>
  <details class="inquiry-details"><summary>Dodatkowe informacje o grupie lub wydarzeniu</summary><div class="inquiry-grid"><label>Uczestnicy<input name="grupa" maxlength="180" placeholder="Wiek i przybliżona liczba osób"></label><label>Miejsce<input name="miejsce" maxlength="180" placeholder="Miejscowość, sala lub plener"></label><label>Planowany termin<input name="termin" type="date"></label><label>Cel gry<input name="cel" maxlength="200" placeholder="Czego ma dotyczyć wspólna aktywność?"></label></div></details>
  <div class="inquiry-trap" aria-hidden="true"><label>Pozostaw puste<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div><input type="hidden" name="subject" value="Zapytanie o gry — Wielkie Gry Planszowe"><input type="hidden" name="zrodlo" value="Strona Kontakt — Wielkie Gry Planszowe">
  <div class="inquiry-actions"><button type="submit" class="inquiry-submit">Wyślij zapytanie ${arrows}</button><p>Odpowiemy na Twój adres e-mail.</p></div><p class="inquiry-status" role="status" aria-live="polite" aria-atomic="true" tabindex="-1"></p><p class="inquiry-alternative">Wolisz swoją pocztę? <a class="inquiry-email" href="mailto:biuro@wielkiegryplanszowe.pl">Napisz bezpośrednio</a>.</p>
  <noscript>Formularz możesz wysłać także bez JavaScriptu. Po wysłaniu otworzy się strona usługi obsługującej wiadomości.</noscript>
 </form></section>`;
const contactRefreshed = () => `<main id="main" class="contact-main refreshed-contact">${breadcrumb('Kontakt')}<div class="contact-layout"><section class="contact-introduction" aria-labelledby="contact-title"><p class="site-eyebrow">Wielkie Gry Planszowe</p><h1 id="contact-title">Porozmawiajmy<br><em>o Twojej grze.</em></h1><p class="contact-lead">Gotowa plansza, gra dla zespołu czy własny projekt? Opisz, dla kogo szukasz gry. Pomożemy wybrać kierunek.</p><div class="selected-inquiry" hidden><span>Temat zapytania</span><strong></strong></div><address class="contact-direct-v60"><div><span>Napisz do nas</span><a class="inquiry-email" href="mailto:biuro@wielkiegryplanszowe.pl">biuro@wielkiegryplanszowe.pl</a></div><div><span>Zadzwoń</span><a href="tel:+48600894644">+48 600 894 644</a></div><div><span>Adres</span><p>ul. Lubelska 37D<br>10-408 Olsztyn</p></div></address><div class="contact-before"><details><summary>Co pomoże w pierwszej rozmowie?</summary><ul><li>Wiek i liczba uczestników.</li><li>Cel zajęć lub wydarzenia.</li><li>Miejsce i planowany termin — jeśli są już znane.</li></ul><p>Masz tylko pomysł? To też dobry początek.</p></details></div></section>${contactForm()}</div></main>`;
const renderPage = () => page[2]==='home'?header+homeRefreshed():page[2]==='school'?header+renderAudience('school'):page[2]==='company'?header+renderAudience('company'):page[2]==='contact'?header+contactRefreshed():renderBasePage();
