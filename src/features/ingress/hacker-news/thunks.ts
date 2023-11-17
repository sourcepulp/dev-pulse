import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkRejection } from "../../../core/redux/thunk-types";
import { HackerNewsPost } from "./domain";
import { ApplicationContext } from "../../../core/application-context";

export const fetchPosts = createAsyncThunk<
	HackerNewsPost[],
	void,
	ThunkRejection
>("hackerNewsPosts/fetchPosts", async (_, { rejectWithValue }) => {
	const response = await ApplicationContext.get()
		.getHackerNewsRepository()
		.getAll()
		.catch((error) => {
			console.log(error);
			return rejectWithValue(error);
		});
	return response;
});

export const fetchPostById = createAsyncThunk<
	HackerNewsPost,
	{ id: string | number },
	ThunkRejection
>(
	"hackerNewsPosts/fetchOne",
	async (payload: { id: string | number }, { rejectWithValue }) => {
		const response = ApplicationContext.get()
			.getHackerNewsRepository()
			.getOneById(payload.id)
			.catch((error) => {
				console.log(error);
				return rejectWithValue(error);
			});
		return response;
	}
);
