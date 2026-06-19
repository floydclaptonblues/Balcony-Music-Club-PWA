const params = new URL(self.location.href).searchParams;
const PUSH_API_URL = params.get('api') || 'https://REPLACE-WITH-BMC-PUSH-WORKER.workers.dev';
const DEFAULT_APP_URL = '/Balcony-Music-Club-PWA/#schedule';

async function getLatestAnnouncement() {
  const response = await fetch(`${PUSH_API_URL}/api/push/latest`, {
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
    let announcement;

    try {
      announcement = await getLatestAnnouncement();
    } catch (error) {
      announcement = {
        title: 'Balcony Music Club',
        body: 'Tonight’s show announcement is ready.',
        url: DEFAULT_APP_URL,
        tag: 'bmc-show-alert',
      };
    }

    await self.registration.showNotification(announcement.title || 'Balcony Music Club', {
      body: announcement.body || 'Show schedule updated.',
      icon: '/Balcony-Music-Club-PWA/icons/icon.svg',
      badge: '/Balcony-Music-Club-PWA/icons/icon.svg',
      tag: announcement.tag || 'bmc-show-alert',
      data: {
        url: announcement.url || DEFAULT_APP_URL,
      },
    });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || DEFAULT_APP_URL;

  event.waitUntil((async () => {
    const windowClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });

    for (const client of windowClients) {
      if ('focus' in client) {
        await client.focus();
        if ('navigate' in client) {
          await client.navigate(targetUrl);
        }
        return;
      }
    }

    if (clients.openWindow) {
      await clients.openWindow(targetUrl);
    }
  })());
});
