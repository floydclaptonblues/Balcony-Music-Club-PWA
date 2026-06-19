import { subtle } from 'node:crypto';

function base64UrlEncode(buffer) {
  return Buffer.from(buffer)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const keyPair = await subtle.generateKey(
  { name: 'ECDSA', namedCurve: 'P-256' },
  true,
  ['sign', 'verify'],
);

const publicJwk = await subtle.exportKey('jwk', keyPair.publicKey);
const privateJwk = await subtle.exportKey('jwk', keyPair.privateKey);

const publicKeyBytes = Buffer.concat([
  Buffer.from([0x04]),
  Buffer.from(publicJwk.x, 'base64url'),
  Buffer.from(publicJwk.y, 'base64url'),
]);

console.log('\nVAPID_PUBLIC_KEY for wrangler.toml and VITE_BMC_VAPID_PUBLIC_KEY:');
console.log(base64UrlEncode(publicKeyBytes));
console.log('\nVAPID_PRIVATE_JWK secret value for Cloudflare Worker:');
console.log(JSON.stringify(privateJwk));
console.log('\nStore private key with:');
console.log('npx wrangler secret put VAPID_PRIVATE_JWK');
console.log('\nAlso create an admin token with:');
console.log('npx wrangler secret put ADMIN_TOKEN');
