import { astroExpressiveCode } from 'astro-expressive-code';
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    
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
