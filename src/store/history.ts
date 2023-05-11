import { createSlice } from "@reduxjs/toolkit";
import { ModelState, editModelConfig, setModelConfig } from "./models";
import { apiPrediction } from "./datasets";

export type HistoricModel = {
  modelConfig: ModelState;
  metrics: any;
  time: number;
};

export type ModelHistoryState = {
  models: HistoricModel[];
  currentModel?: number;
};

export const historySlice = createSlice({
  name: "history",
  initialState: {
    models: [],
  } as ModelHistoryState,
  reducers: {
    addModel: (state, action: { payload: HistoricModel }) => {
      state.models.push(action.payload);
    },
    removeModel: (state, action: { payload: number }) => {
      state.models.splice(action.payload, 1);
    },
    selectModel: (state, action: { payload: number }) => {
      state.currentModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiPrediction.fulfilled, (state, { payload }) => {
      if (!state.currentModel) {
        state.models.push({
          modelConfig: payload.configuration,
          metrics: payload.metrics,
          time: Date.now(),
        });
        state.currentModel = state.models.length - 1;
      }
    });
    builder.addCase(editModelConfig, (state, _) => {
      state.currentModel = undefined;
    });
  },
});

export const { addModel, removeModel, selectModel } = historySlice.actions;

export default historySlice.reducer;
