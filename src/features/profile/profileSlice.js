import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
  weight: "none",
  height: "none",
  birthdate: "none",
  sex: "none",
  goal: "none",
  activityLevel: "none",
  editing: [false, false, false, false, false, false, false]
  //name, birthdate, height, sex, weight, activityLevel, goal
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
    addWeight: (state, action) => {
      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      const day = date.getDate();
      //Kan man uppdatera databasen direkt härifrån?
      //Dagen kommer finnas för den kommer hämtas från Firebase när man loggar in. 
      //Den ska skapas om den inte finns, och weight ska uppdateras från gårdagens till current.
      //Men det kommer bli svårt eller omöjligt att redigera tidigare weight entries
      //Det kanske man kan ha som en would.
      state.weight = action.payload;
    },
    addBirthdate: (state, action) => {
        state.birthdate = action.payload;
    },
    addSex: (state, action) => {
        state.sex = action.payload;
    },
    addHeight: (state, action) => {
        state.height = action.payload;
    },
    addActivityLevel: (state, action) => {
        state.activityLevel = action.payload;
    },
    addGoal: (state, action) => {
        state.goal = action.payload;
    },
    addEdit: (state, action) => {
      state.editing = action.payload;
    }
  }
});



export const { addWeight, addBirthdate, addSex, addHeight, addActivityLevel, addGoal, addEdit } = profileSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
//export const selectWeights = (state) => state.weights.value;
export const selectBirthdate = (state) => state.profile.birthdate;
export const selectHeight = (state) => state.profile.height;
export const selectSex = (state) => state.profile.sex;
export const selectWeight = (state) => state.profile.weight;
export const selectActivityLevel = (state) => state.profile.activityLevel;
export const selectGoal = (state) => state.profile.goal;
export const selectEditing = (state) => state.profile.editing;


export default profileSlice.reducer;

/* add to Login if needed, depends on the structure -- want to decide this until tomorrow
                firebase.database().ref().child("users/" + result.user.uid + "/age/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/height/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/sex/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/activityLevel/").set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/weight/" + datum).set("none");
                firebase.database().ref().child("users/" + result.user.uid + "/goal/").set("none"); */
