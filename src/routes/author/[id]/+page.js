import authors from '$lib/jsons/authors.json';

const findAuthorById = (id) => {
	return authors.find((item) => {
		return item.id === id;
	});
};

const findAuthorEvents = async (id, events) => {
	return events.filter((item) => {
		return item.authors.find((author) => {
			return author.id === id;
		});
	});
};

export async function load({ params, parent }) {
	const { all } = await parent();

	return {
		author: findAuthorById(params.id),
		events: findAuthorEvents(params.id, all.events)
	};
}
