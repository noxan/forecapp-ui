import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

import { forecappApi } from "./forecappApi";

forecappApi.endpoints.predictionPredictionPost.useMutation;

export type ModelState = {
  laggedRegressors: any[];
  holidays: string[];
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
      learningRate: undefined,
      epochs: 20,
      batchSize: undefined,
      earlyStopping: true,
    },
    events: [],
    holidays: [],
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
