import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  disabled: false,
};

export const disabledSlice = createSlice({
  name: "disabled",
  initialState,
  reducers: {
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    }
  }
});

export const { setDisabled } = disabledSlice.actions;

export default disabledSlice.reducer;