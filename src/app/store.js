import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux'
import weightsReducer from '../features/profile/weightsSlice';
import setHeightReducer from '../features/profile/heightSlice';
import setAgeReducer from '../features/profile/ageSlice';
import setSexReducer from '../features/profile/sexSlice';
import setNameReducer from '../features/profile/nameSlice';
import setActivityLevelReducer from '../features/profile/activityLevelSlice';
import setGoalReducer from '../features/profile/goalSlice';
import userReducer from '../features/login/userSlice'


const rootReducer = combineReducers({
  weightsReducer,
  setHeightReducer,
  setAgeReducer,
  setSexReducer,
  setNameReducer,
  setActivityLevelReducer,
  setGoalReducer,
  userReducer
})

export const store = createStore(rootReducer)
console.log(store.getState())
