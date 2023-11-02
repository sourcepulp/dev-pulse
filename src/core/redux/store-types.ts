import { HackerNewsState } from "../../features/ingress/hacker-news/store-types"

export type RootState = {
	hackerNews: HackerNewsState;
}