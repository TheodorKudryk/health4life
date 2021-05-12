import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from '../counter/counterAPI';
const initialState = {
  weights: [],
  height: "none",
  age: "none",
  sex: "none",
  goal: "none",
  activityLevel: "none",
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.


export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addWeight: (state) => {
      state.weights.push({
    })},
    addAge: (state, action) => {
      state.age = action.payload;
    }
    }
  });


export const { addWeight, addAge } = profileSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeights = (state) => state.weights.value;
export const selectAge = (state) => state.age.value;

export default profileSlice.reducer;