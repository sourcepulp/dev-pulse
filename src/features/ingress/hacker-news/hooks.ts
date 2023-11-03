import { useSelector } from "react-redux"
import { selectAllPosts } from "./selectors"
import { useAppDispatch } from "../../../core/redux/hooks";
import { fetchPosts } from "./thunks";
import { useEffect } from "react";

type HookOptions = {
	prefetch?: boolean;
} | undefined;

const useHackerNewsPosts = (options: HookOptions) => {
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

export default useHackerNewsPosts;