import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The self-hosted font packages list a .woff fallback next to every .woff2. Every browser this site supports
 * reads woff2, so drop the fallback: it halves the font stylesheet and the number of font files deployed.
 */
const woff2Only: Plugin = {
  name: 'woff2-only',
  enforce: 'pre',
  transform(code, id) {
    if (!/@fontsource[^?]*\.css/.test(id)) return null;
    return { code: code.replace(/,\s*url\([^)]*\.woff\)\s*format\(['"]woff['"]\)/g, ''), map: null };
  },
};

export default defineConfig({
  plugins: [woff2Only, react()],
});
