import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const datasetSlice = createSlice({
  name: "datasets",
  initialState: {
    raw: undefined,
    main: undefined,
    result: undefined,
  },
  reducers: {
    importDataset: (state, action: PayloadAction) => {
      console.log(action.payload);
    },
    applyTransforms: () => undefined,
  },
});

export const { importDataset, applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
