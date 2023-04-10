import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

import { forecappApi } from "./forecappApi";

forecappApi.endpoints.predictionPredictionPost.useMutation;

export type LaggedRegressorState = {
  name: string;
  lags: number;
  regularization: number;
  normalize: boolean | "auto";
}

export type ModelState = {
  forecasts: number;
  trend: {
    growth: "off" | "linear";
    numberOfChangepoints: number;
  };
  autoregression: {
    lags: number;
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
  laggedRegressors: LaggedRegressorState[];
  holidays: string[];
  events: any[];
};

export const modelSlice = createSlice({
  name: "models",
  initialState: {
    forecasts: 168,
    trend: {
      growth: "linear",
      numberOfChangepoints: 0,
    },
    autoregression: {
      lags: 0,
      regularization: 0,
    },
    seasonality: {
      mode: "additive",
      daily: true,
      weekly: false,
      yearly: false,
    },
    training: {
      learningRate: undefined,
      epochs: 10,
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
