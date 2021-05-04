import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count:0
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
<<<<<<< HEAD
      increment: (state, action)=>{
      state.count = action.payload
  },
      start: (state, action) => {
        state.count = action.payload
      }
}
  });
=======
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    }
  }
});

export const { increment } = mainSlice.actions;
>>>>>>> parent of f50b2a0 (Design and hash change)

  export const {increment, start} = mainSlice.actions

  export const selectValue = state => state.main.count
  export default mainSlice.reducer