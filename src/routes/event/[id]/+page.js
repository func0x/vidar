import { redirect } from '@sveltejs/kit';
import { jsonEvents } from 'src/stores/Data';

const findEvent = async (id) => {
	const events = await jsonEvents();

	const event = events.find((item) => {
		return item.id === parseInt(id, 10);
	});

	if (event !== undefined) {
		const recomendedEvents = events
			.filter((e) => e.tags.some((t) => event.tags.indexOf(t) >= 0))
			.filter((e) => e.title !== event.title);

		return { event, recomendedEvents };
	}

	return null;
};

export async function load({ params }) {
	const event = await findEvent(params.id);

	if (event) {
		return {
			eventWithRecomendations: event
		};
	}

	throw redirect(307, '/404');
}
