const PUSH_SCOPE = '/push-alerts/';
const PUSH_WORKER = '/push-sw.js';
const PUSH_CONFIG = '/push-config.js';
const DAYS = ['wed', 'thu', 'fri', 'sat', 'sun'];
const PLACEHOLDER = /(?:replace|your[-_ ]|example|<|>|%VITE_)/i;

let status;
let button;
let hint;
let resetButton;

function ensureNotifyPanel() {
  const main = document.querySelector('main') || document.body;
  let notify = document.getElementById('notify');

  if (!notify) {
    notify = document.createElement('section');
    notify.id = 'notify';
    notify.className = 'panel';
    notify.innerHTML = `
      <span class="ribbon">Show Alerts</span>
      <h2>Get BMC Alerts</h2>
      <article class="card">
        <p>Tap Enable Show Alerts below. Your browser will ask for notification permission before BMC can send Wed–Sun show announcements to this device.</p>
        <button id="enableShowAlerts" class="button primary" type="button">Enable Show Alerts</button>
        <p id="pushAlertStatus" class="note" aria-live="polite">Checking show-alert status…</p>
        <div class="card" aria-label="Alert topics">
          <h3>Alert Topics</h3>
          <ul>
            <li>Tonight’s BMC show announcements</li>
            <li>Wed–Sun schedule reminders</li>
            <li>Special event notices when approved</li>
          </ul>
        </div>
        <p id="pushInstallHint" class="note" hidden>On iPhone/iPad, install this app to the Home Screen before enabling push alerts.</p>
      </article>
    `;
    const schedule = document.getElementById('schedule');
    if (schedule && schedule.parentElement) schedule.parentElement.insertBefore(notify, schedule);
    else main.appendChild(notify);
  }

  const schedule = document.getElementById('schedule');
  if (schedule && notify.parentElement === schedule.parentElement && notify.nextElementSibling !== schedule) {
    schedule.parentElement.insertBefore(notify, schedule);
  }

  const heading = notify.querySelector('h2');
  if (heading) heading.textContent = 'Get BMC Alerts';

  const intro = notify.querySelector('article.card > p');
  if (intro) {
    intro.textContent = 'Tap Enable Show Alerts below. Your browser will ask for notification permission before BMC can send Wed–Sun show announcements to this device.';
  }

  if (!document.getElementById('enableShowAlerts')) {
    const card = notify.querySelector('.card') || notify;
    const enable = document.createElement('button');
    enable.id = 'enableShowAlerts';
    enable.className = 'button primary';
    enable.type = 'button';
    enable.textContent = 'Enable Show Alerts';
    card.insertBefore(enable, card.firstChild);
  }

  if (!document.getElementById('pushAlertStatus')) {
    const note = document.createElement('p');
    note.id = 'pushAlertStatus';
    note.className = 'note';
    note.setAttribute('aria-live', 'polite');
    note.textContent = 'Checking show-alert status…';
    const enable = document.getElementById('enableShowAlerts');
    enable?.insertAdjacentElement('afterend', note);
  }

  status = document.getElementById('pushAlertStatus');
  button = document.getElementById('enableShowAlerts');
  hint = document.getElementById('pushInstallHint');
}

function setStatus(message) {
  if (status) status.textContent = message;
  console.log('[BMC push]', message);
}

function configured(value) {
  return typeof value === 'string' && value.trim() && !PLACEHOLDER.test(value) ? value.trim() : '';
}

function hasPushSupport() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function urlBase64ToUint8Array(value) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from([...atob(base64)].map((character) => character.charCodeAt(0)));
}

function addResetButton() {
  if (!button) return undefined;
  let reset = document.getElementById('resetShowAlerts');
  if (reset) return reset;

  reset = document.createElement('button');
  reset.id = 'resetShowAlerts';
  reset.type = 'button';
  reset.className = 'button ghost';
  reset.textContent = 'Reset Alerts';
  reset.hidden = true;
  button.insertAdjacentText('afterend', ' ');
  button.insertAdjacentElement('afterend', reset);
  return reset;
}

function setSubscriptionUi(subscribed) {
  if (button) {
    button.disabled = subscribed;
    button.textContent = subscribed ? 'Show Alerts Enabled' : 'Enable Show Alerts';
  }
  if (resetButton) resetButton.hidden = !subscribed;
}

function currentConfig() {
  const config = window.BMC_PUSH_CONFIG || {};
  const api = configured(config.apiUrl).replace(/\/$/, '');
  const key = configured(config.vapidPublicKey);
  return api && key ? { api, key } : undefined;
}

function loadPushConfig() {
  return new Promise((resolve, reject) => {
    const old = document.querySelector('script[data-bmc-push-config]');
    if (old) old.remove();
    const script = document.createElement('script');
    script.dataset.bmcPushConfig = 'true';
    script.src = PUSH_CONFIG + '?v=' + Date.now();
    script.onload = () => {
      const config = currentConfig();
      if (config) resolve(config);
      else reject(new Error('Show alerts are not configured. The public Worker URL or VAPID public key is missing.'));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error('Could not load /push-config.js. Refresh the app and try again.'));
    };
    document.head.appendChild(script);
  });
}

async function getPushRegistration() {
  return navigator.serviceWorker.getRegistration(PUSH_SCOPE);
}

