// since there's no dynamic data here, we can prerender

import { jsonEvents } from 'src/stores/Data';

// it so that it gets served as a static asset in production
export const prerender = true;

const importEvents = async () => {
	let event;
	let pastEvents = [];

	const events = await jsonEvents();

	event = events.filter((x) => {
		if (x.upcoming === true) {
			return true;
		} else {
			pastEvents = [...pastEvents, x];
			return false;
		}
	});

	if (event.length !== 0) {
		event = event.reduce((x, y) => (x.datetime < y.datetime ? x : y));
	}

	return { event, pastEvents };
};

export function load() {
	return {
		events: importEvents()
	};
}
