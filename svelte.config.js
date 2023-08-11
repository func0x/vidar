import adapter from '@sveltejs/adapter-static';
import authors from './src/lib/jsons/authors.json' assert { type: 'json' };
import fs from 'fs/promises';
import path from 'path';
import { replaceParamUrl } from './src/utils/replace.js';

const jsons = await fs.readdir('./event_data');
let data = [];

for (const file of jsons.filter((x) => !x.includes('.json'))) {
	const fileData = await fs.readFile(path.join('./event_data', file, '/data.json'));
	const json = JSON.parse(fileData.toString());
	data = [...data, json];
}

// jsons.filter((x) => !x.includes('.json')).forEach(async (file) => {});

export default {
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			// entries: ['/author/[id]', '/event/[id]', '/author', '/event', '/404'],
			entries: [
				...authors.map(({ id }) => `/author/${id}`),
				// await jsonEvents().map(({ id }) => `/event/${id}`),
				// ...getEvents.map((event, index) => `/event/${replaceParamUrl(event.title)}`),
				// ...data.map((event) => `/event/${replaceParamUrl(event.title)}`),
				// ...data.map((event) => console.log(event.title)),

				...data.map((event) => `/event/${replaceParamUrl(event.title)}`),
				'/event/[id]',
				'/author',
				'/event',
				'/404'
			],
			crawl: true
		}
	}
};
