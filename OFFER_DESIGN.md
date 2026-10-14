# Oferta — kierunek i źródła

## Układ
Oferta → dwie fotograficzne kategorie → katalog z pięcioma kartami w rzędzie → karta produktu: obraz i nazwa po lewej, opis po prawej. Inne to gry customowe; bez fikcyjnych cen i parametrów.

## Wspólny język wizualny
Granat #102478, pomarańcz #ff7900, biel #ffffff, chłodna powierzchnia #f3f7fa, tekst #46546c. Lato z istniejących lokalnych fontów: 900 dla tytułów, 400/700 dla opisów. Ta sama szerokość i nagłówek co reszta strony. Zdjęcia jako główny element, spokojne tło, małe promienie narożników, wyrównane odstępy. Efekt hover odpowiada na działanie użytkownika; bez automatycznej karuzeli w katalogu.

## Zgodność z briefem
Zachowujemy dwa duże kafle ze szkicu i układ obrazu/opisu na stronie gry. Nie zmieniamy całego serwisu w czarno-białą kopię Porsche. Zostają rozpoznawalne kolory marki, poprawione logo i wcześniejsze proporcje podstron.

## Materiały przejrzane 14.10.2026
- https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md — intencjonalny kierunek, praca z prawdziwą treścią i ograniczenie dekoracji.
- https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines — klawiatura, widoczny fokus, semantyczne odnośniki i responsywność.
- https://designsystem.porsche.com/v3/components/text/usage/ — wspólna siatka i skala typograficzna.
- https://wielkiegryplanszowe.pl/nasze-gry/ — rzeczywiste nazwy i plansze gier, bez kopiowania obszernych opisów.
- https://wielkiegryplanszowe.pl/ — inne gry: puzzle, memory, kółko i krzyżyk, tor do kapsli.
- https://wielkiegryplanszowe.pl/realizacje-indywidualne/ — projekty na zamówienie.

Istniejące strony szkoły/firmy i ich adresy pozostają dostępne. Stary adres misja.html prowadzi do oferty. Katalog, produkty, breadcrumbs, wyszukiwanie i sitemap korzystają ze wspólnych danych.

## Materiały i kontrola
Pięć rzeczywistych plansz pobrano z sekcji Nasze gry: SKARB-PIRATOW-1024x1022.jpg, 7-1008x1024.jpg (Zostań kierowcą), SEGREGUJ-SMIECI-1024x1024.jpg, 8-1024x1024.jpg (Farmer), 9-1024x1024.jpg (Wyścig). Zapisano lokalne WebP. Grafiki customowe są własnymi ilustracjami SVG, nie zdjęciami realizacji. Nie dodano cen ani wymyślonych parametrów. Wcześniejsze strony szkół i firm zachowują swoje adresy.

Sprawdzono statyczny build 28 stron i 899 odnośników/zasobów; 30 kontroli nowych widoków przy 320, 390, 768, 1366 i 1920 px; przejścia obu kategorii, wyszukiwanie puzzle, mobilne menu i przekazanie tytułu gry do kontaktu. Główne strony nie przywracają oznaczeń demonstracyjnych ani fikcyjnych kontaktów z wcześniejszego wariantu.
