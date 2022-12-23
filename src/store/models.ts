import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

export type ModelState = {
  laggedRegressors: any[];
};

export const modelSlice = createSlice({
  name: "models",
  initialState: {
    forecasts: undefined,
    trend: {
      growth: "linear",
      changepoints: 2,
    },
    autoregression: {
      lags: undefined,
      regularization: 0,
    },
    seasonality: {
      mode: "additive",
      daily: "auto",
      weekly: "auto",
      yearly: "auto",
    },
    training: {
      learningRate: "auto",
      epochs: 20,
      batchSize: "auto",
      earlyStopping: true,
    },
    events: [],
    holidays: [],
    futureRegressors: {},
    laggedRegressors: [],
  } as ModelState,
  reducers: {
    editModelConfig: (state, { payload }) => merge(state, payload),
    editModelConfigJsonView: (_, { payload: { updated_src: newState } }: any) =>
      newState,
  },
});

export const { editModelConfig, editModelConfigJsonView } = modelSlice.actions;

export default modelSlice.reducer;
