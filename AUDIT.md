# Audyt i poprawki strony Wielkie Gry Planszowe

Data: 11 października 2026. Zakres: strona główna oraz Szkoły, Firmy i instytucje, Gry na zamówienie, Misja specjalna i Kontakt.

[Strona](https://dzabrys.github.io/Staz1/) · [Repozytorium](https://github.com/dzabrys/Staz1) · [Kopia przed audytem](https://github.com/dzabrys/Staz1/tree/backup/przed-audytem-2026-10-11)

Kopia przed audytem wskazuje commit `46d9cf96676751c76770b9dd18b846a712ccf0b0`. Poprzednie wersje układu również pozostają na gałęziach backup.

## Podsumowanie

Największym problemem były ciężkie grafiki i fonty. Kolejne problemy dotyczyły nawigacji bez JavaScript, niepełnej wyszukiwarki, opisów gier dostępnych tylko w oknach JS, mylących przycisków i brakującego kontaktu. Wprowadzono poprawki techniczne oraz czytelne dane demonstracyjne, zgodnie z decyzją właściciela: prawdziwe dane dodamy później.

Zachowano markę, układ oparty na granacie i pomarańczu oraz kroje Lato/Caveat. Podstrony mają wspólną skalę nagłówków, marginesy i wysokość pierwszej sekcji na komputerze; na telefonie wysokość wynika z treści.

## Lista ustaleń i zmian

Priorytety: P1 — istotny wpływ na korzystanie lub wiarygodność; P2 — poprawa funkcjonalności i dostępności; P3 — dalsza optymalizacja lub materiały do uzupełnienia.

| # | Priorytet | Problem lub możliwość poprawy | Wprowadzona zmiana / stan |
|---|---|---|---|
| 1 | P1 | Strona główna pobierała około 5 MB zasobów, część podstron niemal 7 MB. | PNG zastąpiono w publikacji WebP; oryginały zachowano. Dla głównej ilustracji dodano warianty 768/1536 px i srcset. |
| 2 | P1 | Duże fonty TTF zwiększały pobieranie. | Lokalne WOFF2 bez zmiany kroju; preload głównego fontu nagłówków. |
| 3 | P1 | Nawigacja mobilna była ukryta bez JS. | Arkusz noscript pokazuje wszystkie sześć odnośników i ukrywa niedziałające kontrolki skryptowe. |
| 4 | P1 | Szczegóły dziesięciu gier istniały wyłącznie w oknach tworzonych przez JS. | Pełne opisy są teraz w statycznym HTML, w natywnych rozwijanych sekcjach details. Działają bez JS i mają własne adresy fragmentów. |
| 5 | P1 | Przycisk „Zobacz nasze realizacje” prowadził do oferty szkół, a nie portfolio. | Etykiety wskazują rzeczywiste cele: oferta szkół, firm i gry na zamówienie. Nie dodano pozornego portfolio. |
| 6 | P1 | Kontakt nie pozwalał przygotować konkretnego zapytania, a brak danych był niejasny. | Czytelna karta kontaktowa z oznaczonym e-mailem testowym i makietą telefonu; lista informacji do zapytania i działający plik TXT do pobrania. Prawdziwy kontakt pozostaje do uzupełnienia. |
| 7 | P1 | Przyciski społecznościowe otwierały zastępcze komunikaty zamiast profili. | Usunięto pozorne przyciski; dodano odnośnik do kontaktu. Oficjalne profile dodamy po otrzymaniu adresów. |
| 8 | P1 | Obrazy demonstracyjne i hasła mogły sugerować udokumentowane realizacje lub potwierdzone efekty. | Ilustracje mają odpowiednie opisy; strona jest oznaczona jako demonstracyjna, szczegóły gier jako przykładowe. Złagodzono niezweryfikowane deklaracje o zgodności z podstawą programową, efektach, opiniach i doświadczeniu w elementach korzyści. Rzeczywiste dowody dodamy później. |
| 9 | P2 | Wyszukiwarka pomijała pięć gier dla firm. | Indeks obejmuje sześć stron i wszystkie dziesięć gier. |
| 10 | P2 | Wpisywanie bez polskich znaków ograniczało wyniki. | Normalizacja znaków, w tym ł; sprawdzone hasła „szkoly”, „team” i „wody”. |
| 11 | P2 | Wynik gry prowadził do okna JS bez trwałego adresu opisu. | Wyniki prowadzą do odpowiedniej karty i rozwijają opis. Zachowano starsze adresy ?gra=0–4. |
| 12 | P2 | Menu nie obsługiwało pełnego zamykania klawiaturą i kliknięciem poza nim. | Escape zamyka menu i przywraca fokus; kliknięcie poza nagłówkiem, wyjście fokusu oraz przejście na układ komputerowy zamykają menu. |
| 13 | P2 | Kropki karuzeli miały małe pola trafienia około 16×16 px. | Pole każdego przycisku ma 44×44 px; wizualna kropka pozostaje mała. |
| 14 | P2 | Zmiana slajdu mogła zastąpić aktywny link i zgubić fokus. | Tekst i adres aktualizują się w istniejącym elemencie. Stały H1 i status zmiany oferty; obsługa strzałek klawiatury. |
| 15 | P2 | Jasny pomarańczowy tekst i gradientowe numery etapów wymagały lepszego kontrastu. | Ciemniejszy pomarańczowy dla tekstu, pełne kolory numerów i czytelniejsze tło tekstu w hero. Zachowano pomarańczowe dekoracje i przyciski z granatowym tekstem. |
| 16 | P2 | Powtarzające się strzałki kart nie wyjaśniały celu. | Cały wiersz „Opis gry” jest kontrolką details z nazwą zawierającą tytuł gry i widocznym fokusem. Strzałka nie nachodzi na opis. |
| 17 | P2 | Podstrony ofertowe potrzebowały jasnego następnego kroku. | Przyciski kontaktowe w ofertach i „Zapytaj o tę grę” w każdym opisie. Kontakt wyjaśnia wersję testową. |
| 18 | P2 | „Misja specjalna” zawierała mało treści wyjaśniającej ofertę. | Dodano sześć opisów kompetencji i przejście do gier dla szkół. Treść pozostaje redakcyjna, do doprecyzowania na podstawie realnych programów. |
| 19 | P2 | Etykieta „O nas” wskazywała stronę główną. | Zmieniono na „Strona główna”; aktywna strona ma aria-current. |
| 20 | P2 | Okruszki nawigacji nie miały pełnej struktury semantycznej. | Nawigacja z nazwą, lista, oznaczenie bieżącej strony i dane BreadcrumbList. |
| 21 | P2 | Brak własnej strony błędu 404 i ścieżki powrotu. | 404.html z noindex oraz działającymi odnośnikami do strony głównej, ofert i kontaktu. |
| 22 | P2 | Kilka arkuszy i brak wersjonowania zasobów utrudniały publikowanie zmian. | Jeden minifikowany site.css; adresy CSS, JS, fontów i obrazów zawierają hash zawartości. Źródłowe warstwy stylów zachowano do bezpiecznej edycji. |
| 23 | P2 | Brak dodatkowych podstawowych danych strony do interpretacji przez wyszukiwarkę. | WebPage i BreadcrumbList, karta Twitter; zachowane unikalne tytuły, opisy, canonical, Open Graph i mapa sześciu stron. Bez fikcyjnego Organization, ocen czy danych produktu. |
| 24 | P2 | Nowe sekcje kontaktu i misji odziedziczyły starszą siatkę i marginesy. | Osobny układ sekcji treści, prawidłowe marginesy i liczba kolumn; kontrola zrzutów na telefonie i komputerze. |
| 25 | P2 | Animacje muszą reagować na zmianę preferencji ograniczenia ruchu podczas przeglądania. | Sprawdzono i zatrzymano animacje wejścia oraz karuzeli po zmianie preferencji. Treść pozostaje widoczna bez JS i IntersectionObserver. |
| 26 | P3 | Wspólny CSS zawiera style wszystkich podstron i historyczne nadpisania. | Zminifikowano i połączono publikację. Rozdzielenie stylów na strony lub dalsze uporządkowanie źródeł pozostaje możliwą optymalizacją; nie jest blokadą działania. Lighthouse nadal wskazuje niewykorzystany CSS w pojedynczym widoku. |
| 27 | P3 | Logo, ikony i zdjęcia są częściowo kadrami pełnych wzorów strony. | Zachowano proporcje i wygląd, zmniejszono wagę WebP. Docelowo warto zastąpić je osobnymi plikami źródłowymi, szczególnie logo SVG i prawdziwymi fotografiami. |
| 28 | P1 przed sprzedażą | Brak prawdziwych danych firmy, parametrów gier i dowodów realizacji. | Celowo pozostają testowe na życzenie właściciela. Materiały opisano poniżej. |
| 29 | P3 | Brak potwierdzonej konfiguracji Search Console i danych z rzeczywistych odwiedzin. | Mapa jest dostępna; weryfikacja własności, zgłoszenie mapy i pomiary danych rzeczywistych wymagają konta właściciela. Nie potwierdzono indeksacji ani pozycji. |

Unikalne tytuły, opisy, canonical, pojedyncze H1 i podstawowa treść HTML były poprawne już przed tym audytem. Nie traktowano ich jako wcześniejszych błędów.

## Wyniki pomiarów

Lighthouse 13.5.0, Microsoft Edge, tryb mobile, lokalny serwer, symulacja ograniczonego połączenia i CPU ×4. Po jednym przebiegu przed i po zmianach; wyniki są diagnostyczne i mogą się zmieniać między uruchomieniami.

| Metryka strony głównej | Przed | Po |
|---|---:|---:|
| Performance | 69/100 | 86/100 |
| Accessibility | 100/100 | 100/100 |
| Best practices | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| FCP | 2,0 s | 1,5 s |
| LCP | 26,9 s | 4,1 s |
| TBT | 250 ms | 0 ms |
| CLS | 0 | 0 |
| Pobrane dane według Lighthouse | 4876 KiB | 569 KiB |

Waga strony głównej w tym pomiarze spadła o około 88%. LCP nadal wymaga obserwacji na prawdziwym hostingu i urządzeniach. Wartość 4,1 s w symulacji nie oznacza osiągnięcia docelowego dobrego LCP. Wynik SEO 100/100 sprawdza podstawowe warunki techniczne, nie ocenia jakości całej oferty ani nie gwarantuje pozycji w Google.

Oddzielny pomiar zasobów w przeglądarce przy szerokości 390 px, bez symulacji Lighthouse, suma decodedBodySize:

| Strona | Przed | Po |
|---|---:|---:|
| Główna | 4,98 MB | 0,57 MB |
| Szkoły | 6,94 MB | 0,86 MB |
| Firmy | 6,45 MB | 0,77 MB |
| Gry na zamówienie | 4,93 MB | 0,97 MB |
| Misja | 6,94 MB | 0,57 MB |
| Kontakt | 6,94 MB | 0,47 MB |

MB w tej tabeli oznacza milion bajtów; nie należy utożsamiać decodedBodySize z rozmiarem transferu po kompresji HTTP. Pomiar dotyczy zasobów załadowanych w danym przebiegu, nie całkowitej wielkości repozytorium.

Uwagi Lighthouse o cache i kompresji dokumentu odnoszą się do użytego lokalnego serwera. Nie przedstawiam ich jako dowodu błędu ustawień publicznego GitHub Pages. Site.css nadal zawiera CSS innych podstron; dalsze zmniejszenie wspólnego arkusza i osobne zdjęcia mogłyby poprawić czas pierwszego widoku.

## Weryfikacja

- Sześć stron × dziesięć szerokości: 1920, 1536, 1500, 1366, 1024, 900, 768, 600, 390 i 320 px.
- Brak poziomego przewijania, brak brakujących zdjęć, prawidłowe proporcje kadrów, tekst bez nakładania na strzałki i proces, wspólne rozmiary/marginesy podstron.
- Strona główna mieści się w sprawdzonych oknach komputera; przy bardzo niskim oknie dozwolone jest pionowe przewijanie.
- Karuzela, fokus, wyszukiwarka, menu Escape/kliknięcie poza, linki wewnętrzne, opisy gier, starsze adresy, mapa i strona 404.
- Pełna treść i unikalne metadane na sześciu stronach bez JS; menu mobilne i natywne rozwijanie opisów również bez JS.
- Animacje wejścia i przewijania, stały układ, ograniczenie ruchu ze zmianą w czasie działania, brak IntersectionObserver.
- Axe: sześć stron na komputerze 1366 px i telefonie 390 px; brak automatycznie wykrytych naruszeń WCAG 2 A/AA, 2.1 AA oraz best practice. Osobno sprawdzono otwarte opisy szkół/firm i wyszukiwarkę. Przed audytem automat również nie wykrywał naruszeń; nie dowodzi to pełnej dostępności. Kontrast i cele kliknięcia oceniano dodatkowo.
- Kontrola wizualna zrzutów głównej, ofert, procesu, misji i kontaktu.

## Do uzupełnienia po otrzymaniu prawdziwych danych

1. Nazwa prawna firmy, e-mail, telefon, adres i właściwe profile społecznościowe.
2. Dla każdej gry: cel, przebieg, grupa wiekowa, liczba graczy, czas, wymiary, warunki użycia, zawartość zestawu, cena lub sposób wyceny. Obecne oznaczenia pochodzą ze wzorów i wymagają potwierdzenia oferty.
3. Osobne logo i ikony oraz fotografie rzeczywistych gier/realizacji z prawem do publikacji.
4. Prawdziwe przykłady realizacji i opinie z odpowiednią zgodą; wtedy można zbudować portfolio oraz wiarygodne treści o firmie.
5. Potwierdzenie deklaracji o efektach edukacyjnych, jakości i sposobie realizacji — treść demonstracyjna nie jest dokumentacją produktu.
6. Docelowa domena, konto Search Console, zgłoszenie sitemap i ocena rzeczywistych Core Web Vitals.
7. Jeśli powstanie formularz wysyłający dane: odbiorca, działające wysyłanie i właściwe informacje o przetwarzaniu danych. Obecnie jest tylko wzór zapytania do pobrania; polityki prawnej nie wypełniano fikcyjnymi danymi.

## Podstawa oceny

Czytelna, pomocna i wiarygodna treść oraz poprawne odnośniki są elementami pracy nad SEO; same metatagi nie zapewniają widoczności. [Google: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

Dla zwykłego tekstu punktem odniesienia jest kontrast 4,5:1, dla odpowiednio dużego 3:1. Automatyczny wynik wymaga uzupełnienia oceną widoku, szczególnie przy obrazach i gradientach. [W3C: Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

Nawigacja mobilna używa kontrolki rozwijania, jasnego stanu i standardowych linków; Escape i zarządzanie fokusem wspierają obsługę klawiaturą. [WAI APG: Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

