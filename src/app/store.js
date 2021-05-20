import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import friendsReducer from '../features/friends/friendsSlice';
import mainReducer from '../features/main/mainSlice';
import profileReducer from '../features/profile/profileSlice';
import logsReducer from '../features/logs/logsSlice';


export const store = configureStore({
  reducer: {
    user: loginReducer,
    friends: friendsReducer,
    main: mainReducer,
    profile: profileReducer,
    logs: logsReducer
  },
});

export default store;