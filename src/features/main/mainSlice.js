import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count:0,
  pulse:0,
  calsBurned: 0,
  calsEaten: 0,
  eventlist: []
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
      },
      excerciseCalories: (state, action) =>{
        state.calsBurned = action.payload
      },
      eatenCalories: (state, action) =>{
        state.calsEaten = action.payload
      },
      eventlist: (state, action) => {
        state.eventlist.push(action.payload)
      }
      
}
  });

  export const {pulse, steps, end, excerciseCalories, eatenCalories, eventlist} = mainSlice.actions

  

  export const selectValue = state => state.main.count
  export const selectPulse = state => state.main.pulse
  export const selectEaten = state => state.main.calsEaten
  export const selectExercise = state => state.main.calsBurned
  export const selectEventlist = state => state.main.eventlist

  
  
  export default mainSlice.reducer