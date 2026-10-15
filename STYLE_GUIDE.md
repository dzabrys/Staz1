# Zasady ustalone z użytkownikiem

- Jedna nowoczesna stylistyka: biel, granat, pomarańcz jako akcent, lokalne fonty Lato i Caveat.
- Karty mają miękkie narożniki i rozproszony cień. Unikać ostrej niebieskiej obwódki i ciężkich dekoracji.
- Oferta: dwa duże kafle ze zdjęciem na całej powierzchni, nazwą u góry po lewej i prostym przyciskiem na dole. Cały kafel jest klikalnym odnośnikiem.
- Gdy zawartość na to pozwala, układ na komputerze ma mieścić się w jednym ekranie. Dopasowywać wysokości i odstępy; nie ukrywać treści ani wyłączać przewijania, aby zamaskować przepełnienie.
- Na telefonach pozostawić czytelny tekst, cele dotykowe minimum 44 px oraz naturalne pionowe przewijanie.
- Katalog zachowuje układ siatki. Zdjęcie, nazwa, opis i link należą do jednej białej karty; klasyczne plansze pozostają widoczne w całości.
- Treść i linki pozostają statycznym HTML. Zachować unikalne metadane i jeden H1 na stronę.
- Pracujemy lokalnie. Publikacja na GitHubie wymaga nowego wyraźnego polecenia użytkownika. Przed kolejnymi zmianami zachować potrzebny punkt powrotu.

- Strona główna: trzy lewe kafle mają być mniejsze i pozostawiać więcej białej przestrzeni po bokach głównej sekcji. Zachować czytelne teksty, zdjęcia i przyciski; pracować lokalnie.


- Oferta zachowuje dwie pionowe karty, ale używa jasnych zdjęć, granatowych nazw, pomarańczowych podkreśleń i pomarańczowych przycisków zgodnych ze stroną główną. Rozjaśnienie tylko przy tytułach, bez ciemnej nakładki na całą fotografię.


- Korekta: zdjęcia w dwóch kaflach oferty bez gradientów i rozjaśniających nakładek, aby nie zasłaniać przyszłych zdjęć planszówek.


- Aktualny wariant oferty: osobny biały nagłówek w górnej części każdej karty, zdjęcie poniżej bez filtrów, pomarańczowy przycisk na dole fotografii. Cała karta nadal jest odnośnikiem. Zastępuje warianty z gradientem i szkłem.


- Aktualna korekta oferty: nazwy bez pomarańczowych podkreśleń. Biały nagłówek przechodzi w zdjęcie przez wąski miękki pas na styku (40–56 px), bez szkła i rozmycia pozostałej fotografii.


- Wybrany do publikacji wariant oferty: duże białe nazwy bezpośrednio w lewym górnym rogu zdjęć, subtelne przyciemnienie pod tekstem, bez szkła, białych nagłówków i podkreśleń. Pozostałe cztery propozycje pozostają osobnymi podglądami.


