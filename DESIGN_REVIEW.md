# Spójny layout zgodny z referencjami

## Problemy i zmiany

- Wstępy podstron miały narzucone minimum 580 px. Zastąpiono je wysokością wynikającą z treści oraz krótszym minimum na stronach ofertowych. Przy 1536 px wstęp szkoły i firmy zajmuje 384 px. Dłuższe treści pozostają w normalnym przepływie.
- Osobne reguły dla każdej podstrony rozjeżdżały skalę. Wszystkie sześć stron korzysta teraz z tych samych zmiennych nagłówków, tekstów, marginesów i odstępów. H1 ma 73,728 px przy szerokości 1536 px oraz 38 px na telefonie 390 px; nagłówek nawigacji odpowiednio 127 i 88 px.
- Pięć gier mieści się w jednym rzędzie od 1201 px. Na mniejszych ekranach są trzy, dwie lub jedna kolumna; od 700 px w dół karty są pojedyncze, zgodnie z mobilnym rozwijaniem opisu.
- Sześć etapów zamówienia ma wspólną skalę, pastelowe sylwetki i zakrzywione strzałki. Na tablecie układ przechodzi w trzy kolumny, a na telefonie w jedną.
- Kafle na stronie głównej mają widoczną błękitną powierzchnię, obrys i zaokrąglenie 24 px. Zdjęcie i jego przejście są przycięte do kształtu karty.
- Miniatury gier zachowują proporcje wycinka źródłowego wewnątrz ramki 2,1:1. Zapobiega to wyświetlaniu fragmentów napisów spoza zdjęcia.
- Usunięto dodatkowe przyciski we wstępach szkoły, firmy i zamówienia, aby zachować kompozycję przesłanych wzorów. Kontakt pozostaje w nawigacji, stopkach oraz rozwiniętych opisach na komputerze.
- Mobilny opis nadal otwiera się wewnątrz tej samej karty, bez drugiego zdjęcia i tytułu. Jednocześnie otwarty jest jeden opis.

## Przegląd bibliotek i wzorców

Przejrzano oficjalne dokumentacje popularnych rozwiązań, bez deklarowania rankingu ich popularności:

- [Tailwind CSS — responsive design](https://tailwindcss.com/docs/responsive-design): zmiana układu w zależności od szerokości, spójne progi responsywne i zasada mobile-first. Zastosowano dopasowanie liczby kolumn do dostępnego miejsca.
- [shadcn/ui — Card](https://ui.shadcn.com/docs/components/base/card): kompozycja karty z czytelnym podziałem na treść i akcję. Zastosowano wspólną skalę kart, tytułów oraz przycisków.
- [Material UI — theming](https://mui.com/material-ui/customization/theming/): centralna konfiguracja palety, typografii i odstępów. Zastosowano wspólne zmienne CSS dla całego serwisu.

Projekt pozostaje statycznym HTML/CSS/JS. Wzorce wdrożono w istniejącej technologii; instalacja Reacta, Tailwinda lub MUI dla samych zmian wyglądu nie jest potrzebna. Granat, pomarańcz, ilustracje i pastelowe fale wynikają z referencji użytkownika.

## Źródła i publikacja

`reference-layout.css` odpowiada za końcową skalę i układ. `tools/render.cjs` dołącza go do kompilowanego `site.css` oraz odświeża adresy zasobów z hashem. Po zmianie źródeł uruchom `node tools/render.cjs` i zatwierdź także wygenerowane HTML/CSS.

Zmiany dotyczą głównego serwisu. Oddzielny katalog `wersja-2/` pozostaje osobnym wariantem.

## Weryfikacja

Kontrola w przeglądarce obejmuje sześć głównych podstron przy 320, 390, 768, 1536 i 1920 px oraz strony ofertowe i główną przy 1366 px. Sprawdzono wspólną wielkość H1, brak poziomego przepełnienia, brak obciętych tekstów i treści kafli, mobilne otwarcie Team building, zamknięcie poprzedniego opisu po wyborze kolejnej gry oraz panel opisu na komputerze. Wykonano build, kontrolę składni `app.js` i `git diff --check`.

Porównanie jest wizualne. Zdjęcia pozostają materiałami przykładowymi, a dane kontaktowe demonstracyjne.

## Logo

Kostkę w `assets/logo.svg` odtworzono według dodatkowej referencji: zaokrąglona biała góra i przód, granatowy bok, pomarańczowe łuki oraz kropki odwzorowujące perspektywę każdej ścianki. Kropki korzystają z symetrycznych współrzędnych lokalnych i osobnego przycięcia do ściany, więc nie mogą wystawać poza kostkę. Napisy są obrysami z dołączonych fontów Lato Black/Bold, dzięki czemu wygląd logo nie zależy od fontów urządzenia. Tło poza znakiem pozostaje przezroczyste. Sprawdzono render SVG oraz logo w nagłówku na komputerze i przy szerokości 390 px; generator odświeża hash logo na wszystkich sześciu stronach.
