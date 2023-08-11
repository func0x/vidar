import { redirect } from '@sveltejs/kit';
import { replaceParamUrl } from 'src/utils/replace';

const findEvent = async (title, events) => {
	const event = events.find((item) => {
		return replaceParamUrl(item.title) === title;
	});

	if (event !== undefined) {
		const recomendedEvents = events
			.filter((e) => e.tags.some((t) => event.tags.indexOf(t) >= 0))
			.filter((e) => e.title !== event.title)
			.filter((e) => e.upcoming === false)
			.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));

		return { event, recomendedEvents };
	}

	return null;
};

export async function load({ params, parent }) {
	const { all } = await parent();
	const event = await findEvent(params.id, all.events);

	if (event) {
		return {
			eventWithRecomendations: event
		};
	}

	throw redirect(307, '/404');
}
