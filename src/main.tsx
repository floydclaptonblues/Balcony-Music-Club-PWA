import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { appConfig } from './data/appConfig';
import { bands } from './data/bands';
import { bookingInfo } from './data/bookingInfo';
import { schedule } from './data/schedule';
import { socialLinks } from './data/socialLinks';
import { specialEvents } from './data/specialEvents';
import { storeLinks } from './data/storeLinks';
import { venueInfo } from './data/venueInfo';
import { ConfiguredValue } from './components/ConfiguredValue';
import { Section } from './components/Section';
import { futureSchedule, mailHref, telHref } from './lib/format';
import './styles.css';

type NavItem = { id: string; label: string };

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'book', label: 'Book' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'events', label: 'Events' },
  { id: 'store', label: 'Store' },
  { id: 'contact', label: 'Contact' },
  { id: 'notify', label: 'Notify' },
  { id: 'save', label: 'Save' },
];

function App() {
  const upcoming = useMemo(() => futureSchedule(schedule), []);
  const [preferences, setPreferences] = useState(() => ({
    schedule: localStorage.getItem('bmc-pref-schedule') === 'true',
    events: localStorage.getItem('bmc-pref-events') === 'true',
    merch: localStorage.getItem('bmc-pref-merch') === 'true',
  }));

  function togglePreference(key: keyof typeof preferences) {
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    localStorage.setItem(`bmc-pref-${key}`, String(next[key]));
  }

  return (
    <>
      <header className="app-header">
        <a className="brand" href="#home" aria-label="Balcony Music Club home">
          <span className="brand-mark">BMC</span>
          <span>
            <strong>{venueInfo.name}</strong>
            <small>{venueInfo.cityRegion}</small>
          </span>
        </a>
        <nav className="nav" aria-label="Main sections">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>{item.label}</a>
          ))}
        </nav>
      </header>

      <main>
        <Section id="home" eyebrow="QR-ready guest app" title={venueInfo.name}>
          <div className="hero-card">
            <p className="hero-line">{venueInfo.tagline}</p>
            <p>{venueInfo.addressLine1}</p>
            <p>{venueInfo.cityRegion}</p>
            <div className="pill-row" aria-label="Venue spaces">
              {venueInfo.rooms.map((room) => <span className="pill" key={room}>{room}</span>)}
            </div>
            <p className="note">Video is intentionally excluded from this version.</p>
          </div>
        </Section>

        <Section id="book" eyebrow="Private events" title="Book an Event">
          <article className="card stack">
            <h3>{bookingInfo.title}</h3>
            <p>{bookingInfo.subtitle}</p>
            <div className="grid two">
              <div>
                <h4>Spaces</h4>
                <ul>{bookingInfo.spaces.map((space) => <li key={space}>{space}</li>)}</ul>
              </div>
              <div>
                <h4>Event types</h4>
                <ul>{bookingInfo.eventTypes.map((type) => <li key={type}>{type}</li>)}</ul>
              </div>
            </div>
            <div className="action-row">
              <a className="button" href={mailHref(bookingInfo.privateEventsEmail)}>Email Booking Request</a>
              <a className="button ghost" href={telHref(bookingInfo.privateEventsPhone)}>Call {bookingInfo.privateEventsPhone}</a>
            </div>
          </article>
        </Section>

        <Section id="schedule" eyebrow="Live music" title="Band Schedule">
          {upcoming.length === 0 ? (
            <div className="empty-state">
              <p>No current/future band schedule is configured yet.</p>
              <p className="note">The public source schedule currently in this scaffold is May 2026 and is treated as archived source data, not a live guest schedule.</p>
            </div>
          ) : (
            <div className="card-list">
              {upcoming.map((item) => (
                <article className="card compact" key={item.id}>
                  <p className="eyebrow">{item.dayLabel}</p>
                  <h3>{item.title}</h3>
                  <p>{item.startTime} – {item.endTime}</p>
                </article>
              ))}
            </div>
          )}
          <details className="details-block">
            <summary>Verified source band names</summary>
            <div className="pill-row">
              {bands.map((band) => <span className="pill" key={band.id}>{band.name}</span>)}
            </div>
          </details>
        </Section>

        <Section id="events" eyebrow="Specials" title="Special Events">
          <div className="card-list">
            {specialEvents.map((event) => (
              <article className="card" key={event.id}>
                <p className="eyebrow">{event.timing}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.prices?.length ? (
                  <ul>{event.prices.map((price) => <li key={price}>{price}</li>)}</ul>
                ) : null}
                {event.contactHref && event.contactLabel ? (
                  <a className="button ghost" href={event.contactHref}>{event.contactLabel}</a>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        <Section id="store" eyebrow="External links only" title="Store / Merch">
          {storeLinks.length === 0 ? (
            <div className="empty-state">Store links are not configured yet.</div>
          ) : (
            <div className="card-list">
              {storeLinks.map((item) => (
                <article className="card" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.artistCredit}</p>
                  <p className="price">{item.priceLabel}</p>
                  <a className="button ghost" href={item.href} target="_blank" rel="noreferrer">Open on BMC Store</a>
                </article>
              ))}
            </div>
          )}
          <p className="note">Checkout and payment processing are not implemented in this PWA.</p>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Contact / Social Links">
          <article className="card stack">
            <p><strong>Address:</strong> {venueInfo.addressLine1}, {venueInfo.cityRegion}</p>
            <p><strong>Private Events Email:</strong> <a href={mailHref(bookingInfo.privateEventsEmail)}>{bookingInfo.privateEventsEmail}</a></p>
            <p><strong>Private Events Phone:</strong> <a href={telHref(bookingInfo.privateEventsPhone)}>{bookingInfo.privateEventsPhone}</a></p>
            <p><strong>Paint and Sip Phone:</strong> <a href={telHref(bookingInfo.paintAndSipPhone)}>{bookingInfo.paintAndSipPhone}</a></p>
            <div className="action-row">
              {socialLinks.map((link) => (
                <a className="button ghost" key={link.id} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
              ))}
            </div>
          </article>
        </Section>

        <Section id="notify" eyebrow="Local only" title="Notification Preferences">
          <article className="card stack">
            <p>This version does not send real push notifications. These switches save local guest preferences only.</p>
            {Object.entries(preferences).map(([key, value]) => (
              <label className="toggle" key={key}>
                <span>{key === 'schedule' ? 'Band schedule updates' : key === 'events' ? 'Special events' : 'Store / merch updates'}</span>
                <input type="checkbox" checked={value} onChange={() => togglePreference(key as keyof typeof preferences)} />
              </label>
            ))}
          </article>
        </Section>

        <Section id="save" eyebrow="QR + install" title="Scan & Save App">
          <article className="card stack">
            <p><strong>Public URL:</strong> <ConfiguredValue value={appConfig.publicUrl} /></p>
            <p>Once GitHub Pages is approved and live, this URL becomes the QR target for guests.</p>
            <ol>
              <li>Open the public URL on your phone.</li>
              <li>Use the browser share/menu button.</li>
              <li>Choose Add to Home Screen or Install App when offered.</li>
            </ol>
            <p className="note">QR generation is prepared but intentionally waits for the real public URL.</p>
          </article>
        </Section>
      </main>

      <footer className="footer">
        <p>{venueInfo.name} • {venueInfo.addressLine1} • {venueInfo.cityRegion}</p>
        <p className="note">Source-ledgered PWA scaffold. No live video. No real push. No checkout.</p>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
