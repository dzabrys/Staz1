(() => {
  const form = document.querySelector('.inquiry-form');
  if (!form) return;
  const status = form.querySelector('.inquiry-status');
  const button = form.querySelector('[type="submit"]');
  const game = form.elements.namedItem('gra');
  const topic = new URLSearchParams(location.search).get('temat');
  if (topic) {
    game.value = topic.slice(0, 180);
    form.elements.namedItem('subject').value = `Zapytanie o grę: ${topic}`.slice(0, 200);
  }
  let sending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    sending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    const label = button.innerHTML;
    button.textContent = 'Wysyłanie…';
    status.dataset.state = 'pending';
    status.textContent = 'Wysyłamy Twoje zapytanie…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const fields = new FormData(form);
      const value = key => String(fields.get(key) || '').trim();
      const line = (label, key) => value(key) ? `${label}: ${value(key)}` : '';
      const date = value('termin');
      const formattedDate = /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? date.split('-').reverse().join('.') : date;
      const sections = [
        ['ZAPYTANIE', line('Gra', 'gra'), line('Sprawa', 'rodzaj_zapytania'), line('Temat', 'subject')],
        ['KONTAKT', [value('name'), value('organizacja')].filter(Boolean).join(' · '),
          [value('email'), value('telefon')].filter(Boolean).join(' · ')],
        ['WYDARZENIE / GRUPA', line('Uczestnicy', 'grupa'),
          [value('miejsce'), formattedDate].filter(Boolean).join(' · '), line('Cel', 'cel')],
        ['WIADOMOŚĆ', value('message')],
      ];
      const summary = sections
        .map(section => section.filter(Boolean))
        .filter(section => section.length > 1)
        .map(section => section.join('\n'))
        .join('\n\n');
      // Send a compact summary instead of a separate email block for every input.
      // Keep email as a special field so the recipient can use Reply.
      const payload = new FormData();
      payload.set('email', value('email'));
      payload.set('subject', `[${value('gra')}] ${value('subject')}`.slice(0, 400));
      payload.set('message', summary);
      payload.set('_gotcha', value('_gotcha'));
      const response = await fetch(form.action, {
        method: 'POST', body: payload,
        headers: { Accept: 'application/json' }, signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok === false) {
        const error = new Error('submission');
        error.status = response.status;
        throw error;
      }
      form.reset();
      status.dataset.state = 'success';
      status.textContent = 'Dziękujemy! Twoje zapytanie zostało przyjęte. Odpowiemy na podany adres e-mail.';
    } catch (error) {
      status.dataset.state = 'error';
      status.textContent = error.name === 'AbortError'
        ? 'Nie udało się potwierdzić wysyłki w wyznaczonym czasie. Twoje dane pozostały w formularzu. Przed ponowną próbą sprawdź, czy zapytanie dotarło.'
        : error.status === 429
          ? 'Usługa chwilowo nie przyjmuje kolejnych zgłoszeń. Spróbuj później lub napisz na biuro@wielkiegryplanszowe.pl. Twoje dane pozostały w formularzu.'
          : 'Nie udało się potwierdzić przyjęcia zapytania. Sprawdź połączenie i spróbuj ponownie lub napisz na biuro@wielkiegryplanszowe.pl. Twoje dane pozostały w formularzu.';
    } finally {
      clearTimeout(timeout);
      sending = false;
      button.disabled = false;
      button.innerHTML = label;
      form.removeAttribute('aria-busy');
      status.focus();
    }
  });
})();
