const PUSH_SCOPE = '/push-alerts/';
const PUSH_WORKER = '/push-sw.js';
const PUSH_CONFIG = '/push-config.js';
const DAYS = ['wed', 'thu', 'fri', 'sat', 'sun'];
const PLACEHOLDER = /(?:replace|your[-_ ]|example|<|>|%VITE_)/i;

const status = document.getElementById('pushAlertStatus');
const button = document.getElementById('enableShowAlerts');
const hint = document.getElementById('pushInstallHint');

function setStatus(message) {
  if (status) status.textContent = message;
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

  const reset = document.createElement('button');
  reset.id = 'resetShowAlerts';
  reset.type = 'button';
  reset.className = 'button ghost';
  reset.textContent = 'Reset Alerts';
  reset.hidden = true;
  button.insertAdjacentText('afterend', ' ');
  button.insertAdjacentElement('afterend', reset);
  return reset;
}

const resetButton = addResetButton();

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
    const script = document.createElement('script');
    script.src = PUSH_CONFIG + '?v=' + Date.now();
    script.onload = () => {
      script.remove();
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
      setStatus('Show alerts are enabled for this device.');
      return;
    }
  } catch {
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

async function workerError(response) {
  const body = await response.json().catch(() => undefined);
  const detail = typeof body?.error === 'string' ? ': ' + body.error : '';
  return 'HTTP ' + response.status + detail;
}

async function enableShowAlerts() {
  if (!button || !hasPushSupport()) {
    setStatus('This browser does not support web push notifications.');
    return;
  }

  button.disabled = true;
  button.textContent = 'Enabling...';
  setStatus('Loading show-alert configuration...');

  try {
    const config = await loadPushConfig();
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error(permission === 'denied'
        ? 'Notifications are blocked in browser/device settings.'
        : 'Notification permission was not granted.');
    }

    const registration = await navigator.serviceWorker.register(
      PUSH_WORKER + '?api=' + encodeURIComponent(config.api),
      { scope: PUSH_SCOPE },
    );
    const existing = await registration.pushManager.getSubscription();
    if (existing) await existing.unsubscribe();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(config.key),
    });
    let response;
    try {
      response = await fetch(config.api + '/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: subscription.toJSON(), preferences: { shows: true, days: ['wed', 'thu', 'fri', 'sat', 'sun'] } }),
      });
    } catch {
      throw new Error('Could not reach the BMC alerts service. Check the connection and try again.');
    }
    if (!response.ok) {
      throw new Error('The BMC alerts service rejected the subscription (' + await workerError(response) + ').');
    }

    localStorage.setItem('bmc-push-subscribed', 'true');
    setSubscriptionUi(true);
    setStatus('Show alerts are enabled for this device.');
  } catch (error) {
    localStorage.removeItem('bmc-push-subscribed');
    setSubscriptionUi(false);
    setStatus(error instanceof Error ? error.message : 'Push alerts could not be enabled.');
  }
}

async function resetShowAlerts() {
  if (!resetButton) return;

  resetButton.disabled = true;
  setStatus('Resetting show alerts...');
  try {
    const registration = await getPushRegistration();
    const subscription = registration ? await registration.pushManager.getSubscription() : null;
    if (subscription) await subscription.unsubscribe();
    localStorage.removeItem('bmc-push-subscribed');
    setSubscriptionUi(false);
    setStatus('Show alerts were reset for this device.');
  } catch (error) {
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

showIosHint();
if (button) {
  button.addEventListener('click', enableShowAlerts);
  refreshPushUi();
}
if (resetButton) resetButton.addEventListener('click', resetShowAlerts);
