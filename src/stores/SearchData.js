import { DateTime } from 'luxon';
import { jsDateToLuxonTimestamp, luxonTimeBack } from 'src/utils/date';
import { writable, derived } from 'svelte/store';

export const searchedEventsStore = writable([]);
export const searchedSelectedTagsStore = writable([]);
export const searchedDateRangeStore = writable({ start_date: null, end_date: null });
export const searchedAuthorStore = writable('');
export const searchedSortDirectionStore = writable('Latest');
export const searchedDateTypeStore = writable('Any Time');

export const searchedFiltered = derived(
	[
		searchedEventsStore,
		searchedSelectedTagsStore,
		searchedAuthorStore,
		searchedDateTypeStore,
		searchedDateRangeStore,
		searchedSortDirectionStore
	],
	([
		$searchedEventsStore,
		$searchedSelectedTagsStore,
		$searchedAuthorStore,
		$searchedDateTypeStore,
		$searchedDateRangeStore,
		$searchedSortDirectionStore
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
					$searchedSelectedTagsStore.every((t) => e.tags.indexOf(t) >= 0) && e.upcoming === false
			);
		}

		if ($searchedDateTypeStore === 'Last 30 days') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(30));
		} else if ($searchedDateTypeStore === 'Last 3 months') {
			events = events.filter((x) => x.datetime >= luxonTimeBack(90));
		} else if ($searchedDateTypeStore === 'On' && $searchedDateRangeStore.start_date) {
			events = events.filter(
				(x) =>
					x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.start_date, 'from') &&
					x.datetime <=
						DateTime.fromJSDate($searchedDateRangeStore.start_date)
							.set({ hour: 23, minute: 59, second: 59 })
							.toMillis() /
							1000
			);
		} else if ($searchedDateTypeStore === 'Before' && $searchedDateRangeStore.start_date) {
			events = events.filter(
				(x) => x.datetime <= jsDateToLuxonTimestamp($searchedDateRangeStore.start_date, 'to')
			);
		} else if ($searchedDateTypeStore === 'After' && $searchedDateRangeStore.start_date) {
			events = events.filter(
				(x) => x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.start_date, 'to')
			);
		} else if (
			$searchedDateTypeStore === 'Range' &&
			$searchedDateRangeStore.start_date &&
			$searchedDateRangeStore.end_date
		) {
			events = events.filter(
				(x) =>
					x.datetime >= jsDateToLuxonTimestamp($searchedDateRangeStore.start_date, 'from') &&
					x.datetime <= jsDateToLuxonTimestamp($searchedDateRangeStore.end_date, 'to')
			);
		}

		if ($searchedSortDirectionStore === 'Latest') {
			return events.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));
		}

		return events.sort((a, b) => (a.datetime < b.datetime ? -1 : 1));
	}
);
