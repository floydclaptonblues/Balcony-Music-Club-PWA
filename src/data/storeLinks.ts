import type { StoreLink } from './types';

const productBase = 'https://balconymusicclub.com/product';

export const storeLinks: StoreLink[] = [
  {
    id: 'john-lennon-lomax',
    title: 'John Lennon, Acrylic, Canvas, 18" x 24"',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$950.00',
    href: `${productBase}/1252686-john-lennon-acrylic-canvas-18-x-24`,
    sourceIds: ['website-store'],
  },
  {
    id: 'keith-richards-lomax',
    title: 'Keith Richards, Acrylic, Canvas 24" x 36',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$1,195.00',
    href: `${productBase}/1252684-keith-richards-acrylic-canvas-24-x-36`,
    sourceIds: ['website-store'],
  },
  {
    id: 'john-bonham-lomax',
    title: 'John Bonham, Acrylic, Canvas 18" x 24"',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$850.00',
    href: `${productBase}/1252683-john-bonham-acrylic-canvas-18-x-24`,
    sourceIds: ['website-store'],
  },
  {
    id: 'jimi-hendrix-lomax',
    title: 'Jimi Hendrix, Acrylic on Canvas, 18" x 24"',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$995.00',
    href: `${productBase}/1252682-jimi-hendrix-acrylic-on-canvas-18-x-24`,
    sourceIds: ['website-store'],
  },
  {
    id: 'buddy-rich-lomax',
    title: 'Buddy Rich, Acrylic 18" x 24" on Canvas',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$850.00',
    href: `${productBase}/1252681-buddy-rich-acrylic-18-x-24-on-canvas`,
    sourceIds: ['website-store'],
  },
  {
    id: 'charlie-watts-lomax',
    title: 'Charlie Watts 18" x 24" Acrylic on Canvas',
    artistCredit: 'By New Orleans-based artist, N. Lomax.',
    priceLabel: '$850.00',
    href: `${productBase}/1252680-charlie-watts-18-x-24-acrylic-on-canvas`,
    sourceIds: ['website-store'],
  },
  {
    id: 'louis-armstrong-lomax',
    title: "Louis Armstrong in Acrylic by Lomax, 3' x 5'",
    artistCredit: 'Louis Armstrong in blue by New Orleans-based artist, Lomax.',
    priceLabel: '$4,995.00',
    href: `${productBase}/1252678-louis-armstrong-in-acrylic-by-lomax-3-x-5`,
    sourceIds: ['website-store'],
  },
];
