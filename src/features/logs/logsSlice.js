import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    days: 3
};

export const logsSlice = createSlice({
    name: 'logs',
    initialState,
    reducers: {
      numOfDays: (state, action) => {
          state.days = action.payload;
      }
    }
});

export const selectNumOfDays = state => state.logs.days;
export const { numOfDays } = logsSlice.actions;

export default logsSlice.reducer;