export type HackerNewsId = string;

export type HackerNewsPost = {
  id: HackerNewsId;
  objectID: HackerNewsId;
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
