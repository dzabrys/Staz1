# Obrazy w podglądzie gry

Lupa korzysta z osobnego źródła `detailImage` w danych produktu w `offer-templates.js`. Jeżeli nie podano tego pola, podgląd używa aktualnego obrazu gry. Na razie wszystkie gry korzystają z tego wariantu zastępczego.

Przykład przyszłej konfiguracji: `{title:'Skarb piratów', image:'assets/oferta-skarb-piratow.webp', detailImage:'assets/skarb-piratow-detale.webp', ...}`. Plik należy umieścić w assets, a potem uruchomić `node tools/build.cjs`. Nowy obraz powinien pokazywać tę samą planszę; jego proporcje mogą być inne.

Obraz podglądu ma `data-detail-src`; src jest ustawiany dopiero po otwarciu okna. Nie trzeba pobierać dużego pliku przy wejściu na stronę produktu. Przy błędzie zamknięcie i ponowne otwarcie ponawia wczytanie.

Obsługa: kursor i kółko myszy, suwak, przyciski plus/minus; dotyk i przesuwanie na telefonie. Klawiatura: Tab do planszy, strzałki do przesuwania lupy, plus/minus do zmiany skali, Escape do zamknięcia. Zakres 1,5–6× względem obrazu wyświetlanego w podglądzie. Powiększenie nie dodaje szczegółów, których nie ma w pliku źródłowym.

Implementacja: `product-zoom.js`, `product-zoom.css`, `productDetailPhoto` i `renderProduct` w `offer-templates.js`. Style i skrypt są dołączane tylko do stron produktów przez `tools/build.cjs`.
