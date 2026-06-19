type PushPreferencePayload = {
  shows: boolean;
  days: Array<'wed' | 'thu' | 'fri' | 'sat' | 'sun'>;
};

export type PushAlertStatus =
  | 'unsupported'
  | 'missing-config'
  | 'default'
  | 'denied'
  | 'granted'
  | 'subscribed';

const DEFAULT_DAYS: PushPreferencePayload['days'] = ['wed', 'thu', 'fri', 'sat', 'sun'];
const PLACEHOLDER_VALUE = /(?:replace|your[-_ ]|example|<|>)/i;

function configuredValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && !PLACEHOLDER_VALUE.test(trimmed) ? trimmed : undefined;
}

function getPushApiUrl() {
  const value = configuredValue(import.meta.env.VITE_BMC_PUSH_API_URL as string | undefined);
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.hostname === 'localhost' ? url.toString().replace(/\/$/, '') : undefined;
  } catch {
    return undefined;
  }
}

function getVapidPublicKey() {
  return configuredValue(import.meta.env.VITE_BMC_VAPID_PUBLIC_KEY as string | undefined);
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function hasPushSupport() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export function getPushAlertStatus(): PushAlertStatus {
  if (!hasPushSupport()) return 'unsupported';
  if (!getPushApiUrl() || !getVapidPublicKey()) return 'missing-config';
  if (Notification.permission === 'denied') return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return 'default';
}

export async function subscribeToShowAlerts(
  preferences: PushPreferencePayload = { shows: true, days: DEFAULT_DAYS },
) {
  const pushApiUrl = getPushApiUrl();
  const vapidPublicKey = getVapidPublicKey();
  if (!pushApiUrl || !vapidPublicKey) {
    throw new Error('Show alerts are not configured yet.');
  }
  if (!hasPushSupport()) {
    throw new Error('Push notifications are not supported on this browser.');
  }

  // This function is only called by the Enable Show Alerts button click handler.
  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    throw new Error('Notifications are blocked. Enable them in browser or device settings, then try again.');
  }
  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted.');
  }

  const registration = await navigator.serviceWorker.register(
    `/Balcony-Music-Club-PWA/push-sw.js?api=${encodeURIComponent(pushApiUrl)}`,
    { scope: '/Balcony-Music-Club-PWA/' },
  );
  const existing = await registration.pushManager.getSubscription();
  const subscription = existing || await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const response = await fetch(`${pushApiUrl}/api/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription, preferences }),
  });
  if (!response.ok) {
    throw new Error(`Subscription could not be saved (${response.status}). Please try again later.`);
  }

  localStorage.setItem('bmc-push-subscribed', 'true');
  return subscription;
}

export async function unsubscribeFromShowAlerts() {
  const pushApiUrl = getPushApiUrl();
  if (!pushApiUrl || !hasPushSupport()) return;

  const registration = await navigator.serviceWorker.getRegistration('/Balcony-Music-Club-PWA/');
  const subscription = await registration?.pushManager.getSubscription();
  if (!subscription) return;

  const response = await fetch(`${pushApiUrl}/api/unsubscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  });
  if (!response.ok) {
    throw new Error(`Unsubscribe could not be saved (${response.status}).`);
  }

  await subscription.unsubscribe();
  localStorage.removeItem('bmc-push-subscribed');
}

export function isProbablyIosHomeScreenRequired() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAppleMobile = /iphone|ipad|ipod/.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return isAppleMobile && !isStandalone;
}
