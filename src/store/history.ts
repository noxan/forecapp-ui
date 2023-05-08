import { createSlice, current } from "@reduxjs/toolkit";
import { ModelState } from "./models";
import { apiPrediction } from "./datasets";

export type HistoricModel = {
  modelConfig: ModelState;
  metrics: any;
  time: Date;
};

export type ModelHistoryState = {
  models: HistoricModel[];
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
  },
  extraReducers: (builder) => {
    builder.addCase(apiPrediction.fulfilled, (state, { payload }) => {
      state.models.push({
        modelConfig: payload.configuration,
        metrics: payload.metrics,
        time: new Date(),
      });
    });
  },
});

export const { addModel, removeModel } = historySlice.actions;

export default historySlice.reducer;
