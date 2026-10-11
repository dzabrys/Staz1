# Kopia strony — wersja 2

Styl zgodny z referencjami użytkownika: granat/pomarańcz, duże nagłówki, jasne przejścia zdjęć, fale i ilustrowane karty. 6 stron głównych oraz 10 stron gier.

Podgląd: https://dzabrys.github.io/Staz1/wersja-2/

Oryginał: https://dzabrys.github.io/Staz1/

## SEO

Kopia ma noindex,follow, aby treści testowe i duplikat strony nie konkurowały z oryginałem. Zachowano statyczny HTML, jeden H1, unikalne tytuły/opisy, canonical, Open Graph, WebPage i BreadcrumbList. Przed docelowym wdrożeniem należy ustawić właściwą domenę i świadomie włączyć indeksowanie.

## Dane do uzupełnienia

Prawdziwe dane kontaktowe, profile społecznościowe, parametry i ceny gier, scenariusze, warunki realizacji oraz zdjęcia realizacji. Zdjęcia i opisy są przykładowe. Nie dodano fikcyjnych opinii ani wyników.

## Technika

Wersja statyczna: HTML/CSS/JavaScript, lokalne fonty i 34 osobne miniatury WebP, bez pobierania całych plansz referencyjnych dla małych ikon. Animacje respektują prefers-reduced-motion; treść jest widoczna także bez JavaScript.

Otwórz index.html albo uruchom node tools/serve.cjs. Źródła w templates.js, design.css, runtime.js i animations.js.
