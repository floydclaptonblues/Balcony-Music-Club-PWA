import type { SpecialEvent } from './types';

export const specialEvents: SpecialEvent[] = [
  {
    id: 'bmc-app-download',
    title: 'Download the Balcony Music Club App',
    timing: 'Official BMC app',
    description:
      'Keep the BMC schedule, show alerts, venue info, and JazzyCat in your pocket.',
    contactLabel: 'Open BMC App',
    contactHref: 'https://app.balconymusicclub.com/',
    sourceIds: ['website-home'],
  },
  {
    id: 'bmc-live',
    title: 'Check Out BMC LIVE!!!',
    timing: 'Live from Balcony Music Club',
    description:
      'Watch Balcony Music Club live from New Orleans and support the artists.',
    contactLabel: 'Check Out BMC LIVE!!!',
    contactHref: 'https://bmclive.balconymusicclub.com/',
    sourceIds: ['website-home'],
  },
  {
    id: 'bloody-mary-brunch',
    title: 'Build Your Own Bloody Mary Brunch',
    timing: 'Every Sunday, Noon – 4:00 PM',
    description:
      'Guests can build a Bloody Mary stacked with breakfast fixings and settle into a slow New Orleans brunch mood.',
    prices: ['$15 Bloody Mary', '$10 refills'],
    sourceIds: ['website-host-event', 'website-events-tickets'],
  },
  {
    id: 'thursday-happy-hour',
    title: 'Thursday Happy Hour',
    timing: 'Every Thursday, 4:30 – 5:30 PM',
    description:
      'An elegant happy hour built for a cocktail-lounge pace in the courtyard before the night opens up.',
    sourceIds: ['website-host-event', 'website-events-tickets'],
  },
];
