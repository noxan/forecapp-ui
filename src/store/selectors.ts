import { RootState } from ".";
import { HistoricModel, ModelHistoryState } from "./history";
import { ModelState } from "./models";

export const selectDataset = (state: RootState) => state.datasets?.raw;

export const selectTimeColumn = (state: RootState): string =>
  state.datasets?.columns?.timeColumn;

export const selectTargetColumn = (state: RootState): string =>
  state.datasets?.columns?.targetColumn;

export const selectStatus = (state: RootState): string =>
  state.datasets?.status;

export const selectModelConfiguration = (state: RootState): ModelState =>
  state.models;

export const selectHistoricModels = (state: RootState): ModelHistoryState =>
  state.history;

export const selectNthHistoricModel =
  (state: RootState): ((n: number) => HistoricModel) =>
  (n) =>
    state.history.models[n];

export const numHistoricModels = (state: RootState): number =>
  state.history.models.length;

export const currentModel = (state: RootState): number | undefined =>
  state.history.currentModel;
