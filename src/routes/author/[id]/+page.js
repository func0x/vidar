const findAuthorById = (id, authors) => {
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
	const { all, authors } = await parent();

	return {
		author: findAuthorById(params.id, authors),
		events: findAuthorEvents(params.id, all.events)
	};
}
