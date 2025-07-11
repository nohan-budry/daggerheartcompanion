// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare module 'virtual:dh-search-index' {
		declare class SearchIndex {
			name: string;
			path: string;
			description: string;
			source: string;
		}
		const searchIndex: SearchIndex[];
		export default searchIndex;
	}
}

export {};


