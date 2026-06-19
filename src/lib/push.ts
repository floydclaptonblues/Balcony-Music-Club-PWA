type PushPreferencePayload = {
  shows: boolean;
  days: Array<'wed' | 'thu' | 'fri' | 'sat' | 'sun'>;
};

type PushRuntimeConfig = {
  apiUrl?: string;
  vapidPublicKey?: string;
};

declare global {
  interface Window {
    BMC_PUSH_CONFIG?: PushRuntimeConfig;
  }
}

export type PushAlertStatus =
  | 'unsupported'
  | 'missing-config'
  | 'default'
  | 'denied'
  | 'granted'
  | 'subscribed';

const DEFAULT_DAYS: PushPreferencePayload['days'] = ['wed', 'thu', 'fri', 'sat', 'sun'];
const PLACEHOLDER_VALUE = /(?:replace|your[-_ ]|example|<|>)/i;
const APP_BASE_PATH = import.meta.env.BASE_URL;
const PUSH_SCOPE_PATH = `${APP_BASE_PATH}push-alerts/`;

function configuredValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed && !PLACEHOLDER_VALUE.test(trimmed) ? trimmed : undefined;
}

function getPushApiUrl() {
  const value = configuredValue(window.BMC_PUSH_CONFIG?.apiUrl)
    ?? configuredValue(import.meta.env.VITE_BMC_PUSH_API_URL as string | undefined);
  if (!value) return undefined;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.hostname === 'localhost' ? url.toString().replace(/\/$/, '') : undefined;
  } catch {
    return undefined;
  }
}

function getVapidPublicKey() {
  return configuredValue(window.BMC_PUSH_CONFIG?.vapidPublicKey)
    ?? configuredValue(import.meta.env.VITE_BMC_VAPID_PUBLIC_KEY as string | undefined);
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

  let registration: ServiceWorkerRegistration;
  try {
    registration = await navigator.serviceWorker.register(
      `${APP_BASE_PATH}push-sw.js?api=${encodeURIComponent(pushApiUrl)}`,
      { scope: PUSH_SCOPE_PATH },
    );
  } catch {
    throw new Error('The BMC alerts service worker could not start. Refresh the app and try again.');
  }

  let subscription: PushSubscription;
  try {
    const existing = await registration.pushManager.getSubscription();
    subscription = existing || await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
  } catch {
    throw new Error('The browser could not create a push subscription. Confirm the public VAPID key and browser notification settings.');
  }

  let response: Response;
  try {
    response = await fetch(`${pushApiUrl}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription, preferences }),
    });
  } catch {
    throw new Error('Could not reach the BMC alerts service. Check the connection, confirm Worker CORS allows https://app.balconymusicclub.com, and redeploy the Worker after changing its origin.');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => undefined) as { error?: unknown } | undefined;
    const detail = typeof body?.error === 'string' ? `: ${body.error}` : '';
    throw new Error(`The BMC alerts service rejected the subscription (HTTP ${response.status}${detail}).`);
  }

  localStorage.setItem('bmc-push-subscribed', 'true');
  return subscription;
}

export async function unsubscribeFromShowAlerts() {
  const pushApiUrl = getPushApiUrl();
  if (!pushApiUrl || !hasPushSupport()) return;

  const registration = await navigator.serviceWorker.getRegistration(PUSH_SCOPE_PATH);
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
