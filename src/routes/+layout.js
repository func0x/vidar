import { eventsStore, jsonEvents } from 'src/stores/Data';

import { authorsStore } from '../stores/Data';

export const prerender = true;
export const trailingSlash = 'always';

const importEvents = async (authors) => {
	let event;
	const events = await jsonEvents();

	authorsStore.set(authors);

	const filteredEvents = events.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));

	event = events.filter((x) => x.upcoming === true);

	if (event.length === 0) {
		event = filteredEvents[0];
	}

	if (event.length > 0) {
		event = event.reduce((x, y) => (x.datetime > y.datetime ? x : y));
	}

	eventsStore.set(filteredEvents);

	return { events, event };
};

export async function load({ url, data }) {
	const { tags, authors } = data;
	const regex = new RegExp('^((/event/[a-zA-Z]*|/author/[a-z]*/?$)|[/]$|/404|/search)', 'g');
	if (regex.test(url.pathname)) {
		return {
			all: importEvents(authors),
			tags,
			authors
		};
	}
}
