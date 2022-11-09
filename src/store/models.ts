import { createSlice } from "@reduxjs/toolkit";

export const modelSlice = createSlice({
  name: "models",
  initialState: {
    growth: "linear",
    seasonality: {
      mode: "additive",
      daily: "auto",
      weekly: "auto",
      yearly: "auto",
    },
    training: {
      learningRate: "auto",
      epochs: 1, // "auto",
      batchSize: "auto",
    },
    events: {},
    holidays: {},
    futureRegressors: {},
    laggedRegressors: {},
  },
  reducers: {},
});

export const {} = modelSlice.actions;

export default modelSlice.reducer;
