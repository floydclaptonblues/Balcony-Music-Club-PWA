import { getPushAlertStatus, isProbablyIosHomeScreenRequired, subscribeToShowAlerts } from './lib/push';

const notifySection = document.createElement('section');
notifySection.id = 'notify';
notifySection.className = 'panel';
notifySection.innerHTML = `
  <span class="ribbon">Show alerts</span>
  <h2>Get BMC Show Announcements</h2>
  <article class="card">
    <p>Enable Wed–Sun show announcements from Balcony Music Club on this device.</p>
    <p id="push-install-hint" class="note" hidden>On iPhone, use Share → Add to Home Screen, open the saved BMC app, then tap Enable Show Alerts.</p>
    <button id="enable-show-alerts" class="button primary" type="button">Enable Show Alerts</button>
    <p id="push-alert-status" class="note" aria-live="polite"></p>
  </article>
`;

const saveSection = document.querySelector('#save');
saveSection?.before(notifySection);

const notifyLink = document.createElement('a');
notifyLink.href = '#notify';
notifyLink.textContent = 'Notify';
const saveLink = document.querySelector('nav a[href="#save"]');
saveLink?.before(notifyLink);

const button = document.querySelector<HTMLButtonElement>('#enable-show-alerts');
const statusMessage = document.querySelector<HTMLParagraphElement>('#push-alert-status');
const installHint = document.querySelector<HTMLParagraphElement>('#push-install-hint');

function setStatus(message: string) {
  if (statusMessage) statusMessage.textContent = message;
}

if (installHint && isProbablyIosHomeScreenRequired()) {
  installHint.hidden = false;
}

const pushStatus = getPushAlertStatus();
const alreadySubscribed = localStorage.getItem('bmc-push-subscribed') === 'true';
const unavailableMessages: Record<string, string> = {
  unsupported: 'This browser does not support web push notifications.',
  'missing-config': 'Show alerts are ready in the app, but the Cloudflare Worker URL and VAPID public key still need to be configured.',
  denied: 'Notifications are blocked for this browser. Enable them in browser or device settings to receive BMC show alerts.',
};

if (button) {
  if (alreadySubscribed) {
    button.disabled = true;
    button.textContent = 'Show Alerts Enabled';
    setStatus('Show alerts are enabled for this device.');
  } else if (pushStatus in unavailableMessages) {
    button.disabled = true;
    setStatus(unavailableMessages[pushStatus]);
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    button.textContent = 'Enabling…';
    setStatus('Requesting notification permission…');

    try {
      await subscribeToShowAlerts({
        shows: true,
        days: ['wed', 'thu', 'fri', 'sat', 'sun'],
      });
      button.textContent = 'Show Alerts Enabled';
      setStatus('Show alerts are enabled for this device.');
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Enable Show Alerts';
      setStatus(error instanceof Error ? error.message : 'Push alerts could not be enabled.');
    }
  });
}
