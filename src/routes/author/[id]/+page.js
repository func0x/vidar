import authors from '$lib/images/authors.json';
import { jsonEvents } from 'src/stores/Data';

const findAuthorById = (id) => {
	return authors.find((item) => {
		return item.id === id;
	});
};

const findAuthorEvents = async (id) => {
	let events = [];
	await jsonEvents().then((res) => (events = res));

	return events.filter((item) => {
		return item.authors.find((author) => {
			return author.id === id;
		});
	});
};

export function load({ params }) {
	return {
		author: findAuthorById(params.id),
		events: findAuthorEvents(params.id)
	};
}
