import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import QRCode from 'qrcode';

const appConfigPath = new URL('../src/data/appConfig.ts', import.meta.url);
const source = await readFile(appConfigPath, 'utf8');
const match = source.match(/publicUrl:\s*'([^']*)'/);
const publicUrl = match?.[1]?.trim();

if (!publicUrl) {
  console.error('No publicUrl configured in src/data/appConfig.ts. QR generation skipped.');
  process.exit(1);
}

const outPath = join(process.cwd(), 'public', 'qr.svg');
await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, await QRCode.toString(publicUrl, { type: 'svg', margin: 2 }), 'utf8');
console.log(`QR code written to ${outPath}`);
