import { DateTime } from 'luxon';

export const formatTimestamp = (timestamp) => {
	return DateTime.fromMillis(timestamp * 1000, {
		zone: 'Europe/Warsaw',
		locale: 'pl-PL'
	}).toFormat('yyyy-MM-dd HH:mm ZZZZ');
};
