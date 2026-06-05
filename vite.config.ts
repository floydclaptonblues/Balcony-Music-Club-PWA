import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoBase = '/balcony-music-club-pwa/';
const base = process.env.GITHUB_PAGES === 'true' ? repoBase : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
