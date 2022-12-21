import { createSlice } from "@reduxjs/toolkit";

export type ModelState = {
  laggedRegressors: any[];
};

export const modelSlice = createSlice({
  name: "models",
  initialState: {
    forecasts: undefined,
    trend: {
      growth: "linear",
    },
    autoRegression: {
      lags: 0,
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
      epochs: "auto",
      batchSize: "auto",
    },
    events: [],
    holidays: [],
    futureRegressors: {},
    laggedRegressors: [],
  } as ModelState,
  reducers: {
    editModelConfig: (state, { payload }) => ({ ...state, ...payload }),
    editModelConfigJsonView: (_, { payload: { updated_src: newState } }: any) =>
      newState,
  },
});

export const { editModelConfig, editModelConfigJsonView } = modelSlice.actions;

export default modelSlice.reducer;
