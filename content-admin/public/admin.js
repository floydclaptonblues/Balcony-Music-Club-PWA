(() => {
'use strict';
const site = document.body.dataset.site;
if (!['bmc','sierra'].includes(site)) return;
const api = '/api/admin/' + site;
const $ = selector => document.querySelector(selector);
const state = { bands: [], shows: [], closures: [] };
const showForm = $('#show-form');
const bandForm = $('#band-form');
const photoForm = $('#photo-form');
const closureForm = $('#closure-form');
const status = $('#status');
const field = (form, name) => form.elements.namedItem(name);
const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = String(text);
  return node;
};
function message(text, error = false) {
  status.className = error ? 'error' : '';
  status.textContent = text;
}
async function call(path, options = {}) {
  const response = await fetch(api + path, { credentials: 'same-origin', cache: 'no-store', ...options });
  let value;
  try { value = await response.json(); } catch { throw Error('Unable to contact the admin service. Check your Cloudflare Access session.'); }
  if (!response.ok) throw Error(value.error || 'Request failed.');
  return value;
}
function clearShow() {
  showForm.reset();
  field(showForm,'id').value = '';
  field(showForm,'version').value = '';
  field(showForm,'venue').value = site === 'bmc' ? 'Balcony Music Club' : '';
  field(showForm,'location').value = site === 'bmc' ? 'New Orleans, LA' : '';
  field(showForm,'status').value = 'draft';
  $('#save-show').textContent = 'Save performance';
}
function setShow(show, duplicate = false) {
  clearShow();
  for (const key of ['date','start_time','end_time','title','band_id','venue','location','description','status']) {
    field(showForm,key).value = show[key] || '';
  }
  field(showForm,'is_headliner').checked = !!show.is_headliner;
  if (!duplicate) {
    field(showForm,'id').value = show.id;
    field(showForm,'version').value = show.version;
    $('#save-show').textContent = 'Update performance';
  } else {
    field(showForm,'date').value = '';
    field(showForm,'status').value = 'draft';
    message('Copied show details. Set a new date and save the new performance.');
  }
  showForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function button(text, handler, muted = true) {
  const b = el('button', muted ? 'muted' : '', text);
  b.type = 'button';
  b.addEventListener('click', handler);
  return b;
}
function timeLabel(value) {
  if (!value) return '';
  const [h, m] = value.split(':').map(Number);
  return String(h % 12 || 12) + ':' + String(m).padStart(2,'0') + (h >= 12 ? ' PM' : ' AM');
}
function renderBands() {
  const selects = [field(showForm,'band_id'),field(photoForm,'band_id')];
  for (const select of selects) {
    const previous = select.value;
    select.replaceChildren();
    select.appendChild(new Option(select===selects[0] ? 'No band profile' : 'Choose a band',''));
    for (const band of state.bands) select.appendChild(new Option(band.name,band.id));
    if (state.bands.some(b => b.id===previous)) select.value = previous;
  }
  const list = $('#band-list');
  list.replaceChildren();
  if (!state.bands.length) { list.appendChild(el('p','', 'No band profiles yet. Create one above.')); return; }
  for (const band of state.bands) {
    const row = el('div','band-row');
    if (band.photo_key || band.legacy_photo_url) {
      const img = el('img');
      img.src = band.photo_key ? '/api/public/' + site + '/photo/' + encodeURIComponent(band.id) : band.legacy_photo_url;
      img.alt = band.name + ' promotional photo';
      img.loading = 'lazy';
      row.appendChild(img);
    }
    const label = el('div');
    label.appendChild(el('strong','',band.name));
    label.appendChild(el('small','',band.photo_key ? 'Uploaded photo saved' : (band.legacy_photo_url ? 'Existing website photo linked' : 'No photo yet')));
    row.appendChild(label);
    row.appendChild(button('Select photo',() => {
      field(photoForm,'band_id').value = band.id;
      field(photoForm,'photo').focus();
    }));
    list.appendChild(row);
  }
}
function renderClosures() {
  const list = $('#closure-list'); list.replaceChildren();
  if (!state.closures.length) { list.appendChild(el('p','', 'No venue closures recorded.')); return; }
  for (const closure of state.closures) {
    const row = el('div','show-row');
    const details = el('div','detail');
    details.appendChild(el('strong','',closure.date));
    details.appendChild(el('small','',closure.notice));
    row.appendChild(details);
    row.appendChild(button('Edit', () => {
      field(closureForm,'date').value=closure.date;
      field(closureForm,'notice').value=closure.notice;
      closureForm.scrollIntoView({behavior:'smooth',block:'start'});
    }));
    row.appendChild(button('Remove',async () => {
      if (!confirm('Remove closure notice for '+closure.date+'?')) return;
      try { await call('/closures/'+encodeURIComponent(closure.id),{method:'DELETE'}); await load(); }
      catch(err) { message(err.message,true); }
    }));
    list.appendChild(row);
  }
}
function renderShows() {
  const list = $('#show-list');
  list.replaceChildren();
  const shows = [...state.shows].sort((a,b) => b.date.localeCompare(a.date) || b.start_time.localeCompare(a.start_time));
  if (!shows.length) { list.appendChild(el('p','', 'No events yet. You can create one above; existing website content has not been imported into this database.')); return; }
  for (const show of shows) {
    const row = el('article','show-row');
    const detail = el('div','detail');
    detail.appendChild(el('small','',show.date + ' · ' + timeLabel(show.start_time) + (show.end_time ? ' – ' + timeLabel(show.end_time) : '')));
    detail.appendChild(el('strong','',show.title));
    detail.appendChild(el('small','',(show.venue || '') + (show.location ? ' · '+show.location : '')));
    row.appendChild(detail);
    row.appendChild(el('span','tag '+show.status,show.status));
    const actions = el('div','row-actions');
    actions.appendChild(button('Edit',() => setShow(show)));
    actions.appendChild(button('Copy',() => setShow(show,true)));
    if (show.status!=='cancelled') actions.appendChild(button('Cancel show',async () => {
      if (!confirm('Cancel '+show.title+' on '+show.date+'? This removes it from the public feed but preserves history.')) return;
      try { await call('/shows/'+encodeURIComponent(show.id),{ method:'DELETE' }); await load(); message('Show cancelled.'); }
      catch(err) { message(err.message,true); }
    }));
    row.appendChild(actions);
    list.appendChild(row);
  }
}
async function load() {
  try {
    const data = await call('/data');
    state.bands=data.bands || [];
    state.shows=data.shows || [];
    state.closures=data.closures || [];
    renderBands(); renderShows(); renderClosures();
    message('Connected as '+data.actor+'. Changes are scoped to '+(site==='bmc'?'BMC':'Sierra')+'.');
  } catch(err) { message(err.message,true); }
}
async function history() {
  try {
    const data = await call('/audit');
    const list = $('#history'); list.replaceChildren();
    if (!data.entries.length) { list.appendChild(el('p','', 'No changes recorded yet.')); return; }
    for (const entry of data.entries) {
      const row=el('div','history-row');
      row.appendChild(el('span','',entry.action+' · '+entry.entity));
      row.appendChild(el('small','',entry.actor+' · '+entry.created_at));
      list.appendChild(row);
    }
  } catch(err) { message(err.message,true); }
}
closureForm.addEventListener('submit',async event => {
  event.preventDefault();
  const payload = {date:field(closureForm,'date').value,notice:field(closureForm,'notice').value};
  try {
    await call('/closures',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    closureForm.reset(); await load(); message('Closure notice saved.');
  } catch(err) { message(err.message,true); }
});
showForm.addEventListener('submit',async event => {
  event.preventDefault();
  const payload = {};
  for (const key of ['date','start_time','end_time','title','band_id','venue','location','description','status']) payload[key]=field(showForm,key).value;
  payload.is_headliner=field(showForm,'is_headliner').checked;
  const id=field(showForm,'id').value;
  if (id) payload.version=Number(field(showForm,'version').value);
  if (payload.status==='published' && !confirm('Publish '+payload.title+' on '+payload.date+' to the content feed?')) return;
  try {
    await call(id ? '/shows/'+encodeURIComponent(id) : '/shows', {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    clearShow(); await load(); message('Performance saved.');
  } catch(err) { message(err.message,true); }
});
bandForm.addEventListener('submit',async event => {
  event.preventDefault();
  try {
    await call('/bands',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:field(bandForm,'name').value})});
    bandForm.reset(); await load(); message('Band added.');
  } catch(err) { message(err.message,true); }
});
photoForm.addEventListener('submit',async event => {
  event.preventDefault();
  const file=field(photoForm,'photo').files?.[0];
  const band=field(photoForm,'band_id').value;
  if (!file || !band) return message('Choose a band and image first.',true);
  if (file.size>5*1024*1024) return message('Maximum photo size is 5 MB.',true);
  try {
    await call('/bands/'+encodeURIComponent(band)+'/photo',{
      method:'PUT',
      headers:{'Content-Type':file.type},
      body:file
    });
    photoForm.reset(); await load(); message('Band photograph uploaded.');
  } catch(err) { message(err.message,true); }
});
$('#reset-show').addEventListener('click',clearShow);
$('#cancel-edit').addEventListener('click',clearShow);
$('#reload').addEventListener('click',load);
$('#reload-history').addEventListener('click',history);
clearShow(); load();
})();
