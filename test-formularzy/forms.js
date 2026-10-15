const endpoint = document.querySelector('#fs-endpoint');
endpoint.addEventListener('input', () => endpoint.setCustomValidity(''));
document.querySelector('#formspree').addEventListener('submit', event => {
  const value = endpoint.value.trim();
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(value)) {
    event.preventDefault();
    endpoint.setCustomValidity('Wklej endpoint w formacie https://formspree.io/f/ID_FORMULARZA');
    endpoint.reportValidity();
    return;
  }
  event.currentTarget.action = value;
});
const key = document.querySelector('#sf-key');
key.addEventListener('input', () => key.setCustomValidity(''));
document.querySelector('#staticforms').addEventListener('submit', event => {
  const value = key.value.trim();
  if (!value || /\s/.test(value)) {
    event.preventDefault();
    key.setCustomValidity('Wklej sam klucz formularza, bez spacji.');
    key.reportValidity();
    return;
  }
  event.currentTarget.action = `https://api.staticforms.dev/submit/${encodeURIComponent(value)}`;
});
