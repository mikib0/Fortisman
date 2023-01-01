import { createSlice } from '@reduxjs/toolkit'

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    registerRelapse(state, action){
      // const { id, daysCount, title, text, startDate, endDate } = action.payload;
      state.push({id: Date.now(), ...action.payload})
    },
    deleteRelapse(state, action){
      return state.filter(relapse => relapse.id != action.payload.id)
    },
    updateRelapse(state, action){
      return state.map(relapse => relapse.id == action.payload.id ? { ...action.payload } : relapse)
    }
  },
})

export const historyActions =  historySlice.actions
export default historySlice.reducer