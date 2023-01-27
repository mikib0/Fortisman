import { createSlice } from "@reduxjs/toolkit";
import { now } from "lodash";

import { formattedDate } from "../utils";

const detoxes = createSlice({
  name: 'detoxes',
  initialState: {},
  reducers: {
    createDetox(state, { payload }) {
      state[payload] = {
        relapses: [],
        currentStreakStartDate: formattedDate(),
      };
    },
    deleteDetox(state, { payload }) {
      delete state[payload];
    },
    newRelapse(state, { payload: { detox, relapse, resetStreak } }) {
      state[detox].relapses.push({ id: Date.now(), ...relapse });
      if (resetStreak) state[detox].currentStreakStartDate = formattedDate();
    },
    editRelapse(state, { payload: { detox, id, data } }) {
      state[detox].relapses = state[detox].relapses.map((rlps) =>
        id == rlps.id ? { id, ...data } : rlps
      );
    },
    deleteRelapse(state, { payload: { detox, id } }) {
      state[detox].relapses = state[detox].relapses.filter(
        (rlps) => id !== rlps.id
      );
    },
    setCurrentStreakStartDate(state, { payload: { detox, date } }) {
      state[detox].currentStreakStartDate = formattedDate(date);
    },
  },
});

export const detoxesActions = detoxes.actions
export default detoxes.reducer