import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { parse } from "papaparse";

export const importDataset = createAsyncThunk(
  "datasets/importDataset",
  async (url: string) =>
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

interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
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
      state.raw = payload as any;
    });
  },
});

export const { applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
