# Wersja robocza do pracy na innym urządzeniu

Gałąź: `codex/lokalna-modernizacja-formularza-gier`. Zapis zmian bez wdrożenia na GitHub Pages.

## Uruchomienie

Wymagany Node.js. W terminalu:

```sh
git clone --branch codex/lokalna-modernizacja-formularza-gier https://github.com/dzabrys/Staz1.git
cd Staz1
node lokalny-kontakt/server.cjs
```

Podgląd: http://127.0.0.1:4175/

- Kontakt: http://127.0.0.1:4175/kontakt.html
- Gry na zamówienie: http://127.0.0.1:4175/gry-na-zamowienie.html

Serwer lokalny podmienia tylko te dwie trasy na projekty z folderów `lokalny-kontakt/` i `lokalne-zamowienia/`. Oryginalne pliki stron pozostają bez zmian. Nie uruchamiaj pełnego generatora, jeśli chcesz wyłącznie zmieniać te projekty.

## Zapisane zmiany

- Formularz widoczny na stronie, z kartą „Co warto opisać?” nakładającą się na panel i sześcioma wskazówkami.
- Gradient: pomarańczowy prawy górny róg, granatowy lewy dolny róg, białe nieregularne dekoracje.
- Formularz podłączony do Formspree; kliknięcie „Wyślij zapytanie” wysyła prawdziwe zgłoszenie.
- Modernizacja kolorystyki strony gier na zamówienie; sześć etapów jako karteczki sticky notes.
- Pliki `.poprzedni` zachowują wcześniejszy wariant kontaktu.

## Do dalszej pracy

- [ ] Dopracowanie i uzgodnienie nowego wyglądu formularza oraz gier na zamówienie.
- [ ] Zabezpieczenia formularza przed botami.
- [ ] Modernizacja układu podstron Szkoły oraz Firmy i instytucje.
- [ ] Spójna, odważniejsza kolorystyka pomarańczowa i granatowa, z gradientami na pozostałych podstronach.
- [ ] Przygotowanie i wdrożenie zatwierdzonych zmian jako gotowego produktu.

Nie scalać z gałęzią publikowaną przed zatwierdzeniem.
