import { DateTime } from 'luxon';
import { luxonTimeBack } from 'src/utils/date';
import { writable, derived } from 'svelte/store';
const modules = import.meta.glob('../../event_data/*/*.json');

export const eventsStore = writable([]);
export const selectedTagsStore = writable([]);
export const dateRangeStore = writable();
export const authorStore = writable('');
export const sortDirectionStore = writable('Latest');
export const dateTypeStore = writable('Any Time');

const replacePath = (path) => {
	return path.replace('../..', '').replace('/data.json', '');
};

async function getFromModules(res) {
	let array = [];
	let i = 0;
	for (const path in res) {
		i += 1;
		await res[path]().then((mod) => {
			array = [
				...array,
				{
					...mod.default,
					id: i,
					event_photo: `${replacePath(path)}/${mod.event_photo}`,
					assets: {
						slides: { path: `${replacePath(path)}/${mod.assets.slides}`, name: mod.assets.slides }
					},
					video: {
						...mod.video,
						name: `${replacePath(path)}/${mod.video.name}`,
						title: mod.video.name
					}
				}
			];
		});
	}

	return array;
}

async function importJsons() {
	return Promise.resolve(modules).then((res) => getFromModules(res));
}

export const jsonEvents = async () => {
	return await importJsons();
};

export const filtered = derived(
	[eventsStore, selectedTagsStore, authorStore, dateTypeStore, dateRangeStore],
	([$eventsStore, $selectedTagsStore, $authorStore, $dateTypeStore, $dateRangeStore]) => {
		let events = $eventsStore;

		events = events.filter((item) => {
			const isExist = item.authors.filter((y) => {
				return y.name.toLowerCase().includes($authorStore.toLowerCase());
			});
			return isExist.length !== 0;
		});

		if ($selectedTagsStore.length > 0) {
			events = events.filter(
				(e) => e.tags.some((t) => $selectedTagsStore.indexOf(t) >= 0) && e.upcoming === false
			);
		}

		if ($dateTypeStore === 'Last 30 days') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(30));
		} else if ($dateTypeStore === 'Last 3 months') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(90));
		} else if ($dateTypeStore === 'On...') {
			events = events.filter(
				(x) =>
					x.datetime >= $dateRangeStore.from &&
					x.datetime <=
						DateTime.fromMillis($dateRangeStore.from * 1000)
							.set({ hour: 23, minute: 59, second: 59 })
							.toMillis() /
							1000
			);
		} else if ($dateTypeStore === 'Before...') {
			events = events.filter((x) => x.datetime <= $dateRangeStore.from);
		} else if ($dateTypeStore === 'After...') {
			events = events.filter((x) => x.datetime >= $dateRangeStore.from);
		} else if ($dateTypeStore === 'Range') {
			events = events.filter(
				(x) => x.datetime >= $dateRangeStore.from && x.datetime <= $dateRangeStore.to
			);
		}

		return events;
	}
);
