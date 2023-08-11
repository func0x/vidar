import { writable, derived } from 'svelte/store';
const modules = import.meta.glob('../lib/event_data/*/*.json');

export const eventsStore = writable([]);
export const selectedTagsStore = writable([]);
export const dateRangeStore = writable();
export const authorStore = writable('');
export const sortDirectionStore = writable('Latest');

const replacePath = (path) => {
	return path.replace('../', '').replace('/data.json', '');
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
					event_photo: `/src/${replacePath(path)}/${mod.event_photo}`,
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
	[eventsStore, selectedTagsStore, dateRangeStore, authorStore],
	([$eventsStore, $selectedTagsStore, $dateRangeStore, $authorStore]) => {
		let events = $eventsStore;

		if ($dateRangeStore && $dateRangeStore.from && $dateRangeStore.to) {
			if ($dateRangeStore.from < $dateRangeStore.to) {
				events = events.filter((item) => {
					return item.datetime >= $dateRangeStore.from && item.datetime <= $dateRangeStore.to;
				});
			} else {
				events = events.filter((item) => {
					return item.datetime >= $dateRangeStore.to && item.datetime <= $dateRangeStore.from;
				});
			}
		}

		if ($dateRangeStore && $dateRangeStore.from && isNaN($dateRangeStore.to)) {
			events = events.filter((item) => {
				return item.datetime >= $dateRangeStore.from;
			});
		}

		if ($dateRangeStore && $dateRangeStore.to && isNaN($dateRangeStore.from)) {
			events = events.filter((item) => {
				return item.datetime <= $dateRangeStore.to;
			});
		}

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

		return events;
	}
);
