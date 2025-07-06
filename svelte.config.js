import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
import classesData from './src/lib/data/classes.json' with {type: "json"};


function path(origin, name) {
  return `${origin}/${name.toLowerCase().replace(/\s/g, '-')}`;
}

const prerenderEntries =
  classesData.map(({name}) => path('/classes', name));

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      entries: prerenderEntries,
    },
    paths: {
      base: process.env.PUBLIC_APP_PATH ?? '/dh-tools',
    },
  }
};

export default config;
