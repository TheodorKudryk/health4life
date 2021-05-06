import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count:0,
  pulse:0
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
      pulse: (state, action)=>{
      state.pulse = action.payload
  },
      steps: (state, action) => {
        
        state.count = action.payload
      },
      end: (state) => {
        state.count = 0
      }
}
  });

  export const {pulse, steps, end} = mainSlice.actions

  export const selectValue = state => state.main.count
  export const selectPulse = state => state.main.pulse
  export default mainSlice.reducer