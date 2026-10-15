# Wariant kontaktu 3

Adres: https://dzabrys.github.io/Staz1/3/

Strona Kontakt z formularzem zapytania o gry, wysyłką przez Formspree bez przekierowania i potwierdzeniem na stronie. Powiadomienie e-mail zawiera zwarte podsumowanie zamiast osobnego bloku dla każdego pola. Adres klienta pozostaje adresem do odpowiedzi.

Generator: `node tools/build-contact-alternative.cjs`. Źródła formularza: `test-formularzy/formularz-kontaktowy.html`, `.css` i `.js`. Generator kopiuje CSS i JS do katalogu 3, nadaje wersje zasobom i dodaje formularz do aktualnej strony Kontakt. Wariant używa wspólnych zasobów witryny i ma noindex,follow.
