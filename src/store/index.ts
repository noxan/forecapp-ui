import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import datasets from "./datasets";
import transforms from "./transforms";
import models from "./models";

const isSSR = typeof window === "undefined";

const configurePersistedReducers = () => {
  const storageIndexedDB = require("redux-persist-indexeddb-storage").default;

  const persistConfig = {
    key: "root",
    storage: storageIndexedDB("forecapp-db"),
  };

  const persistedReducers = persistReducer(persistConfig, reducers);

  return persistedReducers;
};

const reducers = combineReducers({
  datasets,
  transforms,
  models,
});

const reducer = isSSR ? reducers : configurePersistedReducers();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
