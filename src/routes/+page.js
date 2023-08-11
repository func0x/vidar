// since there's no dynamic data here, we can prerender

// it so that it gets served as a static asset in production
// export const prerender = true;
export const prerender = false;

export async function load({ url }) {
	const regex = new RegExp('^((/event/[a-zA-Z]*|/author/[a-z]*/?$)|[/]$|/404|/search)', 'g');

	if (!regex.test(url.pathname)) {
		throw Error('/404');
	}
}
