const findEventsByTitle = (eventsData, titleParam) => {
	return eventsData.filter((item) => {
		return item.title.toLowerCase().includes(titleParam.toLowerCase());
	});
};

export async function load({ url, parent }) {
	const { all } = await parent();

	return {
		query: url.searchParams.get('query').replace(/"/g, ''),
		results: findEventsByTitle(all.events, url.searchParams.get('query').replace(/"/g, ''))
	};
}
