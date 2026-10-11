# Wielkie Gry Planszowe

Responsywne odwzorowanie czterech dostarczonych projektów: strony głównej, oferty dla szkół, oferty dla firm i instytucji oraz gier na zamówienie. Zwykły HTML, CSS i JavaScript — bez instalowania pakietów i bez etapu budowania.

## Podgląd lokalny

Zainstaluj Node.js, otwórz terminal w katalogu projektu i uruchom:

```sh
node tools/serve.cjs
```

Otwórz <http://127.0.0.1:4173>. Zatrzymanie serwera: Ctrl+C.

## Strona online

Strona jest opublikowana przez GitHub Pages: **https://dzabrys.github.io/Staz1/**.

Źródłem publikacji jest gałąź `main`, katalog główny repozytorium. Kolejne zmiany w `main` automatycznie aktualizują stronę. Repozytorium jest publiczne, więc można też udostępnić [kod projektu](https://github.com/dzabrys/Staz1).

## Pliki i edycja

- `index.html` — strona główna.
- `szkoly.html` — oferta dla szkół.
- `firmy.html` — oferta dla firm i instytucji.
- `gry-na-zamowienie.html` — proces tworzenia gier.
- `misja.html`, `kontakt.html` — uzupełniające widoki bez dostarczonych wzorów.
- `app.js` — wspólne elementy, treści, karty, wyszukiwarka, karuzela i okna szczegółów.
- `styles.css` — układ, kolory, dekoracje i wersje mobilne.
- `responsive.css` — dopasowanie do ekranu, nagłówek, stopka i wyrównanie przycisków.
- `experience.css` — wspólna skala podstron i animacje elementów interfejsu.
- `motion.js` — animacje wejścia sekcji i kart podczas przewijania.
- `tools/render.cjs` — generator pełnego HTML i metadanych podstron.
- `sitemap.xml` — mapa sześciu publicznych podstron.
- `assets/` — lokalne zdjęcia, grafiki, krój pisma i licencje fontów.

Po zmianie szablonów treści w `app.js` lub metadanych w `tools/render.cjs` uruchom:

```sh
node tools/render.cjs
```

Zapisz wygenerowane pliki HTML razem ze zmianami. Treść, nawigacja, pojedynczy nagłówek H1, unikalny tytuł, opis i adres canonical są dostępne bez uruchamiania JavaScript. JavaScript obsługuje menu, karuzelę, wyszukiwarkę i okna szczegółów. Główny H1 nie zmienia się przy przełączaniu karuzeli.

Kopia wersji sprzed poprawek: [backup/przed-poprawkami-2026-10-11](https://github.com/dzabrys/Staz1/tree/backup/przed-poprawkami-2026-10-11).

Kopia przed poprawkami podstron: [backup/przed-poprawkami-podstron-2026-10-11](https://github.com/dzabrys/Staz1/tree/backup/przed-poprawkami-podstron-2026-10-11).

Kopia przed ujednoliceniem rozmiarów i animacjami: [backup/przed-ujednoliceniem-i-animacjami-2026-10-11](https://github.com/dzabrys/Staz1/tree/backup/przed-ujednoliceniem-i-animacjami-2026-10-11).

Podstrony mają wspólny nagłówek, wysokość sekcji wynikającą z treści, osobne miejsce na strzałki kart i kadry zdjęć o zachowanych proporcjach. Liczba kolumn zmienia się wraz z szerokością ekranu; na telefonie etapy realizacji tworzą pojedynczą listę z pionowymi strzałkami. Stopki i treści łamią się naturalnie, bez wymuszonych podziałów wyrazów.

Wszystkie pięć podstron używa jednakowej skali H1, H2, opisów, kart i ikon oraz tych samych marginesów. Pierwsze sekcje mają wspólną minimalną wysokość na komputerze (520 px, a przy szerokościach 900–1199 px: 580 px). Na mniejszych ekranach wysokość wynika z treści. Karty gier mają wspólną minimalną wysokość części tekstowej; etapy realizacji mają równe wysokości w układzie kolumnowym.

Animacje obejmują wejście sekcji, kaskadę kart podczas przewijania, podkreślenia, przyciski, ikony nawigacji, przejścia karuzeli i otwieranie okien. Używają natywnych API przeglądarki, transformacji i przezroczystości, bez nowych zależności ani obsługi każdego zdarzenia przewijania. Treść jest domyślnie widoczna; brak JavaScript lub IntersectionObserver nie blokuje jej wyświetlania. Preferencja ograniczenia ruchu wyłącza animacje, także gdy zmieni się podczas korzystania ze strony.

Treści są prawdziwymi elementami HTML, a nie jednym obrazem strony. Drobne ilustracje, logo i miniatury są pokazywane jako kadry z dostarczonych wzorów przez wspólną funkcję `crop()` w `app.js`. Dzięki temu zachowują oryginalny wygląd. Przy dostępności osobnych plików źródłowych można zastąpić te kadry samodzielnymi obrazami.

### Zakres działania

Nawigacja między sześcioma widokami, mobilne menu, trzy ręcznie przełączane slajdy, wyszukiwarka stron i gier dla szkół, szczegóły dziesięciu gier, zamykanie okien klawiszem Escape, obsługa klawiatury i lokalne fonty.

Brakujące dane kontaktowe i oficjalne adresy profili społecznościowych są jawnie oznaczone do uzupełnienia. Przyciski społecznościowe otwierają taką informację. Nie wymyślano numerów telefonu, adresów e-mail ani kont. Opisy w oknach szczegółów i uzupełniających widokach są przykładowymi treściami redakcyjnymi do akceptacji właściciela; cztery główne widoki odtwarzają tekst ze wzorów.

### Grafiki

Źródła `reference-*.png`: cztery obrazy dostarczone przez użytkownika. Fotografia `assets/hero.png` została wygenerowana wbudowanym narzędziem ImageGen; pozostałe zdjęcia pochodzą z referencji. To odwzorowanie wizualne, nie matematycznie identyczny zrzut: główne zdjęcie, odręczne dekoracje i część ikon nawigacji mogą się różnić.

Prompt obrazu głównego: „Natural landscape photograph of a girl in a white rainbow T-shirt and light blue jeans and a boy in a royal blue hoodie stepping on a giant blue, green and yellow educational board game in a sunny school courtyard; oversized yellow foam dice in the right foreground; other children, trees, modern school and a blue canopy in the background; pair on the right, dark trees on the left for a text overlay; no text or watermark.”

Fonty Lato i Caveat z Google Fonts, licencje SIL Open Font License zapisano w `assets/LICENSE-lato.txt` i `assets/LICENSE-caveat.txt`. Fonty i grafiki są lokalne; strona nie potrzebuje zewnętrznych CDN.

## Weryfikacja

Test obejmuje sześć widoków w dziesięciu szerokościach: 1920, 1536, 1500, 1366, 1024, 900, 768, 600, 390 i 320 px. Sprawdza brak poziomego przewijania, dopasowanie strony głównej, nieobcięte karty, rozdzielenie strzałek i tekstu, proporcje kadrów, brak nakładania sekcji, przycisk trzeciego slajdu na telefonie, zdjęcia, nawigację, wyszukiwarkę, karuzelę, szczegóły gier i brak błędów JavaScript. Sprawdza także treść oraz unikalne metadane z wyłączonym JavaScript. Zrzuty wszystkich podstron w katalogu `artifacts/` są lokalne i wyłączone z repozytorium.

Opcjonalny test wymaga Playwright i przeglądarki Microsoft Edge:

```sh
node tools/check.cjs <ścieżka-do-pakietu-playwright>
node tools/motion-check.cjs <ścieżka-do-pakietu-playwright>
```

Można wskazać inny kanał przeglądarki zmienną `BROWSER_CHANNEL`. Test wymaga działającego serwera pod adresem wskazanym powyżej.

Test układu sprawdza również jednakowe rozmiary H1, opisów, nagłówków strony, marginesów i pierwszych sekcji podstron na komputerze. Test animacji sprawdza rzeczywiste uruchamianie efektów podczas przewijania, stałość wymiarów układu, ograniczenie ruchu, brak wsparcia dla IntersectionObserver oraz widoczną treść bez JavaScript. Można podać adres publicznej strony jako trzeci argument testu animacji.
