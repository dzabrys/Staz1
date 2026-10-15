# Formularz kontaktowy

Podgląd publiczny: https://dzabrys.github.io/Staz1/test-formularzy/kontakt-podglad.html
Podgląd lokalny: http://127.0.0.1:4175/Staz1/test-formularzy/kontakt-podglad.html

Formularz korzysta z endpointu https://formspree.io/f/myekbjrg podanego do testów. Odbiorcę i ustawienia ochrony antyspamowej konfiguruje się w panelu tego formularza Formspree.

Aby umieścić go w docelowej stronie Kontakt:

1. Wklej zawartość `formularz-kontaktowy.html` w wybrane miejsce wewnątrz elementu main.
2. Dołącz arkusz: `<link rel="stylesheet" href="test-formularzy/formularz-kontaktowy.css">`.
3. Dołącz skrypt: `<script src="test-formularzy/formularz-kontaktowy.js" defer></script>`.
4. Uzupełnij stronę o docelową informację o przetwarzaniu danych i odpowiedni odnośnik, zgodnie z zasadami właściciela strony.

Wysyłka używa fetch z nagłówkiem Accept: application/json. Nie ma przekierowania. Potwierdzenie pojawia się dopiero po odpowiedzi sukcesu z Formspree. Błędy pozostawiają wpisane dane. Przy aktywnej CAPTCHA dopasuj jej integrację do ustawień formularza; obecny szablon nie zawiera widgetu CAPTCHA.

Treść powiadomienia jest scalana przed wysłaniem w jedno podsumowanie: Zapytanie, Kontakt, Wydarzenie / grupa i Wiadomość. Puste informacje opcjonalne są pomijane. Do Formspree trafiają tylko email (adres do odpowiedzi), subject (tytuł gry i temat), message (całe podsumowanie) i _gotcha (ochrona antyspamowa). Usuwa to osobne bloki dla każdego pola w domyślnym mailu. Indywidualne pola są od tej pory zapisane w treści message, a nie jako osobne kolumny w panelu lub eksporcie Formspree. Zewnętrzny szablon, odstępy i stopka usługi pozostają kontrolowane przez Formspree; finalny wygląd należy sprawdzić na odebranym mailu.

Parametr `?temat=Skarb%20piratów` automatycznie wypełnia tytuł gry i temat wiadomości. Obecne linki ze strony gier mogą korzystać z tego samego parametru po osadzeniu formularza na stronie Kontakt.

Generowanie podglądu po zmianach: `node test-formularzy/build-contact-example.cjs`.
Uruchomienie lokalnej strony: `node tools/serve.cjs`.
