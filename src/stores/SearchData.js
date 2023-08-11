import { DateTime } from 'luxon';
import { jsDateToLuxonTimestamp, luxonTimeBack } from 'src/utils/date';
import { writable, derived } from 'svelte/store';

export const searchedEventsStore = writable([]);
export const searchedSelectedTagsStore = writable([]);
export const searchedDateRangeStore = writable({ from: null, to: null });
export const searchedAuthorStore = writable('');
export const searchedSortDirectionStore = writable('Latest');
export const searchedDateTypeStore = writable('Any Time');

export const searchedFiltered = derived(
	[
		searchedEventsStore,
		searchedSelectedTagsStore,
		searchedAuthorStore,
		searchedDateTypeStore,
		searchedDateRangeStore
	],
	([
		$searchedEventsStore,
		$searchedSelectedTagsStore,
		$searchedAuthorStore,
		$searchedDateTypeStore,
		$searchedDateRangeStore
	]) => {
		let events = $searchedEventsStore;

		events = events.filter((item) => {
			const isExist = item.authors.filter((y) => {
				return y.name.toLowerCase().includes($searchedAuthorStore.toLowerCase());
			});
			return isExist.length !== 0;
		});

		if ($searchedSelectedTagsStore.length > 0) {
			events = events.filter(
				(e) =>
					e.tags.some((t) => $searchedSelectedTagsStore.indexOf(t) >= 0) && e.upcoming === false
			);
		}

		if ($searchedDateTypeStore === 'Last 30 days') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(30));
		} else if ($searchedDateTypeStore === 'Last 3 months') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(90));
		} else if ($searchedDateTypeStore === 'On' && $searchedDateRangeStore.from) {
			events = events.filter(
				(x) =>
					x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.from, 'from') &&
					x.datetime <=
						DateTime.fromJSDate($searchedDateRangeStore.from)
							.set({ hour: 23, minute: 59, second: 59 })
							.toMillis() /
							1000
			);
		} else if ($searchedDateTypeStore === 'Before' && $searchedDateRangeStore.from) {
			events = events.filter(
				(x) => x.datetime <= jsDateToLuxonTimestamp($searchedDateRangeStore.from, 'to')
			);
		} else if ($searchedDateTypeStore === 'After' && $searchedDateRangeStore.from) {
			events = events.filter(
				(x) => x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.from, 'to')
			);
		} else if (
			$searchedDateTypeStore === 'Range' &&
			$searchedDateRangeStore.from &&
			$searchedDateRangeStore.to
		) {
			events = events.filter(
				(x) =>
					x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.from, 'from') &&
					x.datetime <= jsDateToLuxonTimestamp($searchedDateRangeStore.to, 'to')
			);
		}

		return events;
	}
);
