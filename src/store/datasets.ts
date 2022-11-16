import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const apiPrediction = createAsyncThunk<
  object,
  { dataset: any[]; configuration: object }
>("datasets/neuralprophet", async ({ dataset, configuration }) => {
  const payload = {
    dataset,
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

export interface DatasetsState {
  status: "idle" | "loading";
  raw?: any[];
  prediction?: object; // results dataset, alias predictions
}

const initialState = {
  status: "idle",
} as DatasetsState;

export const datasetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {},
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
      alert("Something went wrong: " + action.error?.message);
      state.status = "idle";
    });
  },
});

export const {} = datasetSlice.actions;

export default datasetSlice.reducer;
