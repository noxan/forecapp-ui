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

interface ColumnConfiguration {
  identifier: string;
  name: string;
}

interface ColumnConfigurations {
  [key: string]: ColumnConfiguration;
}

interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  columns?: ColumnConfigurations;
  main?: any[];
  result?: any[];
}

const initialState: DatasetsState = {
  status: "idle",
};

export const datasetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    applyTransforms: () => undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(importDataset.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.raw = payload as any;
      // TODO: handle datasets without header column
      const columns: ColumnConfigurations = {};
      Object.keys(payload[0]).forEach((key) => {
        columns[key] = { identifier: key, name: key };
      });
      state.columns = columns;
    });
    builder.addCase(importDataset.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
