import { DateTime } from 'luxon';

export const formatTimestamp = (timestamp) => {
	return DateTime.fromMillis(timestamp * 1000, {
		zone: 'Europe/Warsaw',
		locale: 'pl-PL'
	}).toFormat('yyyy-MM-dd HH:mm ZZZZ');
};

export const luxonTimeBack = (days) => {
	return (
		DateTime.now().set({ hour: 0, minute: 0, second: 0 }).minus({ days: days }).toMillis() / 1000
	);
};

export const jsDateToLuxonTimestamp = (jsDate, type) => {
	switch (type) {
		case 'from':
			return DateTime.fromJSDate(jsDate).set({ hour: 0, minute: 0, second: 0 }).toMillis() / 1000;

		case 'to':
			return (
				DateTime.fromJSDate(jsDate).set({ hour: 23, minute: 59, second: 59 }).toMillis() / 1000
			);
		default:
			return DateTime.fromJSDate(jsDate).toMillis() / 1000;
	}
};

export const getDayAndMonthJsDate = (jsDate) => {
	if (jsDate) {
		return DateTime.fromJSDate(jsDate, {
			zone: 'Europe/Warsaw',
			locale: 'pl-PL'
		}).toFormat('yyyy-MM-dd ');
	}
};
