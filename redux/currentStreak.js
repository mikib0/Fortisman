import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { DATE_FORMAT } from '../constants';

const currentStreakSlice = createSlice({
  name: 'currentStreak',
  initialState: null,
  reducers: {
    resetStreak(){
      return moment().format(DATE_FORMAT);
    },
    setStreakStartDate(state, { payload }){
      return moment(payload).format(DATE_FORMAT)
    }
  },
});

export const currentStreakActions = currentStreakSlice.actions;
export default currentStreakSlice.reducer;
