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
import storage from "reduxjs-toolkit-persist/lib/storage";
import datasets from "./datasets";
import models from "./models";

export const databaseName = "forecapp-db";

const isSSR = typeof window === "undefined";

const configurePersistedReducers = () => {
  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducers = persistReducer(persistConfig, reducers);

  return persistedReducers;
};

const configureDatasetReducer = () => {
  const storageIndexedDB = require("redux-persist-indexeddb-storage").default;

  const datasetsPersistConfig = {
    key: "datasets",
    storage: storageIndexedDB(databaseName),
  };

  return persistReducer(datasetsPersistConfig, datasets);
};

const reducers = combineReducers({
  datasets: isSSR ? datasets : configureDatasetReducer(),
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
