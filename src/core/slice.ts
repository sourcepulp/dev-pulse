import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoreState } from "./redux/store-types";
import { ApiError } from "./hooks/error-hook";

const initialState: CoreState = {
	error: null,
	status: "success",
	mobileMenuOpen: false
};

const coreSlice = createSlice({
	name: "core",
	initialState,
	reducers: {
		setError: (state: CoreState, { payload }: PayloadAction<ApiError>) => {
			state.error = payload;
		}
	}
});

const { actions, reducer } = coreSlice;
export default reducer;
export const { setError } = actions;
