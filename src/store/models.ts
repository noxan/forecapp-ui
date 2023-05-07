import { createSlice } from "@reduxjs/toolkit";
import merge from "lodash.merge";

import { forecappApi } from "./forecappApi";

forecappApi.endpoints.predictionPredictionPost.useMutation;

export type event = {
  dates: string[];
  regularization: number;
  lowerWindow: number;
  upperWindow: number;
  mode: "additive" | "multiplicative";
};

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
  events: {
    [key: string]: event[];
  };
  training: {
    earlyStopping: boolean;
    epochs?: any;
    batchSize?: any;
    learningRate?: any;
  };
  laggedRegressors: any[];
  holidays: string[];
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
    events: {},
    training: {
      learningRate: null,
      epochs: 10,
      batchSize: null,
      earlyStopping: true,
    },
    laggedRegressors: [],
    holidays: [],
  } as ModelState,
  reducers: {
    editModelConfig: (state: ModelState, { payload }) => {
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
    removeEvent: (state: ModelState, { payload: { eventKey } }) => {
      const { [eventKey]: _, ...newEvents } = state.events;
      state.events = newEvents;
    },
  },
});

export const { editModelConfig, editModelConfigJsonView, removeEvent } =
  modelSlice.actions;

export default modelSlice.reducer;
