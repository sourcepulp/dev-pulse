export type HackerNewsId = number;

export type HackerNewsPost = {
	id: HackerNewsId;
	created_at: string;
	author: string;
	text: string;
	points: number;
	parent_id?: HackerNewsId;
	children?: HackerNewsPost[];
};