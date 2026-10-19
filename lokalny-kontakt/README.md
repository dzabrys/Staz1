# Lokalny wariant kontaktu

Podgląd: http://127.0.0.1:4175/lokalny-kontakt/

Ta kopia zawiera formularz i ostatni wygląd kontaktu sprzed przywrócenia publicznej strony. Edytuj index.html, contact-form.css i contact-form.js tutaj. Zasoby wspólne (logo, fonty, obrazy) są pobierane z folderu nadrzędnego. Folder jest zapisany na gałęzi roboczej GitHub, bez wdrożenia na publiczną stronę.

Start podglądu z katalogu projektu: `node lokalny-kontakt/server.cjs`. Formularz nadal wysyła prawdziwe zgłoszenia do https://formspree.io/f/mgaoqqpd po kliknięciu Wyślij zapytanie.

Aktualny start serwera lokalnego: `node lokalny-kontakt/server.cjs`. Ten serwer podmienia lokalnie /kontakt.html na wariant z tego folderu, a /gry-na-zamowienie.html na projekt z lokalne-zamowienia/. Reszta serwisu działa pod http://127.0.0.1:4175/. Pliki produkcyjne pozostają bez zmian. Instrukcja przeniesienia projektu: ../LOKALNE-ZMIANY.md.
