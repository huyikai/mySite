import { astroExpressiveCode } from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    preact(),
    astroExpressiveCode({
      themes: ['material-theme-darker'],
      plugins: [
        {
          name: '@astrojs/starlight'
        }
      ]
    })
  ]
});
