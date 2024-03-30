import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://huyikai.xyz',
  integrations: [
    starlight({
      title: '',
      logo: {
        src: './src/assets/logo.svg'
      },
      favicon: '/favicon.ico',
      social: {
        github: 'https://github.com/huyikai'
      }
    })
  ]
});
