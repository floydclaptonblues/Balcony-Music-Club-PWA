import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repoBase = '/Balcony-Music-Club-PWA/';
const base = process.env.GITHUB_PAGES === 'true' ? repoBase : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
