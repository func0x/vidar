import { jsonEvents } from 'src/stores/Data';

const findEvent = async (id) => {
	const events = await jsonEvents();

	return events.find((item) => {
		return item.id === parseInt(id, 10);
	});
};

export function load({ params }) {
	return {
		event: findEvent(params.id)
	};
}
