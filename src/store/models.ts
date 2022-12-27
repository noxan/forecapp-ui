import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

import { api } from "./api";

export type ModelState = {};

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
      learningRate: undefined,
      epochs: 20,
      batchSize: undefined,
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
