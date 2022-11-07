import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import datasets from "./datasets";
import transforms from "./transforms";
import models from "./models";

const reducers = combineReducers({
  datasets,
  transforms,
  models,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
