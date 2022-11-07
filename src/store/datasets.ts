import { createSlice } from "@reduxjs/toolkit";

export const datasetSlice = createSlice({
  name: "datasets",
  initialState: {
    raw: undefined,
    main: undefined,
  },
  reducers: {
    importDataset: () => undefined,
    applyTransforms: () => undefined,
  },
});

export const { importDataset, applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
