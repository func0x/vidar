import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		json({ compact: true }),
		copy({
			targets: [
				{
					src: './external_assets/images',
					dest: './src/lib',
					force: true
				},
				{
					src: './external_assets/styles.css',
					dest: './src/routes',
					force: true
				},
				{
					src: './external_assets/images/vidar.svg',
					dest: './static/',
					force: true
				}
			],
			copyOnce: true
		})
	],
	resolve: {
		alias: {
			src: path.resolve('src/')
		}
	},
	server: {
		fs: {
			allow: ['./event_data', './external_assets']
		}
	}
};

export default config;
