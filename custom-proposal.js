/* Local proposal. Examples are formats from the catalog, not customer case studies. */
const customFaq = [
 ['Co można dopasować w grze na zamówienie?', 'Dopasowujemy temat, zasady, ilustracje i identyfikację wizualną do celu oraz odbiorców. Format planszy i materiały dodatkowe ustalamy podczas rozmowy o projekcie.'],
 ['Ile kosztuje gra na zamówienie?', 'Wycena jest indywidualna. Zależy od zakresu projektu, formatu gry i potrzebnych elementów. Opisz cel, grupę oraz planowaną formę, abyśmy mogli przygotować propozycję.'],
 ['Jak długo trwa przygotowanie gry?', 'Termin ustalamy po poznaniu zakresu projektu. Jeśli gra ma być gotowa na konkretne wydarzenie, podaj jego datę już w pierwszej wiadomości.'],
 ['Jaki jest format, materiał i zawartość zestawu?', 'Te parametry dobieramy do miejsca gry i sposobu użytkowania. W zapytaniu podaj dostępną przestrzeń oraz informację, czy gra będzie używana wewnątrz czy na zewnątrz. Zakres zestawu uzgodnimy przed realizacją.'],
 ['Czy muszę mieć gotowy pomysł lub projekt graficzny?', 'Nie. Możemy zacząć od celu i grupy odbiorców. Podczas rozmowy ustalimy temat, zasady oraz kierunek graficzny. Jeśli masz własne materiały, opisz je w zapytaniu.']
];
const customProcess = [
 ['Rozmowa i cel', 'Ustalamy, dla kogo i po co powstaje gra.', 'Na początek wystarczy opis grupy, celu, miejsca i planowanego terminu. Na tej podstawie wspólnie wybieramy kierunek projektu.'],
 ['Zasady i scenariusz', 'Łączymy Twój temat z przebiegiem rozgrywki.', 'Omawiamy zadania uczestników, zasady oraz elementy edukacyjne. Koncepcja jest punktem odniesienia dla dalszej pracy.'],
 ['Projekt graficzny', 'Nadajemy planszy i dodatkom wspólną oprawę.', 'Przygotowujemy ilustracje i układ materiałów w uzgodnionej tematyce. W projekcie możemy uwzględnić Twoją identyfikację wizualną.'],
 ['Konsultacje i testy', 'Sprawdzamy pomysł i dopracowujemy szczegóły.', 'Wspólnie omawiamy projekt i przebieg gry. Uwagi oraz poprawki pomagają dopasować rozwiązanie do uczestników.'],
 ['Produkcja', 'Wykonujemy uzgodnioną wersję gry.', 'Przed realizacją ustalamy format, materiały i zawartość zestawu. Zakres produkcji wynika z zaakceptowanego projektu.'],
 ['Gotowa gra', 'Przekazujemy grę i uzgodnione materiały.', 'Otrzymujesz grę przygotowaną dla Twojej grupy. W razie pytań dotyczących realizacji możesz skontaktować się z nami również po jej zakończeniu.']
];
const customMail = 'mailto:biuro@wielkiegryplanszowe.pl?subject='+encodeURIComponent('Zapytanie o grę na zamówienie')+'&body='+encodeURIComponent('Dzień dobry,\n\nChcę porozmawiać o grze na zamówienie.\n\nCel gry:\nGrupa i liczba uczestników:\nMiejsce / dostępna przestrzeń:\nPlanowany termin:\nPomysł lub wybrany format:\n\nDane do kontaktu:\n');
const customFormatCards = [
 ['Wielka plansza', 'Temat, zadania i oprawa dopasowane do wspólnej rozgrywki.', 'assets/oferta-skarb-piratow.webp', 'Przykład formatu: kolorowa plansza gry Skarb piratów', 'wielkie-gry-planszowe.html', 'Zobacz plansze'],
 ['Puzzle z Twoim motywem', 'Własna grafika, format i podział elementów układanki.', 'assets/oferta-puzzle.svg', 'Przykładowa ilustracja formatu wielkich puzzli', 'gra-wielkie-puzzle.html', 'Poznaj puzzle'],
 ['Memory na Twój temat', 'Ilustracje i pary zbudowane wokół wybranego motywu.', 'assets/oferta-memory.svg', 'Przykładowa ilustracja formatu wielkiego memory', 'gra-wielkie-memory.html', 'Poznaj memory']
];
const customProposal = () => `<main id="main" class="custom-main custom-proposal">
 ${breadcrumb('Gry na zamówienie')}
 <section class="proposal-hero" aria-labelledby="custom-title">
  <div class="proposal-intro">
   <p class="proposal-eyebrow">Dla szkół, firm i instytucji</p>
   <h1 id="custom-title">Gry na zamówienie.<br><em>Na Twój temat.</em></h1>
   <p class="proposal-lead">Projektujemy gry na zamówienie: wielkie plansze, puzzle i memory. Dopasowujemy temat, zasady i grafikę do Twojej grupy.</p>
   <div class="proposal-actions">${button('Opowiedz o pomyśle','#zapytaj-o-projekt')}<a class="proposal-text-link" href="#formaty">Zobacz formaty ${arrows}</a></div>
   <p class="proposal-note">Nie potrzebujesz gotowego projektu. Zaczniemy od celu i odbiorców.</p>
  </div>
  <figure class="proposal-hero-visual"><img src="assets/oferta-custom-cover.webp" width="1200" height="1000" fetchpriority="high" decoding="async" alt="Ilustracja projektowania kolorowej planszy gry"><figcaption>Temat · zasady · projekt graficzny</figcaption></figure>
 </section>
 <section class="proposal-formats" id="formaty" aria-labelledby="formats-title">
  <div class="proposal-section-heading"><div><p class="proposal-eyebrow">Pomysł może przyjąć różną formę</p><h2 id="formats-title">Co możemy <em>stworzyć?</em></h2></div><p>Przykładowe formaty z naszej oferty. Wygląd i zakres Twojej gry ustalimy wspólnie.</p></div>
  <div class="proposal-format-grid">${customFormatCards.map(([title,text,image,alt,href,label])=>`<article class="proposal-format"><a href="${href}"><div class="proposal-format-image"><img src="${image}" width="800" height="800" loading="lazy" decoding="async" alt="${alt}"></div><div class="proposal-format-copy"><h3>${title}</h3><p>${text}</p><span class="proposal-format-link">${label}${arrows}</span></div></a></article>`).join('')}</div>
 </section>
 <section class="process proposal-process" aria-labelledby="process-title">
  <div class="proposal-section-heading"><div><p class="proposal-eyebrow">Od rozmowy do gotowej gry</p><h2 id="process-title">Jak powstaje <em>Twój projekt?</em></h2></div><p>Na każdym etapie ustalamy kolejne elementy. Szczegóły możesz rozwinąć poniżej.</p></div>
  <ol class="steps">${customProcess.map(([title,short,detail],i)=>`<li><span class="step-number" aria-hidden="true">${i+1}</span><div class="proposal-step-copy"><h3>${title}</h3><p>${short}</p><details class="step-details"><summary><span>Szczegóły etapu<span class="visually-hidden"> ${i+1}: ${title}</span></span></summary><div class="details-content"><p>${detail}</p></div></details></div>${i<customProcess.length-1?'<span class="proposal-connector" aria-hidden="true"><svg viewBox="0 0 48 32" focusable="false"><path d="M4 25C12 8 29 6 40 17M33 5l8 13-16-1"/></svg></span>':''}</li>`).join('')}</ol>
 </section>
 <section class="proposal-bottom" aria-label="Pytania i kontakt">
  <div class="proposal-faq" id="pytania"><p class="proposal-eyebrow">Przed pierwszą rozmową</p><h2>Co warto <em>wiedzieć?</em></h2>${customFaq.map(([q,a])=>`<details><summary>${q}</summary><div class="details-content"><p>${a}</p></div></details>`).join('')}</div>
  <aside class="proposal-contact" id="zapytaj-o-projekt" aria-labelledby="proposal-contact-title"><p class="proposal-eyebrow">Zacznijmy od Twojej grupy</p><h2 id="proposal-contact-title">Masz temat?<br><em>Zamieńmy go w grę.</em></h2><p>Napisz, dla kogo ma powstać gra, jaki ma cel i kiedy jej potrzebujesz. Resztę ustalimy podczas rozmowy.</p>${button('Napisz o swoim pomyśle',customMail)}<p class="proposal-mail-note">Otworzy się Twoja poczta ze szkicem zapytania.</p><address><strong>Wielkie Gry Planszowe</strong><a href="mailto:biuro@wielkiegryplanszowe.pl">biuro@wielkiegryplanszowe.pl</a><a href="tel:+48600894644">+48 600 894 644</a><span>ul. Lubelska 37D, 10-408 Olsztyn</span></address><a class="proposal-text-link" href="kontakt.html">Wszystkie dane kontaktowe ${arrows}</a></aside>
 </section>
 </main>`;
