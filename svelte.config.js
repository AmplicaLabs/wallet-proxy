import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // this is an adapter for  statically-rendered, single page application.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // dependent on host platform, see GitHub pages doc, maybe?
      precompress: false,
      strict: true
    }),
    paths: {
      base: dev ? '' : process.env.BASE_PATH
    }
  }
};

export default config;
