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
- `assets/` — lokalne zdjęcia, grafiki, krój pisma i licencje fontów.

Treści są prawdziwymi elementami HTML, a nie jednym obrazem strony. Drobne ilustracje, logo i miniatury są pokazywane jako kadry z dostarczonych wzorów przez wspólną funkcję `crop()` w `app.js`. Dzięki temu zachowują oryginalny wygląd. Przy dostępności osobnych plików źródłowych można zastąpić te kadry samodzielnymi obrazami.

### Zakres działania

Nawigacja między sześcioma widokami, mobilne menu, trzy ręcznie przełączane slajdy, wyszukiwarka stron i gier dla szkół, szczegóły dziesięciu gier, zamykanie okien klawiszem Escape, obsługa klawiatury i lokalne fonty.

Brakujące dane kontaktowe i oficjalne adresy profili społecznościowych są jawnie oznaczone do uzupełnienia. Przyciski społecznościowe otwierają taką informację. Nie wymyślano numerów telefonu, adresów e-mail ani kont. Opisy w oknach szczegółów i uzupełniających widokach są przykładowymi treściami redakcyjnymi do akceptacji właściciela; cztery główne widoki odtwarzają tekst ze wzorów.

### Grafiki

Źródła `reference-*.png`: cztery obrazy dostarczone przez użytkownika. Fotografia `assets/hero.png` została wygenerowana wbudowanym narzędziem ImageGen; pozostałe zdjęcia pochodzą z referencji. To odwzorowanie wizualne, nie matematycznie identyczny zrzut: główne zdjęcie, odręczne dekoracje i część ikon nawigacji mogą się różnić.

Prompt obrazu głównego: „Natural landscape photograph of a girl in a white rainbow T-shirt and light blue jeans and a boy in a royal blue hoodie stepping on a giant blue, green and yellow educational board game in a sunny school courtyard; oversized yellow foam dice in the right foreground; other children, trees, modern school and a blue canopy in the background; pair on the right, dark trees on the left for a text overlay; no text or watermark.”

Fonty Lato i Caveat z Google Fonts, licencje SIL Open Font License zapisano w `assets/LICENSE-lato.txt` i `assets/LICENSE-caveat.txt`. Fonty i grafiki są lokalne; strona nie potrzebuje zewnętrznych CDN.

## Weryfikacja

Sprawdzono sześć widoków w szerokościach 1536, 768 i 390 px: brak poziomego przewijania, poprawne ładowanie zdjęć, działanie nawigacji, wyszukiwarki, karuzeli i szczegółów gier, brak błędów JavaScript. Zrzuty w katalogu `artifacts/` są lokalne i wyłączone z repozytorium.

Opcjonalny test wymaga Playwright i przeglądarki Microsoft Edge:

```sh
node tools/check.cjs <ścieżka-do-pakietu-playwright>
```

Można wskazać inny kanał przeglądarki zmienną `BROWSER_CHANNEL`. Test wymaga działającego serwera pod adresem wskazanym powyżej.
