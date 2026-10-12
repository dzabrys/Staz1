const $ = (selector, root=document) => root.querySelector(selector);
const crop = (source, x, y, w, h, cls='', label='') => `<span class="crop ${cls}" style="aspect-ratio:${w}/${h};--crop-ratio:${w/h}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'}><img src="assets/reference-${source}.webp" alt="" width="1536" height="1024" loading="${y<160?'eager':'lazy'}" decoding="async" draggable="false" style="width:${1536/w*100}%;left:${-x/w*100}%;top:0;transform:translateY(${-y/1024*100}%)"></span>`;
const arrows = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 16h21M18 7l9 9-9 9"/></svg>';
const paths = {
 home:'<path d="M4 15L24 3l20 12v5h-5v23H29V29H19v14H9V20H4z" fill="currentColor"/>',
 school:'<path d="M2 16L24 5l22 11-22 11z" fill="currentColor"/><path d="M10 22v14l14 7 14-7V22M44 18v17"/><path d="M43 34v6" stroke="#ff7900"/>',
 company:'<path d="M10 44V12l24-6v38M5 44h38M34 22h7v22"/><path d="M17 17h2m7-2h2m-11 9h2m7-2h2m-11 9h2m7-2h2M21 44v-7h7v7" stroke-width="4"/>',
 custom:'<path d="M20 4h8l1 6 5 2 5-3 5 6-4 5 1 5 6 2-2 8-6-1-4 4v6h-8l-1-6-5-2-5 3-5-6 4-5-1-5-6-2 2-8 6 1 4-4z"/><circle cx="25" cy="25" r="7"/>',
 mission:'<rect x="7" y="7" width="34" height="34" rx="3"/><path d="M8 10l16 15 16-15M8 38l12-11m20 11L28 27M13 15l11 10 11-10"/>',
 contact:'<rect x="5" y="9" width="38" height="30" rx="2"/><path d="M6 11l18 16 18-16M6 37l13-14m23 14L29 23"/>',
 search:'<circle cx="20" cy="20" r="12"/><path d="M29 29l11 11"/>'
};
const icon = name => `<svg viewBox="0 0 48 48" aria-hidden="true">${paths[name] || paths.home}</svg>`;
const pages = [ ['index.html','Strona główna','home'],['szkoly.html','Szkoły','school'],['firmy.html','Firmy i instytucje','company'],['gry-na-zamowienie.html','Gry na zamówienie','custom'],['misja.html','Misja specjalna','mission'],['kontakt.html','Kontakt','contact'] ];
const current = location.pathname.split('/').pop() || 'index.html';
const page = pages.find(item => item[0]===current) || pages[0];
const isHome = page[2] === 'home';
document.body.className = `page-${page[2]}`;
const header = `<header class="header"><a href="./" class="brand" aria-label="Wielkie Gry Planszowe — strona główna"><img class="brand-mark" src="assets/logo.svg" alt=""></a><button class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="navigation">☰ <span>Menu</span></button><nav id="navigation" aria-label="Nawigacja główna">${pages.map(([url,label,id]) => `<a href="${url}" ${id===page[2]?'aria-current="page"':''}>${icon(id)}<span>${label}</span></a>`).join('')}</nav><button class="search-toggle" aria-label="Otwórz wyszukiwarkę">${icon('search')}</button></header>`;
const button = (text,href,cls='') => `<a class="button ${cls}" href="${href}"><span class="button-label">${text}</span>${arrows}</a>`;
const breadcrumb = title => `<nav class="breadcrumb" aria-label="Ścieżka nawigacji"><ol><li><a href="./">Strona główna</a></li><li aria-current="page">${title}</li></ol></nav>`;
const social = (home=false) => `<div class="socials ${home?'socials-home':''}"><a class="footer-contact" href="kontakt.html">Kontakt i dane testowe ${arrows}</a><span class="demo-label">Wersja demonstracyjna</span></div>`;
const featureIcon = (i, source='home') => source==='home' ? crop('home',[532,694,854,1010,1161,1324][i],927,[67,61,58,61,58,68][i],70,'feature-icon') : crop(source,...i,'feature-icon');
const competencies = ['Krytyczne<br>myślenie','Kompetencje<br>społeczne','Wrażliwość<br>ekologiczna','Zdrowie<br>i dobrostan','Kreatywność','Kompetencje<br>przyszłości'];
const homeFooter = `<footer class="home-footer ${isHome?'':'subpage-footer'}">${isHome?social(true):'<h2>Kompetencje, które rozwijamy</h2>'}<div class="competencies">${competencies.map((text,i)=>`<div class="feature">${featureIcon(i)}<span>${isHome?text:text.replaceAll('<br>',' ')}</span></div>`).join('')}</div>${isHome?'':social()}</footer>`;
const home = () => `<main id="main" class="home-main"><div class="audiences"><article class="audience audience-school"><div class="card-photo">${crop('home',242,170,305,234)}</div><div class="audience-copy"><h2 class="underline">Szkoły</h2><p>Wielkie gry, które uczą, integrują i inspirują.</p>${button('Oferta dla szkół','szkoly.html')}</div></article><article class="audience audience-company"><div class="card-photo">${crop('home',253,418,295,245)}</div><div class="audience-copy"><h2 class="underline">Firmy i instytucje</h2><p>Angażujące gry na szkolenia, eventy i działania społeczne.</p>${button('Oferta dla firm','firmy.html')}</div></article><article class="audience audience-custom"><div class="card-photo">${crop('home',274,678,274,220)}</div><div class="audience-copy"><h2 class="underline">Gry na zamówienie</h2><p>Tworzymy gry dopasowane do Twoich celów i wartości.</p>${button('Gry na zamówienie','gry-na-zamowienie.html')}</div></article></div><section class="hero-carousel" aria-roledescription="karuzela" aria-label="Nasza oferta"><img class="hero-photo" src="assets/hero-1536.webp" srcset="assets/hero-768.webp 768w, assets/hero-1536.webp 1536w" sizes="(max-width: 600px) 100vw, (max-width: 1000px) 94vw, 65vw" width="1536" height="1024" fetchpriority="high" decoding="async" alt="Ilustracja dzieci grających na wielkiej kolorowej planszy"><div class="hero-shade"></div><div class="hero-copy"><h1>Wielkie gry<br><span>planszowe</span></h1><div class="hero-slide-copy"><p>Wielkie gry, które angażują,<br>uczą i zostają w pamięci.</p>${button('Poznaj gry dla szkół','szkoly.html')}</div></div><p class="visually-hidden" id="carousel-status" role="status" aria-live="polite" aria-atomic="true">Oferta 1 z 3: gry dla szkół.</p><button class="carousel-prev" aria-label="Poprzedni slajd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><button class="carousel-next" aria-label="Następny slajd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button><div class="carousel-dots">${[0,1,2].map(i=>`<button aria-label="Pokaż slajd ${i+1}" aria-pressed="${i===0}" data-slide="${i}"></button>`).join('')}</div></section></main>${homeFooter}`;
const games = [
 {title:'Obieg zamknięty wody',desc:'Przyroda, ekologia,<br>podstawy proekologiczne',age:'1–3',crop:[47,560,278,142],detail:'Gra o obiegu wody w przyrodzie. Kolorowa plansza zachęca do wspólnego odkrywania świata i rozmowy o ochronie zasobów naturalnych.'},
 {title:'Kurs na Planetę',desc:'Ekologia, klimat,<br>odpowiedzialne wybory',age:'4–6',crop:[339,560,280,142],detail:'Wspólna podróż po zagadnieniach ekologii i klimatu. Uczestnicy zastanawiają się, jak codzienne wybory wpływają na naszą planetę.'},
 {title:'Niebezpieczna Sieć',desc:'Cyberbezpieczeństwo,<br>krytyczne myślenie',age:'4–8',crop:[634,560,269,142],detail:'Gra poświęcona bezpieczeństwu w internecie. Jest punktem wyjścia do rozmowy o rozpoznawaniu zagrożeń i świadomym korzystaniu z sieci.'},
 {title:'W krainie Danii',desc:'Wiedza o krajach UE,<br>kulturoznawstwo',age:'1–8',crop:[916,560,294,142],detail:'Wielkoformatowa podróż do Danii. Poznawanie kraju i jego kultury łączy się ze wspólnym działaniem na planszy.'},
 {title:'Krytyczne myślenie',desc:'Media, dezinformacja,<br>kompetencje społeczne',age:'4–8',crop:[1224,560,272,142],detail:'Gra zachęca do zadawania pytań, sprawdzania informacji i współpracy. Tematy obejmują media, dezinformację i kompetencje społeczne.'}
];
const companyGames = [
 {title:'Team building',desc:'Współpraca, integracja,<br>komunikacja',age:'18+',crop:[37,573,279,124],detail:'Wspólne zadania na wielkiej planszy zachęcają do komunikacji, współpracy i integracji zespołu.'},
 {title:'Zrównoważony rozwój',desc:'Odpowiedzialność,<br>świadome decyzje',age:'16+',crop:[330,573,280,124],detail:'Rozgrywka otwiera rozmowę o odpowiedzialności, świadomych decyzjach i zrównoważonym rozwoju organizacji.'},
 {title:'Cyberbezpieczeństwo',desc:'Świadome korzystanie<br>z technologii',age:'16+',crop:[625,573,280,124],detail:'Gra poświęcona świadomemu korzystaniu z technologii i rozpoznawaniu zagrożeń w cyfrowym świecie.'},
 {title:'Komunikacja i współpraca',desc:'Budowanie zespołu,<br>rozwiązywanie problemów',age:'18+',crop:[919,573,280,124],detail:'Zespołowe wyzwania rozwijają komunikację i wspólne rozwiązywanie problemów.'},
 {title:'Kreatywne myślenie',desc:'Innowacyjność,<br>podejmowanie decyzji',age:'14+',crop:[1215,573,281,124],detail:'Przestrzeń do szukania pomysłów, odkrywania nowych perspektyw i podejmowania wspólnych decyzji.'}
];
const slug = text => text.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu,'').replaceAll('ł','l').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const gameCard = (game,i,source) => `<article class="game-card"><div class="game-image">${crop(source,...game.crop,'',game.title)}<span class="age" aria-label="${source==='schools'?'Klasy':'Wiek'} ${game.age}">${game.age}</span></div><div class="game-copy"><h3>${game.title}</h3><p>${game.desc.replaceAll('<br>',' ')}</p><button class="game-details-toggle" type="button" data-${source==='schools'?'game':'company-game'}="${i}" aria-expanded="false" aria-controls="game-details"><span>Opis gry</span><span class="game-more" aria-hidden="true">${arrows}</span></button></div></article>`;
const company = () => `<main id="main" class="company-main"><section class="company-hero subpage-hero"><div class="company-photo">${crop('company',650,106,538,444)}</div><div class="company-fade"></div>${breadcrumb('Firmy i instytucje')}<div class="company-intro subpage-intro"><h1>Wielkie gry<br><em class="underline">dla firm i instytucji</em></h1><p>Tworzymy angażujące gry wielkoformatowe, które wspierają<br class="desktop-break"> rozwój kompetencji, integrują zespoły i ułatwiają komunikację.</p>${button('Zapytaj o ofertę','kontakt.html')}</div><aside class="school-offer company-offer subpage-aside"><h2>Nasza oferta<br><em class="underline">dla firm i instytucji</em></h2><p>Proponujemy gotowe programy<br class="desktop-break"> i scenariusze zajęć dostosowane do potrzeb Twojej organizacji. Grywalizacja to skuteczne narzędzie budowania zaangażowania, wzmacniania kompetencji i integracji zespołu. Dzięki połączeniu zabawy z nauką uczestnicy rozwijają umiejętności współpracy, komunikacji, kreatywnego myślenia<br class="desktop-break"> oraz podejmowania decyzji.</p></aside></section><section class="games-section"><h2 class="underline">Polecane gry dla firm i instytucji</h2><div class="games-grid">${companyGames.map((game,i)=>gameCard(game,i,'company')).join('')}</div></section></main><footer class="benefits"><h2>Dlaczego warto <span>wybrać</span> nasze gry?</h2><div class="benefits-row">${['Nowoczesna<br>forma edukacji','Rozwijają<br>kompetencje<br>przyszłości','Integrują<br>zespoły<br>i budują relacje','Wspierają CSR<br>i zrównoważony<br>rozwój','Wspólna aktywność<br>i rozmowa<br>uczestników'].map((text,i)=>`<div class="feature">${featureIcon([[49,891,65,65],[291,889,66,70],[493,890,73,67],[756,889,62,71],[1021,890,65,71]][i],'schools')}<span>${text.replaceAll('<br>',' ')}</span></div>`).join('')}${social()}</div></footer>`;
const benefits = (type) => {
 const school=type==='school';
 const texts=school?['Edukacja<br>przez wspólne<br>działanie','Rozwijają<br>kompetencje<br>przyszłości','Angażują,<br>uczą przez działanie<br>i budują relacje','Uczą odpowiedzialności<br>i postaw prospołecznych','Wspólne zadania<br>i rozmowa po grze']:['Indywidualne<br>podejście do Twoich<br>celów','Kreatywne<br>i skuteczne<br>rozwiązania','Dopasowanie<br>do różnych<br>grup odbiorców','Wysoka jakość<br>wykonania<br>i estetyka','Gra, która angażuje,<br>edukuje i pozostaje<br>w pamięci','Konsultacje<br>i wspólna praca<br>nad projektem'];
 const coords=school?[[49,891,65,65],[291,889,66,70],[493,890,73,67],[756,889,62,71],[1021,890,65,71]]:[[51,896,72,72],[292,897,62,72],[475,898,77,68],[709,898,66,72],[895,899,63,70],[1107,899,70,70]];
 return `<footer class="benefits"><h2>${school?'Dlaczego warto <span>wprowadzić gry</span> do szkoły?':'Dlaczego warto <span>współpracować z nami</span>?'}</h2><div class="benefits-row">${texts.map((text,i)=>`<div class="feature">${featureIcon(coords[i],school?'schools':'custom')}<span>${text.replaceAll('<br>',' ')}</span></div>`).join('')}${social()}</div></footer>`;
};
const schools = () => `<main id="main" class="schools-main"><section class="schools-hero subpage-hero"><div class="school-scene">${crop('schools',730,128,450,430)}</div><img class="school-hero-photo" src="assets/hero-1536.webp" srcset="assets/hero-768.webp 768w, assets/hero-1536.webp 1536w" sizes="(max-width: 600px) 100vw, (max-width: 1000px) 94vw, 65vw" width="1536" height="1024" decoding="async" alt="Ilustracja wspólnej zabawy na edukacyjnej grze wielkoformatowej"><div class="school-fade"></div>${breadcrumb('Szkoły')}<div class="schools-intro subpage-intro"><h1><span class="underline">Wielkie gry</span> <em>dla szkół</em></h1><p>Edukacyjne gry wielkoformatowe, które uczą, integrują<br class="desktop-break"> i rozwijają kluczowe kompetencje.</p>${button('Zapytaj o ofertę','kontakt.html')}</div><aside class="school-offer subpage-aside"><h2><span class="underline">Nasza oferta</span> <em>dla szkół</em></h2><p>Proponujemy gotowe programy<br class="desktop-break"> i scenariusze zajęć z wykorzystaniem wielkoformatowych gier planszowych. To sprawdzona forma edukacji,<br class="desktop-break"> która łączy naukę z zabawą, pomaga omawiać tematy edukacyjne<br class="desktop-break"> i rozwija kompetencje przyszłości. Grywalizacja angażuje, motywuje<br class="desktop-break"> i uczy przez działanie, dlatego nasze gry to skuteczne narzędzie do pracy<br class="desktop-break"> w szkole.</p></aside></section><section class="games-section"><h2 class="underline">Polecane gry dla szkół</h2><div class="games-grid">${games.map((game,i)=>gameCard(game,i,'schools')).join('')}</div></section></main>${benefits('school')}`;
const steps=[['Rozmowa i doradztwo','Poznajemy Twoje potrzeby, cele i grupę odbiorców. Doradzamy najlepsze rozwiązania i proponujemy koncepcję gry.'],['Koncepcja i scenariusz','Tworzymy wstępną koncepcję, scenariusz rozgrywki i propozycję elementów edukacyjnych dopasowanych do Twoich celów.'],['Projekt graficzny','Opracowujemy unikalną i atrakcyjną wizualnie planszę oraz materiały dodatkowe (karty, tablice, instrukcje), zgodne z Twoją identyfikacją i tematyką.'],['Konsultacje i testy','Wspólnie omawiamy projekt, wprowadzamy poprawki i testujemy grę, aby była maksymalnie dopasowana i angażująca.'],['Produkcja','Realizujemy grę w wybranej formie, z wysoką jakością materiałów i dbałością o każdy szczegół.'],['Twoja gra!','Otrzymujesz gotowy produkt, który angażuje, edukuje i buduje pozytywne emocje. Wspieramy Cię także po realizacji.']];
const custom = () => `<main id="main" class="custom-main"><section class="custom-hero subpage-hero"><div class="custom-photo">${crop('custom',690,128,535,390)}</div><div class="custom-fade"></div>${breadcrumb('Gry na zamówienie')}<div class="custom-intro subpage-intro"><h1>Gry na<br><em class="underline">zamówienie</em></h1><h2>Twoja idea – nasza realizacja.</h2><p>Projektujemy unikalne gry wielkoformatowe,<br class="desktop-break"> dopasowane do Twoich celów, grupy odbiorców<br class="desktop-break"> i przestrzeni. Łączymy wiedzę edukacyjną, kreatywność<br class="desktop-break"> i doświadczenie, aby stworzyć grę, która angażuje,<br class="desktop-break"> uczy i zostaje w pamięci na długo.</p>${button('Porozmawiajmy o grze','kontakt.html')}</div><div class="handwritten subpage-aside">Od pomysłu<br>do wielkiej gry,<br>która działa!<span></span></div></section><section class="process"><h2><span class="underline">Jak powstaje</span> <em>gra na zamówienie</em>?</h2><ol class="steps">${steps.map(([title,text],i)=>`<li><span class="step-number">${i+1}</span><h3>${title}</h3><p>${text}</p>${i<5?'<span class="step-arrow" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M4 16h24M20 8l8 8-8 8"/></svg></span>':''}</li>`).join('')}</ol></section></main>${benefits('custom')}`;
const missionContent = [
 ['Krytyczne myślenie','Rozgrywka może być punktem wyjścia do zadawania pytań, porównywania informacji i uzasadniania własnych decyzji.'],
 ['Kompetencje społeczne','Wspólne zadania dają okazję do rozmowy, dzielenia się rolami i szukania rozwiązania w zespole.'],
 ['Wrażliwość ekologiczna','Tematy wody, klimatu i codziennych wyborów można omawiać w kontekście sytuacji przedstawionych na planszy.'],
 ['Zdrowie i dobrostan','Wielka plansza pozwala połączyć rozmowę z ruchem i wspólną aktywnością w grupie.'],
 ['Kreatywność','Otwarte zadania zachęcają do proponowania pomysłów i poznawania różnych sposobów rozwiązania problemu.'],
 ['Kompetencje przyszłości','Współpraca, komunikacja i refleksja nad informacjami łączą się w jednym doświadczeniu gry.']
];
const supplemental = () => {
 if(page[2]==='contact') return `<main id="main" class="supplemental"><section class="subpage-hero">${breadcrumb('Kontakt')}<div class="subpage-intro"><h1>Kontakt</h1><h2>Porozmawiajmy o Twojej grze.</h2><p>Opisz cel, grupę odbiorców i planowane wydarzenie. Przygotuj zapytanie o gry dla szkoły, firmy lub projekt na zamówienie.</p>${button('Przygotuj zapytanie','#zapytanie')}<p class="contact-note">Wersja testowa: podane dane są demonstracyjne.</p></div><aside class="contact-card subpage-aside"><h2>Wielkie Gry Planszowe</h2><p class="demo-label">Dane testowe — do zastąpienia danymi firmy</p><address><span>E-mail testowy</span><a href="mailto:kontakt@example.com">kontakt@example.com</a><span>Telefon testowy</span><strong>+48 XXX XXX XXX</strong></address><p>Oficjalne profile społecznościowe dodamy wraz z prawdziwymi danymi kontaktowymi.</p></aside></section><section id="zapytanie" class="content-section"><h2>Co podać w zapytaniu?</h2><ol class="brief-list"><li><strong>Cel:</strong> czego uczestnicy mają doświadczyć lub się nauczyć?</li><li><strong>Odbiorcy:</strong> wiek, liczba osób i charakter grupy.</li><li><strong>Miejsce:</strong> dostępna przestrzeń i planowany termin.</li><li><strong>Projekt:</strong> gotowa gra czy własny temat i identyfikacja?</li></ol><p>Ten wzór pomoże Ci zebrać informacje przed rozmową. Wersja demonstracyjna nie wysyła formularzy ani zapytań.</p><a class="button" href="assets/wzor-zapytania.txt" download>Pobierz wzór zapytania ${arrows}</a></section></main>${homeFooter}`;
 return `<main id="main" class="supplemental"><section class="subpage-hero">${breadcrumb('Misja specjalna')}<div class="subpage-intro"><h1>Misja specjalna</h1><h2>Wielka gra, ważne kompetencje.</h2><p>Krytyczne myślenie, kompetencje społeczne, wrażliwość ekologiczna, zdrowie i dobrostan, kreatywność oraz kompetencje przyszłości — odkrywaj je przez wspólne działanie na planszy.</p>${button('Poznaj gry dla szkół','szkoly.html')}</div><img class="subpage-visual subpage-aside" src="assets/hero-1536.webp" srcset="assets/hero-768.webp 768w, assets/hero-1536.webp 1536w" sizes="(max-width:899px) 94vw, 40vw" width="1536" height="1024" decoding="async" alt="Ilustracja edukacyjnej gry na wielkiej planszy"></section><section class="content-section"><h2>Od wspólnej gry do rozmowy</h2><div class="mission-values">${missionContent.map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></section></main>${homeFooter}`;
};
const renderPage = () => header + (isHome ? home() : page[2]==='school' ? schools() : page[2]==='custom' ? custom() : page[2]==='company' ? company() : supplemental());
/* Hydrate the published HTML; rendering is also used by tools/render.cjs. */
if (!$('#app').hasChildNodes()) $('#app').innerHTML = renderPage();
const gameTriggers=[...document.querySelectorAll('.games-section .game-details-toggle')];
let activeGameTrigger=null, gameDetailPanel=null;
if(gameTriggers.length){
 const grid=gameTriggers[0].closest('.games-grid');
 gameDetailPanel=document.createElement('section');
 gameDetailPanel.className='game-details-panel';
 gameDetailPanel.id='game-details';
 gameDetailPanel.setAttribute('role','region');
 gameDetailPanel.setAttribute('aria-live','polite');
 gameDetailPanel.setAttribute('aria-label','Opis wybranej gry');
 gameDetailPanel.hidden=true;
 gameDetailPanel.innerHTML='<div class="game-details-panel-media"></div><div class="game-details-panel-copy"><button class="game-details-close" type="button" aria-label="Zamknij opis gry">×</button><p class="game-details-panel-age"></p><h3 class="game-details-panel-title" tabindex="-1"></h3><p class="game-details-panel-description"></p><p class="demo-label">Przykładowy opis — szczegóły oferty wymagają potwierdzenia.</p><a class="button game-details-contact" href="kontakt.html"><span class="button-label">Zapytaj o tę grę</span>'+arrows+'</a></div>';
 grid.after(gameDetailPanel);
 const mobileGameLayout=matchMedia('(max-width: 700px)');
 const placeGamePanel=trigger=>{
  if(mobileGameLayout.matches)trigger.closest('.game-card').after(gameDetailPanel);
  else grid.after(gameDetailPanel);
 };
 const closeGameDetails=returnFocus=>{
  if(!activeGameTrigger)return;
  activeGameTrigger.setAttribute('aria-expanded','false');
  const previous=activeGameTrigger;
  activeGameTrigger=null;
  gameDetailPanel.hidden=true;
  if(returnFocus)previous.focus();
 };
 const showGameDetails=(trigger,focusPanel=false)=>{
  if(activeGameTrigger===trigger){closeGameDetails(false);return;}
  if(activeGameTrigger)activeGameTrigger.setAttribute('aria-expanded','false');
  activeGameTrigger=trigger;
  trigger.setAttribute('aria-expanded','true');
  placeGamePanel(trigger);
  const company=trigger.hasAttribute('data-company-game');
  const source=company?'company':'schools';
  const index=Number(trigger.dataset[company?'companyGame':'game']);
  const game=(company?companyGames:games)[index];
  gameDetailPanel.querySelector('.game-details-panel-media').innerHTML=crop(source,...game.crop,'',game.title);
  gameDetailPanel.querySelector('.game-details-panel-age').textContent=(company?'Dla uczestników: ':'Klasy: ')+game.age;
  gameDetailPanel.querySelector('.game-details-panel-title').textContent=game.title;
  gameDetailPanel.querySelector('.game-details-panel-description').textContent=game.detail;
  gameDetailPanel.querySelector('.game-details-contact').href='kontakt.html?temat='+encodeURIComponent(game.title);
  gameDetailPanel.hidden=false;
  if(focusPanel)gameDetailPanel.querySelector('.game-details-panel-title').focus({preventScroll:true});
  if(focusPanel||!mobileGameLayout.matches)gameDetailPanel.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
 };
 gameTriggers.forEach(trigger=>trigger.addEventListener('click',()=>showGameDetails(trigger)));
 mobileGameLayout.addEventListener('change',()=>{if(activeGameTrigger)placeGamePanel(activeGameTrigger);});
 gameDetailPanel.querySelector('.game-details-close').addEventListener('click',()=>closeGameDetails(true));
 window.showGameDetails=(source,index)=>{
  const attr=source==='company'?'company-game':'game';
  const trigger=document.querySelector('[data-'+attr+'="'+index+'"]');
  if(trigger)showGameDetails(trigger,true);
 };
}const menuButton=$('.menu-toggle'),navigation=$('#navigation');
const setMenu = open => {menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);};
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){setMenu(false);menuButton.focus();}});
document.addEventListener('click',event=>{if(navigation.classList.contains('open')&&!event.target.closest('.header'))setMenu(false);});
navigation.addEventListener('focusout',event=>{if(event.relatedTarget&&!navigation.contains(event.relatedTarget)&&event.relatedTarget!==menuButton)setMenu(false);});
matchMedia('(min-width:1201px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
});
const normalizeSearch = text => text.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu,'').replaceAll('ł','l');
const searchItems = [
 ...pages.map(([href,title])=>({href,title})),
 ...games.map(game=>({href:'szkoly.html#gra-'+slug(game.title),title:game.title+' — dla szkół',desc:game.desc.replaceAll('<br>',' ')})),
 ...companyGames.map(game=>({href:'firmy.html#gra-'+slug(game.title),title:game.title+' — dla firm',desc:game.desc.replaceAll('<br>',' ')}))
];
const renderSearch = () => {
 const query=normalizeSearch($('#search-input').value.trim());
 const matches=searchItems.filter(item=>normalizeSearch(item.title+' '+(item.desc||'')).includes(query));
 const box=$('#search-results');box.replaceChildren();
 $('#search-status').textContent=matches.length?`Liczba wyników: ${matches.length}.`:'Brak wyników. Spróbuj innego hasła.';
 for(const item of matches){const link=document.createElement('a');link.textContent=item.title;link.href=item.href;box.append(link);}
};
$('.search-toggle').addEventListener('click',()=>{$('#search-dialog').showModal();renderSearch();$('#search-input').focus();});
$('#search-input').addEventListener('input',renderSearch);
$('#search-results').addEventListener('click',event=>{const link=event.target.closest('a');if(!link)return;$('#search-dialog').close();if(new URL(link.href).pathname===location.pathname)setTimeout(revealLinkedGame,0);});
const revealLinkedGame = () => {
 const source=page[2]==='company'?'company':'schools';
 const list=source==='company'?companyGames:games;
 let index=-1;
 const hash=decodeURIComponent(location.hash.slice(1));
 if(hash.startsWith('gra-'))index=list.findIndex(game=>'gra-'+slug(game.title)===hash);
 if(index<0){const query=new URLSearchParams(location.search).get('gra');if(query!==null&&/^\d$/.test(query))index=Number(query);}
 if(index>=0&&typeof window.showGameDetails==='function')window.showGameDetails(source,index);
};revealLinkedGame();window.addEventListener('hashchange',revealLinkedGame);
if(isHome){
 let active=0;
 const carouselMotion=matchMedia('(prefers-reduced-motion: reduce)');
 carouselMotion.addEventListener('change',()=>{if(carouselMotion.matches)$('.hero-slide-copy').getAnimations().forEach(animation=>animation.cancel());});
 const slides=[
  ['Wielkie gry, które angażują,<br>uczą i zostają w pamięci.','Poznaj gry dla szkół','szkoly.html','gry dla szkół'],
  ['Współpraca i integracja<br>przez wspólne działanie.','Poznaj gry dla firm','firmy.html','gry dla firm'],
  ['Tworzymy gry dopasowane<br>do Twoich celów i wartości.','Odkryj gry na zamówienie','gry-na-zamowienie.html','gry na zamówienie']
 ];
 const change = index => {
  active=(index+slides.length)%slides.length;
  const [text,cta,href,label]=slides[active];
  $('.hero-slide-copy p').innerHTML=text;
  const link=$('.hero-slide-copy .button');link.href=href;link.querySelector('.button-label').textContent=cta;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&$('.hero-slide-copy').animate) $('.hero-slide-copy').animate([{opacity:.65,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.16,1,.3,1)'});
  $('.hero-photo').style.objectPosition=['62% center','85% center','40% center'][active];
  $('#carousel-status').textContent=`Oferta ${active+1} z 3: ${label}.`;
  document.querySelectorAll('[data-slide]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
 };
 $('.carousel-prev').addEventListener('click',()=>change(active-1));
 $('.carousel-next').addEventListener('click',()=>change(active+1));
 document.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>change(Number(button.dataset.slide))));
 $('.hero-carousel').addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();change(active+(event.key==='ArrowLeft'?-1:1));}});
}
