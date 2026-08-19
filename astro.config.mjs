import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lelitlogistics.com',
  compressHTML: true,
  // Atajo memorable a la app interna: lelitlogistics.com/hireflow
  // (sitio estatico -> Astro genera pagina con meta-refresh + canonical)
  redirects: {
    '/hireflow': 'https://hireflow.lelitlogistics.com',
  },
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
