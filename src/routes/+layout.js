import { redirect } from '@sveltejs/kit';
import { eventsStore, jsonEvents } from 'src/stores/Data';
import tags from '$lib/jsons/tags.json';
import authors from '$lib/jsons/authors.json';

export const prerender = true;
export const trailingSlash = 'always';

const importEvents = async () => {
	let event;

	const events = await jsonEvents();
	eventsStore.set(
		events.filter((x) => x.upcoming === false).sort((a, b) => (a.datetime < b.datetime ? 1 : -1))
	);

	event = events.filter((x) => x.upcoming === true);

	if (event.length !== 0) {
		event = event.reduce((x, y) => (x.datetime > y.datetime ? x : y));
	}

	return { events, event };
};

export async function load({ url }) {
	const regex = new RegExp('^((/event/[a-zA-Z]*|/author/[a-z]*/?$)|[/]$|/404|/search)', 'g');

	if (!regex.test(url.pathname)) {
		throw redirect(307, '/404');
	} else {
		return {
			all: importEvents(),
			tags,
			authors
		};
	}
}
