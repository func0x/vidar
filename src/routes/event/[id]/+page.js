import { jsonEvents } from 'src/stores/Data';

const findEvent = async (id) => {
	const events = await jsonEvents();

	const event = events.find((item) => {
		return item.id === parseInt(id, 10);
	});

	const recomendedEvents = events
		.filter((e) => e.tags.some((t) => event.tags.indexOf(t) >= 0))
		.filter((e) => e.title !== event.title);

	return { event, recomendedEvents };
};

export function load({ params }) {
	return {
		eventWithRecomendations: findEvent(params.id)
	};
}
