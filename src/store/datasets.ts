import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parse } from "papaparse";
import { capitalize } from "../helpers";

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

// TODO: make sure special columns (time, value) can only be picked once, adjust definitions, e.g. unique = true
export const columnFunctionalities = [undefined, "time", "value"] as const;
export type ColumnFunctionalities = typeof columnFunctionalities[number];

export interface ColumnConfiguration {
  identifier: string;
  name: string;
  validation?: {
    checks: undefined;
    type: undefined;
  };
  functionality: ColumnFunctionalities;
}

export interface ColumnConfigurations {
  [key: string]: ColumnConfiguration;
}

export interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  columns?: ColumnConfigurations;

  // main?: any[]; // processed dataset
  // result?: any[]; // results dataset, alias predictions
}

const initialState = {
  status: "idle",
} as DatasetsState;

const commonColumnNames = {
  time: ["ds", "time", "timestamp", "date", "datetime"],
  value: ["y", "value"],
};

const mapColumnNameToFunctionality = (name: string): ColumnFunctionalities => {
  const lowerName = name.toLowerCase();
  for (const [functionality, names] of Object.entries(commonColumnNames)) {
    if (names.includes(lowerName)) {
      return functionality as ColumnFunctionalities;
    }
  }
  return undefined;
};

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
          columns[key] = {
            identifier: key,
            name: capitalize(key),
            functionality: mapColumnNameToFunctionality(key),
          };
        });
        state.columns = columns;
      }
    },
    updateColumnFunction: (
      state,
      {
        type,
        payload: { identifier, value },
      }: PayloadAction<{ identifier: string; value: ColumnFunctionalities }>
    ) => {
      if (!state.columns) {
        state.columns = {};
      }
      state.columns[identifier].functionality = value;
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

export const { resetColumns, updateColumnFunction, applyTransforms } =
  datasetSlice.actions;

export default datasetSlice.reducer;
