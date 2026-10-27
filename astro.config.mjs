import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 1. Force 100% Static Site Generation
  output: 'static', 
  
  // 2. Required for Sitemap
  site: 'https://solarquotes.com.ng',

  // 3. Integrations (Notice we REMOVED the Cloudflare adapter)
  integrations: [
    react(),
    sitemap(),
  ],

  // 4. Tailwind V4
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});