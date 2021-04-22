import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/login/userSlice'
import counterReducer from '../features/counter/counterSlice'
import friendsReducer from '../features/friends/friendsSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    friends: friendsReducer
  },
});
