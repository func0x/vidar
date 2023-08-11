import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import json from '@rollup/plugin-json';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), json({ compact: true })],
	resolve: {
		alias: {
			src: path.resolve('src/')
		}
	},
	server: {
		fs: {
			allow: ['./event_data']
		}
	}
};

export default config;
