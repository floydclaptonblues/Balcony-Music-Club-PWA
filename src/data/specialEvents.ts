import type { SpecialEvent } from './types';

export const specialEvents: SpecialEvent[] = [
  {
    id: 'paint-and-sip',
    title: 'Paint and Sip',
    timing: 'Sessions are 2 hours',
    description:
      'Enjoy creative meditation while pleasuring your taste buds. Great for date nights or bring a friend or ten.',
    prices: ['$35 — one ticket and one complimentary drink', '$60 — two tickets and two complimentary drinks'],
    contactLabel: 'Call or text 504-281-8736',
    contactHref: 'tel:+15042818736',
    sourceIds: ['website-host-event', 'website-events-tickets'],
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
