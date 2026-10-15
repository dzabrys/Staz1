/* Reuses the configured contact endpoint. No request is sent before submission. */
(() => {
 const form=document.querySelector('.refreshed-contact .inquiry-form');if(!form)return;
 const status=form.querySelector('.inquiry-status'),button=form.querySelector('[type="submit"]');
 const params=new URLSearchParams(location.search),topic=(params.get('temat')||'').slice(0,180);
 const game=form.elements.namedItem('gra'),subject=form.elements.namedItem('subject'),kind=form.elements.namedItem('rodzaj_zapytania');
 const note=document.querySelector('.selected-inquiry');
 if(topic){game.value=topic;subject.value='Zapytanie o grę: '+topic;kind.value=params.get('rodzaj')==='custom'?'Gra na zamówienie':params.get('rodzaj')==='dobor'?'Pomoc w wyborze gry':'Wycena gotowej gry';if(note){note.hidden=false;note.querySelector('strong').textContent=topic}}
 if(params.get('rodzaj')==='custom')kind.value='Gra na zamówienie';
 const updateEmail=()=>{const title=game.value.trim();if(note){note.hidden=!title;note.querySelector('strong').textContent=title}for(const link of document.querySelectorAll('.inquiry-email'))link.href='mailto:biuro@wielkiegryplanszowe.pl?subject='+encodeURIComponent(title?'Zapytanie o grę: '+title:'Zapytanie o grę');};
 updateEmail();game.addEventListener('input',updateEmail);
 let sending=false;
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(sending||!form.reportValidity())return;
  sending=true;button.disabled=true;form.setAttribute('aria-busy','true');
  const label=button.innerHTML;button.textContent='Wysyłanie…';status.dataset.state='pending';status.textContent='Wysyłamy Twoją wiadomość…';
  const values=new FormData(form),value=key=>String(values.get(key)||'').trim();
  const lines=[['Gra / temat',value('gra')],['Rodzaj zapytania',value('rodzaj_zapytania')],['Imię',value('name')],['Organizacja',value('organizacja')],['E-mail',value('email')],['Telefon',value('telefon')],['Uczestnicy',value('grupa')],['Miejsce',value('miejsce')],['Termin',value('termin')],['Cel',value('cel')]].filter(([,v])=>v).map(([k,v])=>k+': '+v).join('\n');
  const payload=new FormData();payload.set('email',value('email'));payload.set('subject',value('gra')?'Zapytanie o grę: '+value('gra'):value('subject'));payload.set('message',lines+'\n\nWIADOMOŚĆ\n'+value('message'));payload.set('_gotcha',value('_gotcha'));
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),30000);
  try{
   const response=await fetch(form.action,{method:'POST',body:payload,headers:{Accept:'application/json'},signal:controller.signal});
   const data=await response.json().catch(()=>null);if(!response.ok||data?.ok===false)throw new Error('submission');
   form.reset();if(topic)game.value=topic;status.dataset.state='success';status.textContent='Dziękujemy! Wiadomość została przyjęta. Odpowiemy na podany adres e-mail.';
  }catch(error){status.dataset.state='error';status.textContent=error.name==='AbortError'?'Nie udało się potwierdzić wysyłki. Treść została w formularzu. Przed ponowną próbą sprawdź, czy wiadomość dotarła.':'Nie udało się potwierdzić przyjęcia wiadomości. Treść została w formularzu. Spróbuj później lub skorzystaj z linku „Napisz bezpośrednio”.';}
  finally{clearTimeout(timeout);sending=false;button.disabled=false;button.innerHTML=label;form.removeAttribute('aria-busy');status.focus();updateEmail()}
 });
})();
