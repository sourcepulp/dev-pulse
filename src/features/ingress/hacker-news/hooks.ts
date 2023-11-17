import { useSelector } from "react-redux";
import { selectAllPosts, selectPostById } from "./selectors";
import { useAppDispatch } from "../../../core/redux/hooks";
import { fetchPostById, fetchPosts } from "./thunks";
import { useCallback, useEffect } from "react";
import { HackerNewsPost } from "./domain";
import { RootState } from "../../../core/redux/store-types";

type HookOptions =
	| {
		prefetch?: boolean;
	}
	| undefined;

export const useHackerNewsPosts = (options: HookOptions) => {
	const posts = useSelector(selectAllPosts);
	const appDispatch = useAppDispatch();

	const fetch = async () => {
		appDispatch.setStatusLoading();
		await appDispatch.dispatch(fetchPosts());
		appDispatch.setStatusSuccess();
	};

	useEffect(() => {
		if (options?.prefetch) {
			fetch();
		}
	}, []);

	return { posts, fetch };
};

export const useHackerNewsPost = (
	id: string | number
): {
	hackerNewsPost: HackerNewsPost | undefined;
} => {
	const appDispatch = useAppDispatch();
	const hackerNewsPost = useSelector((state: RootState) =>
		selectPostById(state, id)
	);
	const fetchPost = useCallback(
		async (postId: string | number) => {
			await appDispatch.dispatch(fetchPostById({ id: postId }));
		},
		[appDispatch.dispatch]
	);

	useEffect(() => {
		if (!hackerNewsPost) {
			fetchPost(id);
		}
	}, [hackerNewsPost, id, fetchPost]);

	return {
		hackerNewsPost,
	};
};
