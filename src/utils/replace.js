export const replaceParamUrl = (param) => {
	return param
		.toLowerCase()
		.replace(' ', '-')
		.replace(/[^a-zA-Z0-9-_]/g, '-');
};
