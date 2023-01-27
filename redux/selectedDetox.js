import { createSlice } from '@reduxjs/toolkit';

const selectedDetox = createSlice({
  name: 'selectedDetox',
  initialState: null,
  reducers: {
    setSelectedDetox(state, { payload }) {
      return payload;
    },
  },
});

export const selectedDetoxActions = selectedDetox.actions;
export default selectedDetox.reducer;
