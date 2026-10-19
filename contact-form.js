document.documentElement.classList.add('js');
(() => {
  const init = () => {
    const form = document.querySelector('#formularz-kontaktowy .contact-form');
    if (!form) return;

    const game = form.elements.namedItem('gra');
    const topic = new URLSearchParams(location.search).get('temat');
    if (topic && game) game.value = topic.slice(0, 180);

    const status = form.querySelector('.contact-form-status');
    const submit = form.querySelector('[type="submit"]');
    let sending = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending || !form.reportValidity()) return;
      sending = true;
      submit.disabled = true;
      form.setAttribute('aria-busy', 'true');
      const original = submit.innerHTML;
      submit.textContent = 'Wysyłanie…';
      status.dataset.state = 'pending';
      status.textContent = 'Wysyłamy Twoje zapytanie…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      try {
        const fields = new FormData(form);
        const value = key => String(fields.get(key) || '').trim();
        const rows = [
          `Rodzaj zapytania: ${value('rodzaj_zapytania')}`,
          `Gra lub pomysł: ${value('gra')}`,
          `Osoba: ${value('name')}`,
          value('organizacja') && `Organizacja: ${value('organizacja')}`,
          `E-mail: ${value('email')}`,
          value('telefon') && `Telefon: ${value('telefon')}`,
          value('grupa') && `Grupa: ${value('grupa')}`,
          value('miejsce') && `Miejsce: ${value('miejsce')}`,
          value('termin') && `Termin: ${value('termin').split('-').reverse().join('.')}`,
          '',
          value('message'),
        ].filter(row => row !== false).join('\n');
        const payload = new FormData();
        payload.set('email', value('email'));
        payload.set('subject', `[${value('rodzaj_zapytania')}] ${value('gra')}`.slice(0, 400));
        payload.set('message', rows);
        payload.set('_gotcha', value('_gotcha'));
        const response = await fetch(form.action, {method:'POST', body:payload, headers:{Accept:'application/json'}, signal:controller.signal});
        const result = await response.json().catch(() => null);
        if (!response.ok || result?.ok === false) throw Object.assign(new Error('submission'), {status:response.status});
        form.reset();
        status.dataset.state = 'success';
        status.textContent = 'Dziękujemy! Zapytanie zostało wysłane. Odpowiemy na podany adres e-mail.';
      } catch (error) {
        status.dataset.state = 'error';
        status.textContent = error.name === 'AbortError'
          ? 'Wysyłka trwała zbyt długo. Dane zostały w formularzu — spróbuj ponownie lub napisz bezpośrednio na biuro@wielkiegryplanszowe.pl.'
          : 'Nie udało się wysłać formularza. Spróbuj ponownie lub napisz na biuro@wielkiegryplanszowe.pl.';
      } finally {
        clearTimeout(timeout);
        sending = false;
        submit.disabled = false;
        submit.innerHTML = original;
        form.removeAttribute('aria-busy');
        status.focus();
      }
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

