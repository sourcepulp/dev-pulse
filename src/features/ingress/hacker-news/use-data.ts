import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../core/redux/hooks";
import { useHackerNewsPosts } from "./hooks";

const usePostsData = (): {
	fetch: () => Promise<void>;
	isLoading: boolean;
} => {
	const appDispatch = useAppDispatch();
	const posts = useHackerNewsPosts({ prefetch: true });

	const fetch = useCallback(async () => {
		appDispatch.setStatusLoading();
		await posts.fetch();
		appDispatch.setStatusSuccess();
	}, []);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		fetch,
		isLoading: appDispatch.isLoading
	};
};

export default usePostsData;
