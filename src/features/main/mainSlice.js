import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count:0
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
      increment: (state, action)=>{
      state.count = action.payload
  },
      start: (state, action) => {
        
        state.count = action.payload
      },
      end: (state) => {
        state.count = 0
      }
}
  });

  export const {increment, start, end} = mainSlice.actions

  export const selectValue = state => state.main.count
  export default mainSlice.reducer