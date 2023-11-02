import { configureStore } from '@reduxjs/toolkit';
import hackerNewsReducer from '../../features/ingress/hacker-news/slice';
import { RootState } from './store-types';

export const store = configureStore<RootState>({
	reducer: {
		hackerNews: hackerNewsReducer
	}
});

export type AppDispatch = typeof store.dispatch;