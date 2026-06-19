import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoBase = '/Balcony-Music-Club-PWA/';
const customDomainBase = '/';
const base = process.env.GITHUB_PAGES === 'true'
  ? process.env.GITHUB_PAGES_CUSTOM_DOMAIN === 'true'
    ? customDomainBase
    : repoBase
  : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
