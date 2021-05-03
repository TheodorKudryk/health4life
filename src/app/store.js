import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/login/userSlice'
import counterReducer from '../features/counter/counterSlice'
import friendsReducer from '../features/friends/friendsSlice';
import mainReducer from '../features/main/mainSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    friends: friendsReducer,
    main: mainReducer
  },
});

export default store;