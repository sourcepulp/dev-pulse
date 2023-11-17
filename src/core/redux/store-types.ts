import { HackerNewsState } from "../../features/ingress/hacker-news/store-types"
import { ApiError } from "../hooks/error-hook";
import { SliceStatus } from "./slice-types";

export interface CoreState {
	error: ApiError | null;
	status: SliceStatus;
	mobileMenuOpen: boolean;
}

export type RootState = {
	hackerNews: HackerNewsState;
}