import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: null,
    userEmail: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action)=>{
            //setUserName/Email from react useState
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
        },
        setUserLogOutState: state => {
            state.userName = null
            state.userEmail = null
        }
    
    }
});

export const {setActiveUser, setUserLogOutState} = userSlice.actions
//userName/Email from react useState
export const selectUserName = state => state.user.userName
export const selectUserEmail = state => state.user.userEmail
export default userSlice.reducer