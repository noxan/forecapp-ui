import { createSlice } from "@reduxjs/toolkit";

export const transformSlice = createSlice({
  name: "transforms",
  initialState: [],
  reducers: {
    addTransform: () => undefined,
    editTransform: () => undefined,
    removeTransform: () => undefined,
  },
});

export const { addTransform, editTransform, removeTransform } =
  transformSlice.actions;

export default transformSlice.reducer;
