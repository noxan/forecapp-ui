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
      changepoints: 2,
    },
    autoRegression: {
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
    editModelConfig: (state, { payload }) => ({ ...state, ...payload }),
    editModelConfigJsonView: (_, { payload: { updated_src: newState } }: any) =>
      newState,
  },
});

export const { editModelConfig, editModelConfigJsonView } = modelSlice.actions;

export default modelSlice.reducer;
