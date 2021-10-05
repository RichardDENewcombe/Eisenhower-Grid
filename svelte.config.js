import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
import path from 'path'
const config = {
	kit: {
		vite: {
			resolve: {
				alias: {
					'$stores': path.resolve('./src/stores')
				}
			}
		},
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
