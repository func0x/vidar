import adapter from '@sveltejs/adapter-static';
import authors from './src/lib/jsons/authors.json' assert { type: 'json' };
import fs from 'fs/promises';
import path from 'path';
import { replaceParamUrl } from './src/utils/replace.js';

const jsons = await fs.readdir('./event_data');
let data = [];

for (const file of jsons.filter((x) => !x.includes('.json'))) {
	try {
		const fileData = await fs.readFile(path.join('./event_data', file, '/data.json'));
		const json = JSON.parse(fileData.toString());
		data = [...data, json];
	} catch (error) {
		console.log('Cannot find:', path.join('./event_data', file, '/data.json'));
	}
}

export default {
	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: [
				...authors.map(({ id }) => `/author/${id}`),
				...data.map((event) => `/event/${replaceParamUrl(event.title)}`),
				'/search'
			],
			crawl: false
		}
	}
};