## Katalog i ikona — 2026-10-14
- Gry na zamówienie: ikona planszy z ołówkiem, granatowa kreska zgodna z menu.
- Karty produktów pozostają białe. Co druga sekcja katalogu ma jasnoniebieskie tło (#eaf5fc) za całą grupą produktów, rozciągnięte do boków strony.
- Miękki cień pod kartami, przy najechaniu uniesienie o 4 px; ograniczenie ruchu pozostaje obsługiwane.
- Podgląd lokalny. Kopia poprzednich źródeł: backups/przed-kartami-v26.


## Dopracowanie katalogu — v27 lokalnie
- Karty pozostają białe. Tło co drugiej sekcji: #f0f8fd, zaokrąglenie 32 px (telefon 24 px).
- Cienie kart są ciaśniejsze, z subtelnym uniesieniem po najechaniu. Akcja ma granatowy tekst i pomarańczową okrągłą strzałkę zamiast szarego paska.
- Nagłówek katalogu jest mniejszy, opis bezpośrednio pod nim; pola zdjęć mają wspólne proporcje. Pełne plansze pozostają widoczne.
- Sprawdzono 1920×1080, 390×844 i 320×740: bez poziomego przewijania, akcje mieszczą się w kartach. Kontrola statyczna: 28 stron i 899 odnośników/zasobów, PASS.
- Oryginalne zdjęcia pozostają bez podmiany; rozdzielczość istniejących ilustracji ogranicza ich ostrość.
- Kopia źródeł sprzed zmian: backups/przed-katalogiem-v27. Zmiany wyłącznie lokalne.


## Aktualna decyzja — białe tło katalogu
- Usunięto naprzemienne niebieskie tła sekcji. Wszystkie sekcje katalogu mają białe tło; karty, cienie i pomarańczowe strzałki pozostają w wersji v27. Tylko lokalnie.


## Katalog na telefonie — v29 lokalnie
- Do 700 px szerokości margines katalogu wynosi 30 px zamiast 20 px. Karty przy 390 px są około 6% węższe; desktop pozostaje bez zmian.
- Sprawdzono brak poziomego przewijania i mieszczące się akcje przy 390 i 320 px. Pozostałe propozycje zapisano w outputs/audyt-wizualny-strony-2026-10-14.md, bez implementacji.


## Ujednolicenie v30 — wyłącznie lokalnie
- Aktualne dopracowanie jest w site-refinement.css, dołączonym na końcu kompilowanej listy CSS w tools/build.cjs.
- Wspólna skala nagłówka: 96 px na komputerze, 88 px na telefonie. Wspólne logo, przyciski, stopka i wyrównanie treści.
- Krótsze opisy szkół, firm i zamówień. Ograniczone ozdobniki i regularne zaokrąglenia; bez zmiany animacji.
- Strona produktu: nazwa przed opisem, zdjęcie i parametry, zapytanie przed pełniejszym opisem. Zachować istniejące dane do czasu ich potwierdzenia.
- Porównanie: /porownanie/; niezależna kopia przed zmianami /porownanie/przed/. Nie przebudowywać kopii przed.


## Publikacja zaakceptowanej wersji
- Wersja v30 wraz z wcześniejszym wykończeniem katalogu została zapisana na main repozytorium dzabrys/Staz1 w commicie ca0e29502c3d438b978794714f53500bd77be41d.
- Podgląd porównawczy /porownanie/ i kopia przed pozostały lokalnie. Publiczna kompilacja ma index,follow oraz canonical pod adresem https://dzabrys.github.io/Staz1/.


## Korekta v32 — lokalnie
- Usunięta dodatkowa stopka z nazwą marki i dolną nawigacją na wszystkich aktywnych stronach. Sekcje kompetencji i korzyści zostają.
- Nagłówek procesu bez ozdobnego podkreślenia; pozostałe podkreślenia bez zmian.
- Przywrócone zakrzywione strzałki między etapami. Na telefonie wszystkie pięć skierowane w dół. W siatce trzech kolumn łączenia nie wychodzą poza koniec rzędu.
- Przywrócone falowane wcięcie tła polecanych gier szkół i firm; katalog pozostaje biały.
- Kontrola: 28 stron i 853 lokalne odnośniki/zasoby, PASS. Brak przewijania poziomego w sprawdzonych widokach. Kopia źródeł sprzed zmian: backups/przed-poprawkami-v32.
- Zmiany v32 nie zostały wysłane na GitHub.


## Korekta v33 — lokalnie
- Ozdobne podkreślenia pod nagłówkami usunięte na całej aktywnej stronie. Strzałki etapów i falowane tło pozostają.
- Oferta bez widocznego napisu Wybierz swoją grę. Zachowany semantyczny h1 Oferta gier dostępny dla czytników ekranu.
- Ścieżka nawigacji oferty ma 16 px na komputerze i 15 px na telefonie.
- Dwie karty oferty są centrowane pionowo w przestrzeni pod menu i ścieżką nawigacji: po 88 px nad i pod kartami przy 1920×1080, po 36 px przy 1280×720. Bez przewijania przy tych rozmiarach.
- Telefon zachowuje naturalny układ kart jedna pod drugą. Sprawdzono 390 i 320 px: bez przewijania poziomego i wystających przycisków.
- Kopia źródeł sprzed zmian: backups/przed-poprawkami-v33. Nie publikowano na GitHub.


## Centrowanie v34 — lokalnie
- Oś kart oferty jest teraz liczona względem całej wysokości widoku, a nie pozostałej przestrzeni pod menu i ścieżką nawigacji.
- Przy 1920×992 oś i środek kart to 496 px; krawędzie są po 332 px od osi i po 164 px od góry/dołu widoku. Przy 1280×720 oś i środek kart to 360 px, z równymi marginesami po 164 px.
- Wielkość kart uwzględnia miejsce na nagłówek i ścieżkę nawigacji. Telefon zachowuje naturalny przepływ dokumentu, bez pozycjonowania bezwzględnego.
- Kopia źródła: backups/przed-centrowaniem-v34. Zmiana pozostaje lokalna.


## Wydłużenie v35 — lokalnie
- Karty oferty wydłużone o 40 px wyłącznie w dół. Górna krawędź i szerokość pozostają bez zmian względem v34; zmiana celowo przesuwa dolną krawędź poniżej symetrycznego ustawienia.
- Przy 1920×992: góra 164 px, dół 868 px, wysokość 704 px; bez przewijania. Telefon bez zmiany układu.


## Wydłużenie v36 — lokalnie
- Dodatkowe 80 px w dół: łącznie 120 px wydłużenia względem v34. Góra i szerokość bez zmian. Telefon zachowuje swój dotychczasowy układ.


## Nawigacja i hover v37 — lokalnie
- Ścieżka nawigacji oferty wyrównana do głównych podstron: 118 px od lewej przy 1920 px, zgodnie ze Szkołami. Tekst na telefonie ma standardowy margines 20 px.
- Hover i focus klawiatury: uniesienie karty 5 px, zbliżenie zdjęcia 1.045, lekkie podniesienie tytułu, przesunięcie strzałki 4 px oraz wzmocnienie cienia i koloru akcji.
- Efekty płynne w CSS, tylko dla precyzyjnego wskaźnika. prefers-reduced-motion wyłącza przesunięcia, powiększenie i przejścia; zostaje statyczne wyróżnienie cienia i koloru. Sprawdzono aktywny stan hover oraz tę obsługę ograniczenia ruchu.
- Semantyczny HTML, h1, opisy zdjęć, zwykłe linki kategorii i metadane pozostają bez zmian. Animacja nie wymaga dodatkowego JS i nie ukrywa treści.
- Kontrola statyczna PASS: 28 stron i 853 lokalne odnośniki/zasoby. Telefon 390 px: bez poziomego przewijania i wystających akcji.
- Kopia źródła: backups/przed-hover-v37. Zmiany nie zostały opublikowane.


## Hover v38 — lokalnie
- Obie karty oferta.html: uniesienie 6 px przez 320 ms, spokojne zbliżenie zdjęcia 1.025 przez 550 ms i strzałka przesunięta o 4 px. Tytuł porusza się razem z kartą.
- Cień ma osobną warstwę pseudo-elementu; animowana jest jej opacity, bez animowania box-shadow. Zdjęcie nadal przycięte do zaokrągleń 24 px.
- CSS bez nowych bibliotek, zwykłe linki i statyczna treść HTML pozostają. Touch ma stan wciśnięcia, klawiatura focus-visible. prefers-reduced-motion wyłącza ruch, zostawia statyczne wyróżnienie.
- Sprawdzono rzeczywisty hover w podglądzie z ograniczeniem ruchu: cień opacity 1 i zmieniony kolor akcji. Telefon 390 px bez poziomego przewijania. PASS 28 stron / 853 lokalne odnośniki i zasoby.
- Kopia poprzedniego CSS: backups/przed-hover-v38. Bez publikacji GitHub.

## Hover v39 — lokalnie
- Na życzenie: cały kafel powiększa się do 1.018 i unosi o 5 px. Płynne wejście i powrót 320 ms. Pozostałe reguły v38, w tym ograniczenie ruchu, zachowane. Bez publikacji.

## Hover v40 — lokalnie
- Na wyraźne doprecyzowanie użytkownika: cała karta skaluje się od środka równomiernie w każdą stronę do 1.025 przez 380 ms, bez unoszenia i bez osobnego zoomu zdjęcia.
- Wykryto globalne transition:none!important w ograniczeniu ruchu, które blokowało widoczny efekt. Dla tej jednej interakcji wskaźnikiem zastosowano krótszy wariant 220 ms i mniejszą skalę 1.015. Pozostałe animacje nadal ograniczone.
- Potwierdzono w podglądzie matrix(1.015,0,0,1.015,0,0), przejście transform 0.22s i symetryczny przyrost obrysu; zdjęcie bez własnej transformacji. Bez publikacji.

## Hover v41 — lokalnie
- Płynniejsze powiększenie i powrót: 650 ms, cubic-bezier(.25,.1,.25,1). Cień wygaszany w tym samym rytmie. Wariant ograniczonego ruchu zachowuje mniejszą skalę i ma 500 ms na wyraźne życzenie płynniejszego przejścia. Bez publikacji.

## Przyciski oferty v42 — lokalnie
- Zmiana tła i tekstu CTA płynnie przez 400 ms, także w wariancie ograniczonego ruchu dla tej jawnie zamówionej interakcji wskaźnikiem.
- Najechanie na kartę: subtelnie głębszy pomarańcz #ff8018. Bezpośrednio na CTA lub fokus klawiatury: firmowy granat, biały tekst, powiększenie 1.035 (1.02 przy ograniczeniu ruchu), strzałka 4 px (3 px).
- Potwierdzono rzeczywisty hover: tło rgb(16,36,120), biały tekst, transform matrix 1.02, strzałka 3 px oraz transition 0.4s. PASS 28 stron / 853 lokalne linki i zasoby. Bez publikacji.

## Produkty v43 — lokalnie
- Wszystkie wspólne catalog-card: oba katalogi i sekcje polecanych produktów na stronach produktów. Płynne powiększenie całej karty od środka 1.025 / 650 ms, bez kadrowania planszy i przesuwania układu.
- Cień wzmacnia się przez opacity osobnej warstwy. Strzałka płynnie przechodzi na firmowy granat z białym symbolem. Bezpośrednie najechanie na wiersz Poznaj grę powiększa przycisk i przesuwa symbol.
- Klawiatura: widoczny fokus i taka sama reakcja karty. Telefon dotykowy: bez zależności od hovera, lekki stan wciśnięcia.
- Wariant ograniczonego ruchu zgodny z ofertą: mniejsza skala 1.015 / 500 ms; brak automatycznych wejść nowych kart i dodatkowego zoomu planszy.
- Sprawdzono w podglądzie transform 1.015, opacity cienia 1, granatową akcję i przejścia; szerokość 390 px bez przewijania poziomego. Kontrola PASS 28 stron / 853 lokalne linki i zasoby.
- Kopia poprzedniej wersji: backups/przed-produktami-v43/offer.css. Bez publikacji GitHub.

## Menu i strona główna v44 — lokalnie
- Wspólne menu: prosty aktywny wskaźnik 2 px, bez rotacji i zaokrąglenia ozdobnej kreski. Ikony pozostają granatowe. Tekst wypełnia się od lewej do prawej firmowym ciemnym pomarańczowym przez 450 ms (250 ms przy ograniczeniu ruchu).
- Nakładka tekstu jest aria-hidden; widoczny i dostępny tekst linku pozostaje w statycznym HTML. Fokus klawiatury również ujawnia wypełnienie. Menu nie używa JS do animacji i działa bez niego na komputerze.
- Strona główna: delikatna skala kafli, płynne granatowe CTA z białym tekstem i ruchem strzałki, reakcje kontrolek karuzeli; lekki zoom zdjęcia tylko przy zwykłym ruchu.
- Jednorazowe wejście samych bloków tekstu przez 8 px; bez ukrywania tekstu i bez animowania dużego obrazu przy wczytaniu. Brak pętli, nasłuchu ruchu myszy i nowych bibliotek. Automatyczne wejścia respektują prefers-reduced-motion.
- Sprawdzono: prosty wskaźnik 2 px / radius 0 / transform none; rzeczywisty hover etykiety clip-path od 100% do 0; czytelne pojedyncze nazwy linków w drzewie dostępności. Strona główna 1920×1080 mieści się bez przewijania. Menu 390 px bez poziomego przewijania. Karuzela przechodzi na slajd 2 i wraca na 1.
- Kontrola statyczna PASS: 28 stron / 853 lokalne linki i zasoby. Dostosowano istniejącą kontrolę aktywnego linku Oferty do nowego zagnieżdżenia etykiety. Składnia animations.js poprawna. Nie wykonywano pełnego pomiaru Lighthouse.
- Kopia źródeł przed zmianami: backups/przed-menu-home-v44. Bez publikacji GitHub.

## Wspólne animacje v45 — lokalnie
- Podstawowy ruch stosowany na wszystkich 28 aktywnych stronach. Zachowano zaakceptowane efekty oferty, katalogów i strony głównej.
- Przyciski podstron: 400 ms, delikatna skala, granatowe tło / biały tekst, strzałka 3 px. Polecane gry szkół i firm: płynna skala 1.02 (1.01 w ograniczeniu ruchu), stały cień, płynna granatowa akcja. Drobne reakcje wyszukiwarki, menu, kategorii i linków.
- Ujednolicone jednorazowe wejście tekstu o 8 px / 480 ms. Nie zmienia opacity: pełna treść i obrazy są widoczne od razu. IntersectionObserver uruchamia treści kart i dalsze sekcje raz, po czym je odłącza. Animowane wnętrze karty nie konkuruje z transform jej hovera. Bez bibliotek, animacji w pętli i nasłuchu scroll/mousemove.
- Automatyczne wejścia są wyłączone przy prefers-reduced-motion; drobne interakcje wskaźnika zachowują uzgodnione łagodne przejścia.
- PASS 28 stron / 853 lokalne odnośniki i zasoby, poprawna składnia animations.js. Podgląd szkół: skala 1.01 i granatowa akcja, 1920×1080 bez przewijania; gry na zamówienie również mieszczą się w tym widoku. Produkt 390 px bez przewijania poziomego, CTA w pełni widoczne na wysokości 660 px; rzeczywisty hover daje granat i biały tekst przez 400 ms.
- Kopia poprzednich źródeł: backups/przed-animacjami-v45. Bez publikacji GitHub. Archiwalne porównania i niezależne warianty pozostają osobnymi kopiami.

## Wdrożenie zaakceptowanej wizualizacji v48 — lokalnie
- Wdrożono punkty 2, 3, 4, 7, 8, 9 i 10 audytu v46. Nowy plik `layout-refinement.css` dołączony na końcu wspólnego CSS w `tools/build.cjs`.
- Telefon: karty Oferty 400 px, hero 380 px, zwarte kafle odbiorców oraz polecane gry szkół i firm jako poziome karty listy. Parametry produktu mają dwie kolumny i większą przestrzeń na temat. Układ podobnych produktów przechodzi na jedną kolumnę poniżej 371 px.
- Produkty i katalogi mają wyraźnie oznaczone ceny poglądowe: 1 490 zł / 1 990 zł. Nie dodano niepotwierdzonych wymiarów, materiałów, VAT ani dostępności. Powiększenie zdjęcia korzysta z natywnego dialogu i przywraca fokus. Podobne produkty pochodzą z tej samej grupy.
- Etapy tworzenia gry mają krótki opis oraz natywnie rozwijane szczegóły. Zachowano łączniki procesu. Menu telefonu ma animowane SVG przechodzące w X, kontrolki kropek karuzeli mają 44×44 px.
- Zachowano wspólne animacje v45 i zaakceptowane hovery oferty / produktów. Nowe dialogi, rozwijane treści, menu i kontrolki mają krótkie przejścia CSS/WAAPI. Bez nowych bibliotek, pętli animacji i nasłuchu scroll/mousemove. Przy ograniczeniu ruchu automatyczne wejścia pozostają wyłączone, a dialogi i szczegóły stosują krótkie przejście opacity.
- Sprawdzono: natywne powiększenie zdjęcia i przywrócenie fokusu; otwieranie i zamykanie szczegółów; filtrowanie wyszukiwarki; menu i animowane ścieżki SVG; przejście karuzeli 1→2→1 i przyciski kropek 44×44 px. Szkoły 1920×1080 bez przewijania, wybrane widoki telefonu 390×844 bez poziomego przewijania. Karty Oferty mają po 400 px, karty szkół po 135 px.
- Kontrola statyczna PASS: 28 stron / 843 lokalne odnośniki i zasoby / 20 produktów. Nie wykonywano pełnego pomiaru Lighthouse. Kopia źródeł: `backups/przed-wdrozeniem-v48/`. Wizualizacja v47 pozostaje zamrożonym porównaniem. Bez publikacji GitHub.

## Typografia stron odbiorców v49 — lokalnie
- Wspólne zmienne typograficzne w końcowej sekcji `layout-refinement.css`, ograniczone do `.page-school`, `.page-company`, `.page-custom`. H1 desktop: clamp(42px,3.9vw,68px) / 1.06; tytuł sekcji 32 px / 1.2; wstęp 21 px / 1.4; tytuł boczny 30 px / 1.2 i opis 19 px / 1.5; korzyści 28 px / 1.2.
- Tablet 701–1000 px: wspólny H1 clamp(40px,6.5vw,62px), tytuł sekcji 30 px, tytuł boczny 28 px. Telefon do 700 px zachowuje zaakceptowane H1 clamp(34px,9vw,44px) / 1.08, wstęp 18 px / 1.5, tytuł sekcji 27 px / 1.2.
- Tytuły etapów desktop 21 px / 1.2; krótki opis 17 px / 1.45. Mobilne kompaktowe karty gier i etapy pozostają osobnymi rolami tekstu. Menu i przyciski miały spójne parametry — bez zmiany.
- Sekcja gier firm: desktopowe odstępy pionowe 22 px jak w szkołach. Wszystkie trzy strony mieszczą się w 1920×1080 przy zamkniętych szczegółach. Sprawdzono 15 widoków (3 strony × 5 szerokości 1920/1366/768/390/320); brak poziomego przewijania.
- PASS 28 stron / 843 lokalne odnośniki i zasoby. Animacje i zamrożona wizualizacja v47 zachowane. Raport: `outputs/raport-typografii-v49.md`; pomiary przed/po w plikach JSON. Kopia CSS: `backups/przed-typografia-v49/`. Bez publikacji GitHub.

## Powierzchnie hero i kropki v50 — lokalnie
- Trzy kafle odbiorców i główny obraz hero mają wspólny miękki cień oparty na `--card-shadow`, z dodatkową warstwą 0 14px 28px #1423580a. Zamiast błękitnego borderu użyto subtelnej wewnętrznej krawędzi 1 px w kolorze `--surface-edge`, jak w pozostałych kartach. Krawędź jest na warstwie bez obsługi wskaźnika, więc obrazy jej nie przykrywają i nie blokuje przycisków.
- Komputer od 1001 px: wizualna podkładka kropek 108×28 px zamiast 142×48 px, kropki 10 px, pola przycisków 32×44 px. Podkładka oddzielona od pól kliknięcia przez pseudo-element. Fokus klawiatury ma biały obrys. Telefon i tablet zachowują pola dotykowe 44×44 px.
- Zachowano skalowanie kafli, reakcje CTA, zdjęcia i kropek. Brak nowych skryptów, fontów i bibliotek. Główna kompozycja nadal mieści się w 1920×1080; przy 390 px brak poziomego przewijania. Sprawdzono przejście karuzeli 1→2→1.
- PASS 28 stron / 843 lokalne odnośniki i zasoby. Kopia źródeł: `backups/przed-hero-v50/`. Zrzuty: `outputs/v50-hero-komputer.png` i `outputs/v50-hero-telefon.png`. Bez publikacji GitHub.

## Aktualizacja wariantu hero i publikacja v51
- `/1/` jest teraz generowane z aktualnej strony głównej przez `tools/build-hero-alternative.cjs`, wywoływane po głównym budowaniu. Wspólne treści, SVG menu, nawigacja, animacje, cienie, obramowania i kropki trafiają do obu wersji.
- Od 1201 px wariant zachowuje 90% szerokości głównej kompozycji: 1476 px przy 1920 px i około 1106 px przy 1366 px. Navbar ma tę samą szerokość, wysokość 92 px, logo do 260 px i ikony 28 px. Układ telefonu jest wspólny.
- Wariant ma `noindex,follow` i canonical do głównej strony; główne 28 stron produkcyjnych ma `index,follow` oraz publiczne adresy canonical. Archiwalne lokalne porównanie v47 i kopie zapasowe nie są publikowane.
- Sprawdzono wariant 1920×1080, 1366×768 i 390×844: brak poziomego przewijania, przyciski mieszczą się w kaflach, menu i karuzela działają. Wariant mieści się na ekranie 1920×1080. Publikacja obejmuje zatwierdzone zmiany v48–v50 oraz aktualizację `/1/`.

## Układ krótszych okien, fala i logo v52
- Od 1441 px szerokości przy wysokości do 980 px wspólna kompozycja stron szkół, firm i zamówień ma mniejsze odstępy, dopasowane obrazy oraz wspólną skalę nagłówków. Nie użyto overflow:hidden ani blokowania kółka; rozwinięte treści i mniejsze ekrany mogą naturalnie przewijać się dalej.
- Sprawdzono 1920×1080, 1920×945 i 1536×864. W trzech widokach 1536×864 dokument ma dokładnie 864 px; ostatnia treść mieści się odpowiednio na 780, 856 i 828 px. Telefon 390 px bez poziomego przewijania.
- Polecane gry szkół i firm: maksymalna szerokość sekcji 1640 px, wewnętrzne odstępy 24 px; dolny przebieg niebieskiej fali podniesiono tak, aby obejmował dolne narożniki kart. Mobilna lista zachowana.
- Logo zastąpiono dostarczonym plikiem Wielkie_Gry_Planszowe_logo_wektorowe.svg. Ścieżki i kolory bez zmian; viewBox ograniczono do 81 192 1612 485, aby usunąć puste marginesy oryginalnego arkusza. Zasób ma wersjonowany URL, jest wspólny dla strony i wariantu /1/.
- Kopia źródeł sprzed zmiany: backups/przed-v52. Lokalny eksperyment sklepu dla więcej niż pięciu produktów jest osobnym podglądem i nie należy do tej publikacji.


## Poprawki z ekranów użytkownika — 15.10.2026
- Bieżąca prośba zastępuje wcześniejsze zwężanie strony i kafli: główna strona, nagłówek oraz podstrony korzystają z pełnej dostępnej szerokości z regularnym marginesem wewnętrznym. Nie blokujemy przewijania ani nie obcinamy treści. Gdy zawartość jest wyższa od widoku, pozostaje naturalny scroll.
- Nowe nadpisania w viewport-fixes.css, na końcu wspólnej kompilacji. Punkt powrotu w Git: f75f7fa69ee64a804747d90ffafd328c2e9e1521.
- Kafle odbiorców mają przyciski jednakowego rozmiaru, przy dolnej krawędzi. Karty szkół/firm mają uporządkowany tekst i cenę wyrównaną w dole. Wzmocniony miękki cień dotyczy także kart zapytania.
- Rozwijanie etapów: ikona i w kółku oraz dotychczasowa strzałka, pełna nazwa dostępna dla czytników. Klawiatura i natywne details pozostają obsługiwane.
- Kontakt: biuro@wielkiegryplanszowe.pl, +48 600 894 644, Lubelska 37D, 10-408 Olsztyn. Dane zweryfikowane na https://wielkiegryplanszowe.pl/ dnia 15.10.2026. Bez przywracania fikcyjnego e-maila, numeru ani oznaczeń demonstracyjnych.


## Główna strona jak wariant /1/ — 15.10.2026
- Na wyraźne życzenie użytkownika główny index używa wyglądu /Staz1/1/: boczne białe marginesy, szerokość głównej kompozycji do 1476 px, dopasowany węższy nagłówek oraz mniejsze logo i ikony.
- Reguły przeniesiono do home-index-layout.css, kompilowanego na końcu. Dotyczą wyłącznie strony głównej i zastępują jej wcześniejsze rozszerzenie.
- /1/ korzysta z tego samego CSS, aby kolejne buildy nie rozjeżdżały wyglądu obu adresów. Główny index pozostaje canonical i index,follow; /1/ zachowuje noindex,follow.

## Wspólne marginesy podstron — lokalnie, 15.10.2026
- Na najnowsze życzenie użytkownika pozostałe podstrony korzystają z bocznych marginesów strony głównej. Od 1201 px wspólna rama ma do 1476 px, identyczny nagłówek o wysokości 92 px oraz tę samą skalę logo i nawigacji. Reguły zawiera subpage-frame.css, ładowany po home-index-layout.css.
- Szkoły, firmy, gry na zamówienie, oferta i kontakt mieszczą podstawowy widok w jednym oknie. Wysokość sekcji oraz rozmiary kart i odstępy dostosowują się do wysokości okna. Bez blokowania scrolla i obcinania treści; rozwinięte etapy mogą zwiększać wysokość dokumentu.
- Użytkownik potwierdził zachowanie przewijania katalogów i długich opisów produktów. Mają wspólną ramę i nagłówek. Układ mobilny zachowuje naturalne przewijanie.
- Sprawdzono pięć głównych podstron w 1920×960, 1536×864, 1366×768 i 1280×720: wysokość dokumentu równa wysokości okna. Przy 390×844 brak poziomego przewijania. Sprawdzono katalogi obu kategorii, opis Team building i rozwinięcie etapu. PASS: 28 stron / 843 lokalne odnośniki i zasoby.
- Zmiany pozostają wyłącznie lokalnie, bez publikacji na GitHub. Podgląd: http://127.0.0.1:4175/Staz1/. Wygląd wybranej strony głównej pozostaje bez zmian.

## Powiększenie podstron, warianty mobilne i publikacja — 15.10.2026
- Użytkownik następnie zlecił publikację wszystkich dzisiejszych prac nad stroną. Zastępuje to wcześniejsze ograniczenie do localhostu. Publikacja obejmuje wspólne marginesy, powiększenie treści, poprawki telefonu i osobne podglądy.
- Szkoły, firmy, zamówienia i kontakt używają wspólnego mnożnika typografii --subpage-scale: 1.1, przy wysokości do 850 px 1.05, do 760 px 1.02. Cztery podstrony mają identyczny rozmiar głównego nagłówka w tym samym oknie. Zmniejszono odstępy zamiast obcinać zawartość, aby zachować dopasowanie do jednego ekranu.
- Sekcję polecanych gier podniesiono o 12 px; niebieskie wcięcie fali jest płytsze. Karty mają większe obrazy, tekst i działania. Zdjęcia szkół/firm na telefonie kończą się w obrębie hero i nie wpadają pod kolejną sekcję.
- /mobile-propozycje/ porównuje wcześniejszy wygląd, poprawioną listę, siatkę i karty przewijane poziomo. Można przełączać szkoły/firmy oraz przejść od razu do kart. Wcześniejszy CSS jest zamrożony w przed.css; nowe warianty są generowane ze wspólnych treści i prowadzą do aktualnych produktów.
- /test-formularzy/ oraz /test-formularzy/kontakt-podglad.html udostępniają dzisiejsze osobne podglądy formularzy. Nie zastępują głównej zakładki Kontakt. Budowanie odświeża podgląd kontaktu i oznacza go noindex,follow. Nie wysyłano zgłoszeń podczas publikacji.
- /podglady/ zbiera wszystkie propozycje pod jednym adresem. Pozostają poza głównym menu i sitemapą. Główna strona i canonical bez zmiany.
- Sprawdzono dopasowanie czterech powiększonych podstron w 1920×960, 1536×864, 1366×768 oraz 1280×720. Warianty mobilne sprawdzono w szerokościach 390 i 320 px: bez poziomego przewijania całego dokumentu. Karty karuzeli przewijają się we własnej sekcji.

## Strzałka kontaktu i niezależne rozwijanie etapów v57
- Baza main: ab2ef5d (PR #6). W kontakcie dodano wyłącznie na komputerach z precyzyjnym wskaźnikiem (od 1001 px) wskazującą strzałkę SVG po kliknięciu Przygotuj zapytanie. Strzałka rysuje kreskę i grot, znika po chwili i może zostać uruchomiona ponownie. Ładowane tylko na stronie Kontakt pliki contact-guide.css i contact-guide.js.
- Telefon, tablet i wskaźnik dotykowy: bez strzałki i bez przechwytywania kliknięcia; standardowy anchor do sekcji, z odstępem scroll-margin 20 px. Na komputerze, gdy instrukcja jest już widoczna, nie przesuwa strony. Bez JS pozostaje zwykły anchor. SVG dekoracyjne, poza układem, bez blokowania wskaźnika. Animacja krótsza przy ograniczeniu ruchu.
- Etapy zamówienia: align-items:start usuwa rozciąganie zamkniętych kart przez rozwiniętego sąsiada. Usunięto margin-top:auto z kontrolek. Wspólna minimalna wysokość krótkiego opisu wyrównuje kontrolki w stanie zamkniętym (trzy wiersze desktop / cztery na laptopie). Każda karta rozwija się do wysokości własnej treści. Ikony informacji są stałymi SVG 26×26 bez zależności od kształtu litery i kurczenia flex.
- Sprawdzono 1920×1080: wszystkie kontrolki na 217 px względem karty; rozwinięcie pierwszych trzech nie zmienia wysokości pozostałych (275 px). Laptop 1366×768: różnica położenia kontrolek poniżej 0,1 px. Telefon 390×844: strzałka display:none, brak aktywnej animacji po kliknięciu, normalny #zapytanie i brak poziomego przewijania.


## v58 — strona zamówień i dane oferty

Wyszukiwarka wyłączona w szablonie, bez pustego miejsca w nagłówku. Karty formatów mają subtelny cień; układ i kolory zachowują Lato, granat i pomarańcz. Etapy rozwijają się niezależnie, na laptopie tworzą trzy kolumny, na telefonie jedną. Widoczny podpis Szczegóły etapu zastępuje samą ikonę. FAQ i kontakt kończą ścieżkę na stronie. Animacje respektują prefers-reduced-motion i nie ukrywają treści przed wykonaniem JavaScriptu. Dane firmy, usługi i FAQ powstają w HTML podczas budowania; nie dodajemy fikcyjnych realizacji, opinii, cen ani parametrów.
