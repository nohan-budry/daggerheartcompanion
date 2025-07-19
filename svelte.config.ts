import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
import fs from 'fs';
import path from 'path';
import {slugify} from "./src/lib/utils/slugify";
import type {ClassData} from "./src/lib/models/ClassData";

const dev = process.env.NODE_ENV === 'development';
let basePath = dev ? '/daggerheartcompanion' : process.env.PUBLIC_APP_PATH ?? '';

const classes = JSON.parse(
  fs.readFileSync(path.resolve('./src/lib/data/classes.json'), 'utf-8')
) as ClassData[];


let prerenderEntries = [];
prerenderEntries.push(...classes.flatMap((classData) => ([
  `/classes`,
  `/classes/${slugify(classData.name)}`,
  `/classes/${slugify(classData.name)}/subclasses`,
  ...classData.subclasses
    .map((subclass) => `/classes/${slugify(classData.name)}/subclasses/${slugify(subclass.name)}`),
])));

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
    paths: {
      base: basePath,
    },
    prerender: {
      entries: [
        '*',
        ...prerenderEntries.map((entry) => `${basePath}${entry}`),
      ],
    }
  }
};

export default config;
