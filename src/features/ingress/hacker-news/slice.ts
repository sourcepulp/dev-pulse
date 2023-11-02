import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HackerNewsPost } from "./domain";

export const hackerNewsPostCRUDAdapter = createEntityAdapter<HackerNewsPost>();

const initialState = hackerNewsPostCRUDAdapter.getInitialState();

const hackerNewsPostSlice = createSlice({
	name: "hackerNewsPosts",
	initialState,
	reducers: {},
	extraReducers: {}
});

const { reducer } = hackerNewsPostSlice;
export default reducer;