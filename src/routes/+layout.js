import { redirect } from '@sveltejs/kit';
import { eventsStore, jsonEvents } from 'src/stores/Data';
import tags from '$lib/jsons/tags.json';
import authors from '$lib/jsons/authors.json';

export const trailingSlash = 'always';
export const prerender = true;

const importEvents = async () => {
	let event;

	const events = await jsonEvents();
	eventsStore.set(
		events.filter((x) => x.upcoming === false).sort((a, b) => a.datetime < b.datetime)
	);

	const now = Date.now() / 1000;

	event = events.filter((x) => x.upcoming === true && x.datetime < now);

	if (event.length !== 0) {
		event = event.reduce((x, y) => (x.datetime > y.datetime ? x : y));
	}

	return { events, event };
};

export async function load({ url }) {
	const regex = new RegExp('^((/event/d*|/author/[a-z]*/?$)|[/]$|/404)', 'g');

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
