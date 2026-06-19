import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';

const repoBase = '/Balcony-Music-Club-PWA/';
const customDomainBase = '/';
const base = process.env.GITHUB_PAGES === 'true'
  ? process.env.GITHUB_PAGES_CUSTOM_DOMAIN === 'true'
    ? customDomainBase
    : repoBase
  : '/';

function copyBmcStaticShellAssets() {
  return {
    name: 'copy-bmc-static-shell-assets',
    writeBundle(options: { dir?: string }) {
      const outputDirectory = resolve(options.dir ?? 'dist');
      cpSync(resolve('assets'), resolve(outputDirectory, 'assets'), { recursive: true });
      copyFileSync(resolve('sw.js'), resolve(outputDirectory, 'sw.js'));
    },
  };
}

export default defineConfig({
  plugins: [react(), copyBmcStaticShellAssets()],
  base,
});
