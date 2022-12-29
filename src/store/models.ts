import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

import { forecappApi } from "./forecappApi";

forecappApi.endpoints.predictionPredictionPost.useMutation;

export type ModelState = {
  forecasts?: number;
  trend: {
    growth: "off" | "linear";
    numberOfChangepoints: number;
  };
  autoregression: {
    lags?: number;
    regularization: number;
  };
  seasonality: {
    daily: any;
    weekly: any;
    yearly: any;
  };
  training: {
    earlyStopping: boolean;
    epochs: any;
    batchSize: any;
    learningRate: any;
  };
  laggedRegressors: any[];
  holidays: string[];
  events: any[];
};

export const modelSlice = createSlice({
  name: "models",
  initialState: {
    forecasts: undefined,
    trend: {
      growth: "linear",
      numberOfChangepoints: 0,
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
    laggedRegressors: [],
    holidays: [],
    events: [],
  } as ModelState,
  reducers: {
    editModelConfig: (state, { payload }) => {
      const keys = Object.keys(payload);
      if (keys.includes("laggedRegressors")) {
        const { laggedRegressors } = payload;
        state.laggedRegressors = laggedRegressors;
      } else if (keys.includes("holidays")) {
        const { holidays } = payload;
        state.holidays = holidays;
      } else {
        return merge(state, payload);
      }
    },
    editModelConfigJsonView: (_, { payload: { updated_src: newState } }: any) =>
      newState,
  },
});

export const { editModelConfig, editModelConfigJsonView } = modelSlice.actions;

export default modelSlice.reducer;
