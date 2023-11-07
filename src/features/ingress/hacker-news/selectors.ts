import { RootState } from "../../../core/redux/store-types";
import { hackerNewsPostCRUDAdapter } from "./slice";

export const {
	selectById: selectPostById,
	selectIds: selectPostIds,
	selectEntities: selectPostEntities,
	selectAll: selectAllPosts,
	selectTotal: selectTotalPosts,
} = hackerNewsPostCRUDAdapter.getSelectors<RootState>((state) => state.hackerNews);
