export type HackerNewsId = number;

export type HackerNewsPost = {
	id: HackerNewsId;
	story_id: HackerNewsId;
	created_at: string;
	author: string;
	text: string;
	title: string;
	points: number;
	parent_id?: HackerNewsId;
	children?: HackerNewsPost[];
};

export type HackerNewsResponse = {
	hits: HackerNewsPost[];
};