import { createSlice } from "@reduxjs/toolkit";
import { quotes } from "../constants";

const quotesSlice = createSlice({
  name: 'quotes',
  initialState: quotes,
  reducers: {
    toggleFavorite(state, { payload }){
      state[payload].favorite = !state[payload].favorite;
    }
  }
})

export const quotesActions = quotesSlice.actions;
export default quotesSlice.reducer;