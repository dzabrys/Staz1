# Wielkie Gry Planszowe

Aktualna strona: https://dzabrys.github.io/Staz1/

28 statycznych stron, lokalne fonty, WebP, responsywny układ i animacje respektujące prefers-reduced-motion. Źródła: templates.js, offer-templates.js, design.css, offer.css, offer-landing.css, home-refinement.css, school-refinement.css, site-refinement.css, layout-refinement.css, viewport-fixes.css, home-index-layout.css, runtime.js i animations.js. Zasady stylistyki: STYLE_GUIDE.md.

## Warianty do porównania

Osobna alternatywa hero z większą przestrzenią po bokach i mniejszym navbarem: https://dzabrys.github.io/Staz1/1/. Jest budowana z aktualnej strony głównej przez tools/build-hero-alternative.cjs.

Katalog z rozwijanymi kategoriami: https://dzabrys.github.io/Staz1/2/. Pierwsze pięć kart i kolejne rozwijane w dół osobno w każdej kategorii. Wariant ma noindex,follow i canonical do głównego katalogu.

Cztery propozycje nagłówków oferty: https://dzabrys.github.io/Staz1/oferta-propozycje/a.html (biały pasek), b.html (granatowy pasek), c.html (biała etykieta), d.html (nazwa nad zdjęciem). Są budowane przez tools/build-offer-options.cjs. Warianty mają noindex,follow i canonical do głównego widoku.

## Budowanie

npm ci
npm run build
npm start

Domyślny adres canonical: https://dzabrys.github.io/Staz1/. Można zmienić SITE_URL. Główna wersja ma index,follow; SITE_INDEX=0 wyłącza indeksowanie. Kopia /wersja-2/ ma noindex,follow.

## Materiały do uzupełnienia

Ceny oznaczone jako poglądowe są przykładowe (1 490 zł i 1 990 zł). Rzeczywiste ceny i brakujące parametry należy ustalić indywidualnie. Oznaczenia demonstracyjne i fikcyjne dane kontaktowe nie są publikowane. Źródła plansz i inspiracji opisano w OFFER_DESIGN.md.
