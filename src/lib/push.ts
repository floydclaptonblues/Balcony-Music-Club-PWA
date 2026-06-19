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

function getPushApiUrl() {
  return import.meta.env.VITE_BMC_PUSH_API_URL as string | undefined;
}

function getVapidPublicKey() {
  return import.meta.env.VITE_BMC_VAPID_PUBLIC_KEY as string | undefined;
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export function getPushAlertStatus(): PushAlertStatus {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    return 'unsupported';
  }

  if (!getPushApiUrl() || !getVapidPublicKey()) {
    return 'missing-config';
  }

  if (Notification.permission === 'denied') return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return 'default';
}

export async function subscribeToShowAlerts(preferences: PushPreferencePayload = { shows: true, days: DEFAULT_DAYS }) {
  const pushApiUrl = getPushApiUrl();
  const vapidPublicKey = getVapidPublicKey();

  if (!pushApiUrl || !vapidPublicKey) {
    throw new Error('Push alerts are not configured yet.');
  }

  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
    throw new Error('Push notifications are not supported on this browser.');
  }

  const permission = await Notification.requestPermission();
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

  const response = await fetch(`${pushApiUrl}/api/push/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription, preferences }),
  });

  if (!response.ok) {
    throw new Error(`Subscription save failed: ${response.status}`);
  }

  localStorage.setItem('bmc-push-subscribed', 'true');
  return subscription;
}

export function isProbablyIosHomeScreenRequired() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return isAppleMobile && !isStandalone;
}
