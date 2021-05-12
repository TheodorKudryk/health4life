import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice'
import counterReducer from '../features/counter/counterSlice'
import friendsReducer from '../features/friends/friendsSlice';
import mainReducer from '../features/main/mainSlice';
import profileReducer from '../features/profile/profileSlice';


export const store = configureStore({
  reducer: {
    user: loginReducer,
    counter: counterReducer,
    friends: friendsReducer,
    main: mainReducer,
    profile: profileReducer
  },
});

export default store;