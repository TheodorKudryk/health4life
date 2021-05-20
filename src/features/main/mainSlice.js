import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count:0,
  pulse:0,
  calsBurned: 0,
  calsEaten: 0,
  eventlist: [],
  allSteps: ""
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
      //replace steps with all steps?
      allSteps: (state, action) => {
        state.allSteps = action.payload
      },
      end: (state) => {
        state.count = 0
      },
      exerciseCalories: (state, action) =>{
        state.calsBurned = action.payload
      },
      eatenCalories: (state, action) =>{
        state.calsEaten = action.payload
      },
      eventlist: (state, action) => {
        state.eventlist.push(action.payload)
      },
      clearEvent: (state) => {
        state.eventlist.splice(0, state.eventlist.length)
        console.log(state.eventlist);
      }
      
}
  });

  export const {pulse, steps, end, exerciseCalories, eatenCalories, eventlist, allSteps, clearEvent} = mainSlice.actions

  

  export const selectValue = state => state.main.count
  export const selectPulse = state => state.main.pulse
  export const selectEaten = state => state.main.calsEaten
  export const selectExercise = state => state.main.calsBurned
  export const selectEventlist = state => state.main.eventlist
  export const selectAllSteps = state => state.main.allSteps

  
  
  export default mainSlice.reducer