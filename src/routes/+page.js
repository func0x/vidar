export async function load({ url }) {
	const regex = new RegExp('^((/event/[a-zA-Z]*|/author/[a-z]*/?$)|[/]$|/404|/search)', 'g');

	if (!regex.test(url.pathname)) {
		throw Error('/404');
	}
}
