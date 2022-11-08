import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parse } from "papaparse";

export const importDataset = createAsyncThunk<any[], { url: string }>(
  "datasets/importDataset",
  async ({ url }) =>
    await new Promise((resolve, reject) => {
      parse(url, {
        download: true,
        header: true,
        complete(results, file) {
          resolve(results.data as any);
        },
        error(err, file) {
          reject(err);
        },
      });
    })
);

export interface ColumnConfiguration {
  identifier: string;
  name: string;
  validation?: {
    checks: undefined;
    type: undefined;
  };
  functionality?: "time" | "value";
}

export interface ColumnConfigurations {
  [key: string]: ColumnConfiguration;
}

export interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  columns?: ColumnConfigurations;
  main?: any[];
  result?: any[];
}

const initialState = {
  status: "idle",
} as DatasetsState;

export const datasetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    resetColumns: (state) => {
      if (!state.raw) {
        // reset columns if there is no dataset
        state.columns = undefined;
      } else {
        // TODO: handle datasets without header column
        const columns: ColumnConfigurations = {};
        Object.keys(state.raw[0]).forEach((key) => {
          columns[key] = { identifier: key, name: key };
        });
        state.columns = columns;
      }
    },
    applyTransforms: () => undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(importDataset.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.raw = payload as any;
    });
    builder.addCase(importDataset.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
