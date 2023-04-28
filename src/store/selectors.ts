import { RootState } from '.';
import { ModelState } from './models';

export const selectDataset = (state: RootState) => state.datasets?.raw;

export const selectTimeColumn = (state: RootState): string =>
  state.datasets?.columns?.timeColumn;

export const selectTargetColumn = (state: RootState): string =>
  state.datasets?.columns?.targetColumn;

export const selectStatus = (state: RootState): string =>
  state.datasets?.status;

export const selectModelConfiguration = (state: RootState): ModelState =>
  state.models;
