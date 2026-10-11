# Wielkie Gry Planszowe

Statyczna strona HTML, CSS i JavaScript z sześcioma podstronami. Publikacja: [dzabrys.github.io/Staz1](https://dzabrys.github.io/Staz1/). Gałąź `main`, katalog główny repozytorium; GitHub Pages publikuje aktualizacje automatycznie.

## Podgląd i edycja

Gotowe pliki HTML działają bez instalacji pakietów. Lokalny podgląd wymaga Node.js:

```sh
node tools/serve.cjs
```

Otwórz http://127.0.0.1:4173/. Zatrzymanie: Ctrl+C.

Po edycji treści, stylów lub skryptów wygeneruj ponownie pliki:

```sh
npm ci
npm run build
```

Generator używa Lightning CSS do minifikacji wspólnego arkusza. Zapisz wygenerowane pliki HTML, `404.html`, `site.css` i `sitemap.xml` razem ze źródłami. Adresy zasobów zawierają hash zawartości; zmiana pliku aktualizuje jego adres. Strona nie wymaga Node.js na hostingu.

## Główne pliki

- `app.js` — szablony treści oraz obsługa menu, karuzeli i wyszukiwarki.
- `styles.css`, `responsive.css`, `experience.css`, `audit-fixes.css` — źródła układu, typografii, ruchu i dostępności. `site.css` jest generowanym arkuszem publikowanym.
- `nojs.css` — widoczna nawigacja mobilna i ukrycie przycisków wymagających JS, gdy skrypty są wyłączone.
- `motion.js` — animacje wejścia sekcji i kart przez IntersectionObserver i Web Animations API.
- `tools/render.cjs` — generator stron, metadanych, danych WebPage/BreadcrumbList, mapy stron i strony 404.
- Sześć plików HTML — pełna treść statyczna.
- `assets/` — ilustracje WebP, oryginalne PNG/TTF, fonty WOFF2, licencje oraz wzór zapytania TXT.
- `AUDIT.md` — problemy, wprowadzone zmiany, wyniki testów i rzeczy do późniejszego uzupełnienia.

Treść, nawigacja i opisy dziesięciu gier działają bez JavaScript. Opisy rozwija natywny element details. Każda strona ma jeden H1, unikalny tytuł i opis oraz canonical. Wyszukiwarka uwzględnia gry dla szkół i firm, również przy wpisywaniu bez polskich znaków. Wyniki prowadzą do konkretnego opisu przez fragment adresu. Obsługiwane są też starsze linki `?gra=0`–`?gra=4`.

Podstrony mają tę samą skalę nagłówków, marginesy i minimalną wysokość pierwszej sekcji na komputerze (580 px). Na mniejszych ekranach wysokość wynika z treści. Karty, proces i strzałki układają się responsywnie. Strona główna mieści się w typowych oknach komputera; bardzo niskie okno może przewijać się pionowo.

Animacje nie ukrywają treści przy braku JS lub IntersectionObserver. Preferencja ograniczenia ruchu wyłącza animacje i zatrzymuje efekty po zmianie ustawienia. Karuzela jest przełączana ręcznie, zachowuje fokus i stały H1; zmiana oferty jest ogłaszana przez status dostępności.

## Dane demonstracyjne

Zgodnie z decyzją właściciela dane kontaktowe i szczegółowe opisy pozostają testowe. Adres `kontakt@example.com` jest oznaczonym przykładem, telefon `+48 XXX XXX XXX` jest makietą. Strona nie wysyła formularzy. Dostępny jest rzeczywisty plik TXT do przygotowania zapytania. Oficjalne profile, dane firmy, zdjęcia realizacji i parametry gier należy dodać później. Nie dodano fikcyjnych opinii, ocen, certyfikatów ani danych firmy w schema.org.

## Grafiki i fonty

Cztery pliki `reference-*.png` pochodzą od użytkownika. Logo, ikony i część fotografii są kadrami z tych wzorów, z zachowanymi proporcjami. Dla strony przygotowano lżejsze wersje WebP. Po otrzymaniu osobnych zdjęć i logo można zastąpić kadry niezależnymi zasobami.

Główna ilustracja `hero.png` została wcześniej wygenerowana przez ImageGen; nie jest dokumentacją realizacji. Warianty WebP 768/1536 px pozwalają przeglądarce dobrać rozmiar. Fonty Lato i Caveat przekonwertowano z TTF na WOFF2 bez zmiany kroju. Oryginały i licencje SIL Open Font License pozostały w `assets/`. Wszystkie zasoby są lokalne.

## Kopie poprzednich wersji

- [Przed audytem](https://github.com/dzabrys/Staz1/tree/backup/przed-audytem-2026-10-11)
- [Przed ujednoliceniem i animacjami](https://github.com/dzabrys/Staz1/tree/backup/przed-ujednoliceniem-i-animacjami-2026-10-11)
- [Przed poprawkami podstron](https://github.com/dzabrys/Staz1/tree/backup/przed-poprawkami-podstron-2026-10-11)
- [Przed pierwszymi poprawkami](https://github.com/dzabrys/Staz1/tree/backup/przed-poprawkami-2026-10-11)

## Weryfikacja

Opcjonalne testy wymagają pakietu Playwright i Microsoft Edge. Uruchom je przy działającym serwerze:

```sh
node tools/check.cjs <ścieżka-do-pakietu-playwright>
node tools/motion-check.cjs <ścieżka-do-pakietu-playwright>
node tools/audit-check.cjs <ścieżka-do-pakietu-playwright>
```

Test układu obejmuje sześć stron w dziesięciu szerokościach 320–1920 px, zdjęcia, kadry, strzałki, nakładanie sekcji, spójność skali, wyszukiwarkę, opisy i metadane bez JS. Test ruchu sprawdza uruchamianie i wyłączanie animacji, stałość układu oraz brak wsparcia IntersectionObserver. Test audytu sprawdza linki, schema, wyszukiwanie bez polskich znaków, fokus, zamykanie menu, cele 44 px, błędy 404, mapę i kontakt testowy.

Test animacji i audytu przyjmuje adres strony jako trzeci argument, np. `https://dzabrys.github.io/Staz1/`. Czwarty argument testu audytu może wskazywać `axe-core/axe.min.js`, aby sprawdzić otwarte opisy i wyszukiwarkę. Testy układu oraz audytu przyjmują kanał przeglądarki przez `BROWSER_CHANNEL`. Zrzuty w `artifacts/` są wyłączone z repozytorium.

