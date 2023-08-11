import tags from '../lib/jsons/tags.json';
import authors from '../lib/jsons/authors.json';

export const prerender = true;
export const trailingSlash = 'always';

export async function load() {
	return {
		tags,
		authors
	};
}
