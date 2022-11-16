import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export const selectDataset = (state: RootState) => state.datasets?.raw;

export const selectTimeColumn = (state: RootState): string =>
  state.datasets.columns.timeColumn;

export const selectTargetColumn = (state: RootState): string =>
  state.datasets.columns.targetColumn;
