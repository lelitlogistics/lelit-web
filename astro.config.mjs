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
    '/hireflow/candidates': 'https://hireflow.lelitlogistics.com/#candidates',
    '/hireflow/delivery-review': 'https://hireflow.lelitlogistics.com/#ops-delivery-review',
    '/hireflow/dispatch': 'https://hireflow.lelitlogistics.com/#ops-dispatch',
    '/hireflow/drivers': 'https://hireflow.lelitlogistics.com/#drivers',
    '/hireflow/files': 'https://hireflow.lelitlogistics.com/#files',
    '/hireflow/fleet': 'https://hireflow.lelitlogistics.com/#ops-fleet',
    '/hireflow/interviews': 'https://hireflow.lelitlogistics.com/#tracker',
    '/hireflow/inventory': 'https://hireflow.lelitlogistics.com/#inventory',
    '/hireflow/messages': 'https://hireflow.lelitlogistics.com/#inbox',
    '/hireflow/notifications': 'https://hireflow.lelitlogistics.com/#notifications',
    '/hireflow/onboarding': 'https://hireflow.lelitlogistics.com/#onboarding',
    '/hireflow/payments': 'https://hireflow.lelitlogistics.com/#fleet-payments',
    '/hireflow/performance': 'https://hireflow.lelitlogistics.com/#ops-performance-hub',
    '/hireflow/phones': 'https://hireflow.lelitlogistics.com/#ops-phones',
    '/hireflow/repairs': 'https://hireflow.lelitlogistics.com/#ops-repairs',
    '/hireflow/reports': 'https://hireflow.lelitlogistics.com/#reports',
    '/hireflow/route-payments': 'https://hireflow.lelitlogistics.com/#route-payments',
    '/hireflow/safety': 'https://hireflow.lelitlogistics.com/#ops-safety',
    '/hireflow/schedule': 'https://hireflow.lelitlogistics.com/#ops-schedule',
    '/hireflow/scorecards': 'https://hireflow.lelitlogistics.com/#ops-scorecard',
    '/hireflow/templates': 'https://hireflow.lelitlogistics.com/#templates',
    '/hireflow/today': 'https://hireflow.lelitlogistics.com/#today',
    '/hireflow/training': 'https://hireflow.lelitlogistics.com/#training',
  },
  integrations: [sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
