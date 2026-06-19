const params = new URL(self.location.href).searchParams;
const PUSH_API_URL = params.get('api');
const APP_BASE_URL = new URL('./', self.location.href);
const DEFAULT_APP_URL = new URL('#schedule', APP_BASE_URL).href;
const APP_ICON_URL = new URL('icons/icon.svg', APP_BASE_URL).href;
const DEFAULT_NOTIFICATION = {
  title: 'Balcony Music Club',
  body: 'A BMC alert arrived. Open the schedule for verified details.',
  tag: 'bmc-show-alert',
};

async function getLatestAnnouncement() {
  if (!PUSH_API_URL) {
    throw new Error('Push API URL is unavailable.');
  }

  const response = await fetch(`${PUSH_API_URL.replace(/\/$/, '')}/api/latest-announcement`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Latest announcement fetch failed: ${response.status}`);
  }

  return response.json();
}

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let announcement = DEFAULT_NOTIFICATION;
    try {
      announcement = { ...DEFAULT_NOTIFICATION, ...await getLatestAnnouncement() };
    } catch {
      // A wake-up push should still leave the guest with a useful, safe notification.
    }

    await self.registration.showNotification(announcement.title, {
      body: announcement.body,
      icon: APP_ICON_URL,
      badge: APP_ICON_URL,
      tag: announcement.tag,
      data: { url: DEFAULT_APP_URL },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil((async () => {
    const windowClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    for (const client of windowClients) {
      if ('focus' in client) {
        await client.focus();
        if ('navigate' in client) {
          await client.navigate(DEFAULT_APP_URL);
        }
        return;
      }
    }

    if (clients.openWindow) {
      await clients.openWindow(DEFAULT_APP_URL);
    }
  })());
});
