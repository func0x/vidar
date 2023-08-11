import authors from '$lib/images/authors.json';
import { jsonEvents } from 'src/stores/Data';

const findAuthorByName = (nameParam) => {
	return authors.find((item) => {
		return item.name === nameParam;
	});
};

const findAuthorEvents = async (nameParam) => {
	let events = [];
	await jsonEvents().then((res) => (events = res));

	return events.filter((item) => {
		return item.authors.find((author) => {
			return author.name === nameParam;
		});
	});
};

export function load({ params }) {
	return {
		author: findAuthorByName(params.id),
		events: findAuthorEvents(params.id)
	};
}
