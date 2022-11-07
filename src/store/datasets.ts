import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const importDataset = createAsyncThunk(
  "datasets/importDataset",
  async () => {
    console.log("datasets/importDataset");
    return { hi: "world" };
  }
);

export const datasetSlice = createSlice({
  name: "datasets",
  initialState: {
    raw: undefined,
    main: undefined,
    result: undefined,
  },
  reducers: {
    applyTransforms: () => undefined,
  },
  extraReducers: (builder) => {
    builder.addCase(importDataset.fulfilled, (state, { payload }) => {
      state.raw = payload as any;
    });
  },
});

export const { applyTransforms } = datasetSlice.actions;

export default datasetSlice.reducer;
