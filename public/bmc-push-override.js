(() => {
  const STORAGE_KEY = 'bmc-push-subscribed';
  const DEFAULT_PREFS = { shows: true, days: ['wed', 'thu', 'fri', 'sat', 'sun'] };

  function setStatus(message) {
    const status = document.getElementById('pushAlertStatus');
    if (status) status.textContent = message;
  }

  function configured(value) {
    const placeholder = /(?:replace|your[-_ ]|example|<|>|%VITE_)/i;
    return value && value.trim && value.trim() && !placeholder.test(value) ? value.trim() : '';
  }

  function hasSupport() {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((ch) => ch.charCodeAt(0)));
  }

  async function getRootRegistration(api) {
    const existing = await navigator.serviceWorker.getRegistration('/');
    if (existing) {
      await existing.update().catch(() => undefined);
      return existing;
    }
    return navigator.serviceWorker.register(`/push-sw.js?api=${encodeURIComponent(api)}`, { scope: '/' });
  }

  async function readRealSubscription(api) {
    const registration = await getRootRegistration(api);
    const subscription = await registration.pushManager.getSubscription();
    return { registration, subscription };
  }

  async function enableFreshShowAlerts(button, api, vapidPublicKey) {
    button.disabled = true;
    button.textContent = 'Enabling…';
    setStatus('Requesting notification permission…');

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error(permission === 'denied'
          ? 'Notifications are blocked in browser/device settings.'
          : 'Notification permission was not granted.');
      }

      const registration = await getRootRegistration(api);
      await navigator.serviceWorker.ready;

      const oldSubscription = await registration.pushManager.getSubscription();
      if (oldSubscription) await oldSubscription.unsubscribe();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      const payload = {
        subscription: subscription.toJSON(),
        preferences: DEFAULT_PREFS,
      };

      const response = await fetch(`${api}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const body = await response.json().catch(() => null);
      if (!response.ok || !body || body.ok !== true) {
        const detail = body && typeof body.error === 'string' ? `: ${body.error}` : '';
        throw new Error(`The BMC alerts service rejected the subscription (HTTP ${response.status}${detail}).`);
      }

      localStorage.setItem(STORAGE_KEY, 'true');
      button.disabled = true;
      button.textContent = 'Show Alerts Enabled';
      setStatus('Show alerts are enabled for this device.');
      console.log('[BMC push] Fresh subscription saved to Worker KV.');
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      button.disabled = false;
      button.textContent = 'Enable Show Alerts';
      setStatus(error instanceof Error ? error.message : 'Push alerts could not be enabled.');
      console.error('[BMC push] Enable failed:', error);
    }
  }

  async function installOverride() {
    const original = document.getElementById('enableShowAlerts');
    if (!original) return;

    const cfg = window.BMC_PUSH_CONFIG || {};
    const api = configured(cfg.apiUrl || '');
    const vapidPublicKey = configured(cfg.vapidPublicKey || '');

    const button = original.cloneNode(true);
    original.replaceWith(button);

    button.disabled = false;
    button.textContent = 'Enable Show Alerts';
    localStorage.removeItem(STORAGE_KEY);

    if (!api || !vapidPublicKey) {
      button.disabled = true;
      setStatus('Show alerts need the Worker URL and VAPID public key configuration.');
      return;
    }

    if (!hasSupport()) {
      button.disabled = true;
      setStatus('This browser does not support web push notifications.');
      return;
    }

    if (Notification.permission === 'denied') {
      button.disabled = true;
      setStatus('Notifications are blocked for this browser. Enable them in browser or device settings to receive BMC show alerts.');
      return;
    }

    try {
      const { subscription } = await readRealSubscription(api);
      if (subscription) {
        button.disabled = true;
        button.textContent = 'Show Alerts Enabled';
        localStorage.setItem(STORAGE_KEY, 'true');
        setStatus('Show alerts are enabled for this device.');
      } else {
        setStatus('Show alerts are not enabled on this device yet.');
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      setStatus('Show alerts are ready. Tap Enable Show Alerts to subscribe.');
      console.warn('[BMC push] Subscription check failed:', error);
    }

    button.addEventListener('click', () => enableFreshShowAlerts(button, api, vapidPublicKey));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installOverride, { once: true });
  } else {
    installOverride();
  }
})();
