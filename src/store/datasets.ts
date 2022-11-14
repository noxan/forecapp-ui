import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parse } from "papaparse";
import { capitalize } from "../helpers";

export const importDataset = createAsyncThunk<any[], { source: string | File }>(
  "datasets/importDataset",
  async ({ source }) => {
    if (source instanceof File) {
      const text = await source.text();
      return await new Promise((resolve, reject) => {
        parse(text, {
          header: true,
          complete(results) {
            resolve(results.data as any);
          },
          error(error: Error) {
            reject(error);
          },
        });
      });
    } else {
      return await new Promise((resolve, reject) => {
        parse(source, {
          download: true,
          header: true,
          complete(results) {
            resolve(results.data as any);
          },
          error(err) {
            reject(err);
          },
        });
      });
    }
  }
);

export const neuralprophet = createAsyncThunk<
  object,
  { dataset: any[]; columns: ColumnConfigurations; configuration: object }
>("datasets/neuralprophet", async ({ dataset, columns, configuration }) => {
  const payload = {
    dataset,
    columns,
    configuration,
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prediction`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (res.status !== 200) {
    throw new Error(
      `Prediction from api failed with status code ${res.status} and message ${res.statusText}`,
      { cause: res }
    );
  }
  return await res.json();
});

// TODO: make sure special columns (time, value) can only be picked once, adjust definitions, e.g. unique = true
// TODO: add other NP features as functionalities for columns, e.g. lagged regressors, future regressors, events, etc.
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
  prediction?: object; // results dataset, alias predictions
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
    builder.addCase(neuralprophet.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.prediction = payload as any;
    });
    builder.addCase(neuralprophet.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(neuralprophet.rejected, (state, action) => {
      alert("Something went wrong: " + action.error?.message);
      state.status = "idle";
    });
  },
});

export const { resetColumns, updateColumnFunction, applyTransforms } =
  datasetSlice.actions;

export default datasetSlice.reducer;