async function workerError(response) {
  const text = await response.text().catch(() => '');
  try {
    const body = JSON.parse(text);
    const detail = typeof body?.error === 'string' ? ': ' + body.error : '';
    return 'HTTP ' + response.status + detail;
  } catch {
    return 'HTTP ' + response.status + (text ? ': ' + text.slice(0, 180) : '');
  }
}

async function saveSubscription(config, subscription) {
  const payload = {
    subscription: subscription.toJSON(),
    preferences: { shows: true, days: DAYS },
  };
  console.log('[BMC push] saving subscription payload', {
    endpoint: payload.subscription?.endpoint,
    hasP256dh: Boolean(payload.subscription?.keys?.p256dh),
    hasAuth: Boolean(payload.subscription?.keys?.auth),
  });

  let response;
  try {
    response = await fetch(config.api + '/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('[BMC push] subscribe fetch failed', error);
    throw new Error('Could not reach the BMC alerts service. Check the connection and try again.');
  }

  if (!response.ok) {
    throw new Error('The BMC alerts service rejected the subscription (' + await workerError(response) + ').');
  }

  const responseText = await response.text().catch(() => '');
  console.log('[BMC push] Worker subscribe accepted', responseText);
}

async function refreshPushUi() {
  if (!button) return;
  if (!hasPushSupport()) {
    setSubscriptionUi(false);
    button.disabled = true;
    setStatus('This browser does not support web push notifications.');
    return;
  }

  try {
    const registration = await getPushRegistration();
    const subscription = registration ? await registration.pushManager.getSubscription() : null;
    if (subscription) {
      setSubscriptionUi(true);
      setStatus('Verifying show alerts with the BMC alerts service…');
      try {
        const config = await loadPushConfig();
        await saveSubscription(config, subscription);
        localStorage.setItem('bmc-push-subscribed', 'true');
        setStatus('Show alerts are enabled and synced for this device.');
      } catch (error) {
        localStorage.removeItem('bmc-push-subscribed');
        setSubscriptionUi(false);
        setStatus(error instanceof Error
          ? error.message + ' Press Enable Show Alerts to create a fresh subscription.'
          : 'Show alerts could not sync with the BMC alerts service. Press Enable Show Alerts to try again.');
      }
      return;
    }
  } catch (error) {
    console.error('[BMC push] verify failed', error);
    setStatus('Could not verify the current show-alert subscription. Please try enabling alerts again.');
  }

  localStorage.removeItem('bmc-push-subscribed');
  setSubscriptionUi(false);
  if (Notification.permission === 'denied') {
    setStatus('Notifications are blocked for this browser. Enable them in browser or device settings to receive BMC show alerts.');
  } else {
    setStatus('Show alerts are available on supported browsers.');
  }
}

async function enableShowAlerts() {
  if (!button || !hasPushSupport()) {
    setStatus('This browser does not support web push notifications.');
    return;
  }

  button.disabled = true;
  button.textContent = 'Enabling…';
  setStatus('Loading show-alert configuration…');

  try {
    const config = await loadPushConfig();
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error(permission === 'denied'
        ? 'Notifications are blocked in browser/device settings.'
        : 'Notification permission was not granted.');
    }

    const registration = await navigator.serviceWorker.register(
      PUSH_WORKER + '?api=' + encodeURIComponent(config.api) + '&v=' + Date.now(),
      { scope: PUSH_SCOPE },
    );
    await navigator.serviceWorker.ready.catch(() => undefined);
    const existing = await registration.pushManager.getSubscription();
    if (existing) await existing.unsubscribe();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.key),
    });

    await saveSubscription(config, subscription);

    localStorage.setItem('bmc-push-subscribed', 'true');
    setSubscriptionUi(true);
    setStatus('Show alerts are enabled and synced for this device.');
  } catch (error) {
    console.error('[BMC push] enable failed', error);
    localStorage.removeItem('bmc-push-subscribed');
    setSubscriptionUi(false);
    setStatus(error instanceof Error ? error.message : 'Push alerts could not be enabled.');
  }
}

async function resetShowAlerts() {
  if (!resetButton) return;

  resetButton.disabled = true;
  setStatus('Resetting show alerts…');
  try {
    const config = await loadPushConfig().catch(() => undefined);
    const registration = await getPushRegistration();
    const subscription = registration ? await registration.pushManager.getSubscription() : null;
    if (subscription && config) {
      await fetch(config.api + '/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      }).catch(() => undefined);
    }
    if (subscription) await subscription.unsubscribe();
    localStorage.removeItem('bmc-push-subscribed');
    setSubscriptionUi(false);
    setStatus('Show alerts were reset for this device.');
  } catch (error) {
    console.error('[BMC push] reset failed', error);
    setStatus(error instanceof Error ? error.message : 'Could not reset show alerts.');
  } finally {
    resetButton.disabled = false;
  }
}

function showIosHint() {
  const userAgent = navigator.userAgent.toLowerCase();
  const appleMobile = /iphone|ipad|ipod/.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  if (hint && appleMobile && !standalone) hint.hidden = false;
}

function bootBmcPush() {
  ensureNotifyPanel();
  resetButton = addResetButton();
  showIosHint();
  if (button) {
    button.addEventListener('click', enableShowAlerts);
    refreshPushUi();
  }
  if (resetButton) resetButton.addEventListener('click', resetShowAlerts);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootBmcPush, { once: true });
} else {
  bootBmcPush();
}
