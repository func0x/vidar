import { redirect } from '@sveltejs/kit';
import { jsonEvents } from 'src/stores/Data';

export const trailingSlash = 'always';
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

	return { events, event, pastEvents };
};

export async function load({ url }) {
	const regex = new RegExp('^((/event/d*|/author/[a-z]*/?$)|[/]$|/404)', 'g');

	if (!regex.test(url.pathname)) {
		throw redirect(307, '/404');
	} else {
		return {
			all: importEvents()
		};
	}
}
