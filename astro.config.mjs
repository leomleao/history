import { defineConfig } from 'astro/config';
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:18775',
  output: 'static',
  trailingSlash: 'always',
  vite: { server: { proxy: {
    '/media': 'http://127.0.0.1:18775',
    '/cardross': 'http://127.0.0.1:18775',
  } } },
});
