document.documentElement.classList.add('js');
(() => {
  const init = () => {
    const trigger = document.querySelector('.contact-form-trigger');
    const shell = document.querySelector('#formularz-kontaktowy');
    const close = shell?.querySelector('.contact-form-close');
    const heading = shell?.querySelector('h2');
    const form = shell?.querySelector('.contact-form');
    if (!trigger || !shell || !close || !form) return;
    document.documentElement.classList.add('contact-form-ready');

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let closeTimer;
    const setOpen = (open, moveFocus = true) => {
      clearTimeout(closeTimer);
      shell.classList.toggle('is-open', open);
      shell.setAttribute('aria-hidden', String(!open));
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        shell.removeAttribute('inert');
        history.replaceState(null, '', '#formularz-kontaktowy');
        requestAnimationFrame(() => {
          shell.scrollIntoView({behavior: reduced.matches ? 'auto' : 'smooth', block: 'start'});
          if (moveFocus) setTimeout(() => heading?.focus({preventScroll:true}), reduced.matches ? 0 : 420);
        });
      } else {
        closeTimer = setTimeout(() => shell.setAttribute('inert', ''), reduced.matches ? 0 : 650);
        if (location.hash === '#formularz-kontaktowy') history.replaceState(null, '', location.pathname + location.search);
        if (moveFocus) trigger.focus({preventScroll:true});
      }
    };

    const startsOpen = location.hash === '#formularz-kontaktowy';
    shell.setAttribute('aria-hidden', String(!startsOpen));
    trigger.setAttribute('aria-expanded', String(startsOpen));
    if (startsOpen) shell.classList.add('is-open'); else shell.setAttribute('inert', '');
    heading?.setAttribute('tabindex', '-1');

    trigger.addEventListener('click', event => {
      event.preventDefault();
      setOpen(trigger.getAttribute('aria-expanded') !== 'true');
    });
    close.addEventListener('click', () => setOpen(false));
    shell.addEventListener('keydown', event => {
      if (event.key === 'Escape') setOpen(false);
    });

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

