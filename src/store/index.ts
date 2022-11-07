import { configureStore } from "@reduxjs/toolkit";
import datasets from "./datasets";
import transforms from "./transforms";

export const store = configureStore({
  reducer: {
    datasets,
    transforms,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
