import { redirect } from '@sveltejs/kit';

export const trailingSlash = 'always';
export const prerender = true;

export async function load({ url }) {
	const regex = new RegExp('^((/event/d*|/author/[a-z]*$)|[/]$|/404)', 'g');

	if (!regex.test(url.pathname)) {
		throw redirect(307, '/404');
	}
}
