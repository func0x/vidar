import adapter from '@sveltejs/adapter-static';
import authors from './src/lib/jsons/authors.json' assert { type: 'json' };
import fs from 'fs/promises';

const getEvents = await fs.readdir('./event_data');

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
				...getEvents.map((_, index) => `/event/${index + 1}`),
				'/event/[id]',
				'/author',
				'/event',
				'/404'
			],
			crawl: true
		}
	}
};
