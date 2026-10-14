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
