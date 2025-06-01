import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Runes für Svelte 5 aktivieren (optional, falls verwendet)
  compilerOptions: {
    runes: true
  },
  kit: {
    // Netlify-Adapter mit Konfiguration
    adapter: adapter({

	})
  }
};

export default config;