import { createRemoteJWKSet, jwtVerify } from 'jose';

// This is a NEW Worker. Do not attach it to the existing push-notification Worker.
const SITES = new Set(['bmc', 'sierra']);
const MAX_JSON = 16_384;
const MAX_IMAGE = 5 * 1024 * 1024;
const CACHE = new Map();
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = (status, message) => { throw new HttpError(status, message); };
const now = () => new Date().toISOString();
const json = (data, status = 200, isPublic = false) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...(isPublic ? { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, HEAD' } : {})
  }
});
const siteFrom = (value) => SITES.has(value) ? value : fail(404, 'Unknown site.');
const string = (value, label, max = 250, optional = false) => {
  if (optional && (value == null || value === '')) return '';
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) fail(400, label + ' must contain 1–' + max + ' characters.');
  return value.trim();
};
async function bodyJSON(request) {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) fail(415, 'JSON required.');
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_JSON) fail(413, 'JSON payload too large.');
  const text = await request.text();
  if (text.length > MAX_JSON) fail(413, 'JSON payload too large.');
  try {
    const body = JSON.parse(text);
    if (!body || typeof body !== 'object' || Array.isArray(body)) fail(400, 'JSON object required.');
    return body;
  } catch (err) {
    if (err instanceof HttpError) throw err;
    fail(400, 'Invalid JSON.');
  }
}
function dateOnly(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(400, 'Use YYYY-MM-DD for date.');
  const parsed = new Date(value + 'T00:00:00Z');
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0,10) !== value) fail(400, 'Invalid date.');
  return value;
}
function clock(value, label, optional = false) {
  if (optional && (value == null || value === '')) return null;
  if (typeof value !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) fail(400, label + ' must be HH:MM in 24-hour time.');
  return value;
}
function showFields(raw, site) {
  const date = dateOnly(raw.date);
  const start_time = clock(raw.start_time, 'Start time');
  const end_time = clock(raw.end_time, 'End time', true);
  if (end_time && end_time <= start_time) fail(400, 'End time must be later than start time (same day).');
  const status = raw.status || 'draft';
  if (!['draft','published','cancelled'].includes(status)) fail(400, 'Invalid publication status.');
  return {
    date, start_time, end_time,
    title: string(raw.title, 'Artist or event title', 160),
    band_id: raw.band_id ? string(raw.band_id, 'Band ID', 80) : null,
    venue: raw.venue ? string(raw.venue, 'Venue', 180) : (site === 'bmc' ? 'Balcony Music Club' : ''),
    location: raw.location ? string(raw.location, 'Location', 180) : (site === 'bmc' ? 'New Orleans, LA' : ''),
    description: raw.description ? string(raw.description, 'Description', 1200) : '',
    is_headliner: raw.is_headliner === true ? 1 : 0,
    status
  };
}
function mustHaveBindings(env) {
  if (!env.DB || !env.PHOTOS) fail(503, 'Admin storage has not been configured.');
}
async function authenticate(request, env, site) {
  if (!env.ACCESS_ISSUER || !env.ACCESS_AUD || !env.ADMIN_HOST) fail(503, 'Access is not configured.');
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) fail(401, 'Sign in with Cloudflare Access.');
  let payload;
  try {
    const issuer = env.ACCESS_ISSUER.replace(/\/$/, '');
    if (!issuer.startsWith('https://') || !issuer.endsWith('.cloudflareaccess.com')) throw Error('Invalid issuer.');
    let keys = CACHE.get(issuer);
    if (!keys) {
      keys = createRemoteJWKSet(new URL(issuer + '/cdn-cgi/access/certs'));
      CACHE.set(issuer, keys);
    }
    ({ payload } = await jwtVerify(token, keys, {
      issuer,
      audience: env.ACCESS_AUD,
      algorithms: ['RS256']
    }));
  } catch {
    fail(401, 'Cloudflare Access session could not be verified.');
  }
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const allowlist = site === 'bmc' ? env.BMC_EDITORS : env.SIERRA_EDITORS;
  const allowed = (allowlist || '').split(',').map(x => x.trim().toLowerCase()).filter(Boolean);
  if (!email || !allowed.includes(email)) fail(403, 'Your account is not permitted to edit this site.');
  return email;
}
async function audit(env, site, actor, action, entity, id, before, after) {
  await env.DB.prepare('INSERT INTO audit_log (id,tenant,actor,action,entity,entity_id,before_json,after_json,created_at) VALUES (?,?,?,?,?,?,?,?,?)')
    .bind(crypto.randomUUID(), site, actor, action, entity, id,
      before ? JSON.stringify(before) : null, after ? JSON.stringify(after) : null, now()).run();
}
function photoResponse(object) {
  if (!object) return new Response('Not found', { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox"
    }
  });
}
async function publicAPI(request, env, site, parts) {
  mustHaveBindings(env);
  if (request.method !== 'GET') fail(405, 'Read-only feed.');
  if (parts[0] === 'shows' && parts.length === 1) {
    const rows = await env.DB.prepare(
      "SELECT s.*, b.photo_key AS band_photo, b.legacy_photo_url AS legacy_photo FROM shows s LEFT JOIN bands b ON s.tenant=b.tenant AND s.band_id=b.id WHERE s.tenant=? AND s.status='published' ORDER BY s.date,s.start_time"
    ).bind(site).all();
    const shows = (rows.results || []).map(s => ({
      id: s.id, date: s.date, start_time: s.start_time, end_time: s.end_time,
      title: s.title, venue: s.venue, location: s.location,
      description: s.description, is_headliner: !!s.is_headliner,
      photo: s.band_photo ? new URL('/api/public/' + site + '/photo/' + s.band_id, request.url).href : (s.legacy_photo || null)
    }));
    return json({ site, timezone: site === 'bmc' ? 'America/Chicago' : 'Venue local time', shows }, 200, true);
  }
  if (parts[0] === 'photo' && parts.length === 2) {
    const band = await env.DB.prepare('SELECT photo_key FROM bands WHERE tenant=? AND id=?').bind(site, parts[1]).first();
    const object = band?.photo_key ? await env.PHOTOS.get(band.photo_key) : null;
    const response = photoResponse(object);
    response.headers.set('Access-Control-Allow-Origin','*');
    return response;
  }
  fail(404, 'Not found.');
}
async function adminAPI(request, env, site, parts, actor) {
  const [collection, id, action] = parts;
  const method = request.method;
  if (collection === 'data' && parts.length === 1 && method === 'GET') {
    const [bands, shows] = await Promise.all([
      env.DB.prepare('SELECT * FROM bands WHERE tenant=? ORDER BY name').bind(site).all(),
      env.DB.prepare('SELECT * FROM shows WHERE tenant=? ORDER BY date DESC,start_time').bind(site).all()
    ]);
    return json({ site, actor, bands: bands.results || [], shows: shows.results || [] });
  }
  if (collection === 'audit' && parts.length === 1 && method === 'GET') {
    const result = await env.DB.prepare('SELECT id,actor,action,entity,entity_id,created_at FROM audit_log WHERE tenant=? ORDER BY created_at DESC LIMIT 100').bind(site).all();
    return json({ entries: result.results || [] });
  }
  if (collection === 'bands' && parts.length === 1 && method === 'POST') {
    const input = await bodyJSON(request);
    const record = { id: crypto.randomUUID(), tenant: site, name: string(input.name, 'Band name', 160), description: input.description ? string(input.description,'Description',400) : '' };
    const timestamp = now();
    const found = await env.DB.prepare('SELECT id FROM bands WHERE tenant=? AND lower(name)=lower(?)').bind(site, record.name).first();
    if (found) fail(409, 'This band already exists.');
    await env.DB.prepare('INSERT INTO bands(id,tenant,name,description,created_at,updated_at) VALUES(?,?,?,?,?,?)')
      .bind(record.id,site,record.name,record.description,timestamp,timestamp).run();
    await audit(env,site,actor,'create','band',record.id,null,record);
    return json(record,201);
  }
  if (collection === 'bands' && id && action === 'photo' && parts.length === 3 && method === 'PUT') {
    const band = await env.DB.prepare('SELECT * FROM bands WHERE tenant=? AND id=?').bind(site,id).first();
    if (!band) fail(404,'Band not found.');
    const length = Number(request.headers.get('content-length') || 0);
    if (length > MAX_IMAGE) fail(413,'Maximum image size is 5 MB.');
    const bytes = new Uint8Array(await request.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_IMAGE) fail(413,'Maximum image size is 5 MB.');
    let type, extension;
    if (bytes[0]===0xff && bytes[1]===0xd8 && bytes[2]===0xff) { type='image/jpeg';extension='jpg'; }
    else if (bytes[0]===0x89 && bytes[1]===0x50 && bytes[2]===0x4e && bytes[3]===0x47 && bytes[4]===0x0d && bytes[5]===0x0a && bytes[6]===0x1a && bytes[7]===0x0a) { type='image/png';extension='png'; }
    else if (bytes.length > 12 && String.fromCharCode(...bytes.slice(0,4))==='RIFF' && String.fromCharCode(...bytes.slice(8,12))==='WEBP') { type='image/webp';extension='webp'; }
    else fail(415,'Only JPEG, PNG or WebP files are accepted.');
    const key = site + '/' + id + '/' + crypto.randomUUID() + '.' + extension;
    await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: type } });
    await env.DB.prepare('UPDATE bands SET photo_key=?,photo_type=?,updated_at=? WHERE tenant=? AND id=?')
      .bind(key,type,now(),site,id).run();
    await audit(env,site,actor,'upload-photo','band',id,{ photo_key: band.photo_key },{ photo_key:key });
    return json({ ok:true, band_id:id, photo:'/api/public/'+site+'/photo/'+id });
  }
  if (collection === 'shows' && parts.length === 1 && method === 'POST') {
    const payload = showFields(await bodyJSON(request),site);
    if (payload.band_id) {
      const exists = await env.DB.prepare('SELECT id FROM bands WHERE tenant=? AND id=?').bind(site,payload.band_id).first();
      if (!exists) fail(400,'Select a band from this site.');
    }
    const id = crypto.randomUUID(), timestamp=now();
    await env.DB.prepare(
      'INSERT INTO shows(id,tenant,date,start_time,end_time,title,band_id,venue,location,description,is_headliner,status,version,created_at,updated_at,updated_by) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?)'
    ).bind(id,site,payload.date,payload.start_time,payload.end_time,payload.title,payload.band_id,payload.venue,payload.location,payload.description,payload.is_headliner,payload.status,timestamp,timestamp,actor).run();
    await audit(env,site,actor,'create','show',id,null,payload);
    return json({ id,version:1,...payload },201);
  }
  if (collection === 'shows' && id && parts.length === 2 && method === 'PUT') {
    const input = await bodyJSON(request);
    const before = await env.DB.prepare('SELECT * FROM shows WHERE tenant=? AND id=?').bind(site,id).first();
    if (!before) fail(404,'Show not found.');
    if (!Number.isInteger(input.version) || input.version !== before.version) fail(409,'Someone changed this show. Reload and try again.');
    const payload=showFields(input,site);
    if (payload.band_id) {
      const exists = await env.DB.prepare('SELECT id FROM bands WHERE tenant=? AND id=?').bind(site,payload.band_id).first();
      if (!exists) fail(400,'Select a band from this site.');
    }
    const result=await env.DB.prepare(
      'UPDATE shows SET date=?,start_time=?,end_time=?,title=?,band_id=?,venue=?,location=?,description=?,is_headliner=?,status=?,version=version+1,updated_at=?,updated_by=? WHERE tenant=? AND id=? AND version=?'
    ).bind(payload.date,payload.start_time,payload.end_time,payload.title,payload.band_id,payload.venue,payload.location,payload.description,payload.is_headliner,payload.status,now(),actor,site,id,before.version).run();
    if (!result.meta?.changes) fail(409,'This show changed. Reload and try again.');
    await audit(env,site,actor,'update','show',id,before,payload);
    return json({ id,version:before.version+1,...payload });
  }
  if (collection === 'shows' && id && parts.length === 2 && method === 'DELETE') {
    const before=await env.DB.prepare('SELECT * FROM shows WHERE tenant=? AND id=?').bind(site,id).first();
    if (!before) fail(404,'Show not found.');
    await env.DB.prepare("UPDATE shows SET status='cancelled',version=version+1,updated_at=?,updated_by=? WHERE tenant=? AND id=?")
      .bind(now(),actor,site,id).run();
    await audit(env,site,actor,'cancel','show',id,before,{ status:'cancelled' });
    return json({ ok:true,id });
  }
  fail(404,'Not found.');
}
export default {
  async fetch(request,env) {
    try {
      const url=new URL(request.url);
      const parts=url.pathname.split('/').filter(Boolean);
      if (parts[0]==='api' && parts[1]==='public' && parts.length>=4) {
        const site=siteFrom(parts[2]);
        return await publicAPI(request,env,site,parts.slice(3));
      }
      if (!env.ADMIN_HOST || url.host.toLowerCase()!==env.ADMIN_HOST.toLowerCase()) fail(404,'Not found.');
      if (parts[0]==='api' && parts[1]==='admin' && parts.length>=4) {
        const site=siteFrom(parts[2]);
        const actor=await authenticate(request,env,site);
        mustHaveBindings(env);
        if (!['GET','POST','PUT','DELETE'].includes(request.method)) fail(405,'Method not allowed.');
        if (request.method!=='GET' && request.headers.get('Origin')!==url.origin) fail(403,'Cross-origin modifications are prohibited.');
        return await adminAPI(request,env,site,parts.slice(3),actor);
      }
      if (request.method!=='GET' && request.method!=='HEAD') fail(405,'Method not allowed.');
      if (url.pathname==='/') return Response.redirect(url.origin+'/bmc.html',302);
      const response=await env.ASSETS.fetch(request);
      const headers=new Headers(response.headers);
      headers.set('X-Content-Type-Options','nosniff');
      headers.set('Referrer-Policy','no-referrer');
      headers.set('Content-Security-Policy',"default-src 'self'; img-src 'self' data: https://shows.balconymusicclub.com; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'");
      return new Response(response.body,{ status:response.status,headers });
    } catch(err) {
      if (err instanceof HttpError) return json({ error:err.message },err.status);
      console.error('Content Admin unexpected error',err);
      return json({ error:'Internal error. No change has been published.' },500);
    }
  }
};
