import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HackerNewsPost } from "./domain";
import { fetchPostById, fetchPosts } from "./thunks";

export const hackerNewsPostCRUDAdapter = createEntityAdapter<HackerNewsPost>();

const initialState = hackerNewsPostCRUDAdapter.getInitialState();

const hackerNewsPostSlice = createSlice({
  name: "hackerNewsPosts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      hackerNewsPostCRUDAdapter.upsertMany(
        state,
        action.payload.map((post) => ({ ...post, id: post.story_id }))
      );
    });
    builder.addCase(
      fetchPostById.fulfilled,
      hackerNewsPostCRUDAdapter.upsertOne
    );
  },
});

const { reducer } = hackerNewsPostSlice;
export default reducer;
