import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SELECT_STATE_INITIALIZE } from "../definitions";
import { parse } from "../parser";

export const importDataset = createAsyncThunk<any[], { source: string | File }>(
  "datasets/importDataset",
  async ({ source }) => {
    if (source instanceof File) {
      const text = await source.text();
      return await parse(text.trim());
    }
    return await parse(source, { download: true });
  }
);

type PredictionQueryArg = { dataset: any[]; configuration: object };

export const apiPrediction = createAsyncThunk<any, PredictionQueryArg>(
  "datasets/apiPrediction",
  async (payload) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prediction`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return await res.json();
  }
);

export interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  columns: {
    timeColumn: string;
    targetColumn: string;
  };
  prediction?: object; // results dataset, alias predictions
}

const initialState = {
  status: "idle",
  columns: {
    timeColumn: SELECT_STATE_INITIALIZE,
  },
} as DatasetsState;

export const datasetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    // TODO: reset column configuration on new dataset import
    resetColumnConfiguration: (state) => {
      state.columns = initialState.columns;
    },
    setTimeColumn: (state, action: { payload: string }) => {
      state.columns.timeColumn = action.payload;
    },
    setTargetColumn: (state, action) => {
      state.columns.targetColumn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(importDataset.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.raw = payload as any;
    });
    builder.addCase(importDataset.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(apiPrediction.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.prediction = payload as any;
    });
    builder.addCase(apiPrediction.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(apiPrediction.rejected, (state, action) => {
      alert("API request failed" + action.error);
      state.status = "idle";
    });
  },
});

export const { resetColumnConfiguration, setTimeColumn, setTargetColumn } =
  datasetSlice.actions;

export default datasetSlice.reducer;
