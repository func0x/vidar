import { jsonEvents } from 'src/stores/Data';

const findEvent = async () => {
	const events = await jsonEvents();

	return events
		.reverse()
		.filter((e) => e.upcoming === false && e.video.title !== '')
		.slice(0, 3);
};

export async function load({ params }) {
	const event = await findEvent(params.id);

	if (event) {
		return {
			recentEvents: event
		};
	}
}
