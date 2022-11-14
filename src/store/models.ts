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
    events: [
      {
        name: "playoff",
        // TODO: name (or some other identifier) must be matched with column name
        dates: ["2022-01-21", "2022-02-07"],
        mode: undefined, // additive or multiplicative
        lowerWindow: undefined,
        upperWindow: undefined,
        regularization: undefined,
      },
    ],
    holidays: {},
    futureRegressors: {},
    laggedRegressors: {},
  },
  reducers: {
    editModelConfig: (_, { payload: { updated_src: newState } }: any) =>
      newState,
  },
});

export const { editModelConfig } = modelSlice.actions;

export default modelSlice.reducer;
