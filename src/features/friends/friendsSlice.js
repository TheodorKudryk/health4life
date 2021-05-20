import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friendList: [],
    requestsReceived: []
};

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        updateFriends: (state, action) => {
            const {payload} = action;
            state.friendList.splice(0, state.friendList.length);
            if (payload) {
                Object.entries(payload).forEach(([uid,value])=>{
                    state.friendList.push({
                        id: uid,
                        email: value.email,
                        name: value.name,
                        isComplete: false
                    });
                })
            };
        },
        updateRequests: (state, action) => {
            const {payload} = action;
            state.requestsReceived.splice(0, state.requestsReceived.length);
            if (payload) {
                console.log(state.requestsReceived.length)
                Object.entries(payload).forEach(([uid,value])=>{
                    state.requestsReceived.push({
                        id: uid,
                        email: value.email,
                        name: value.name,
                        isComplete: false
                    });
                })
            };
        }
    }
});

export const {updateFriends, updateRequests} = friendsSlice.actions;
export const selectFriendList = state => state.friends.friendList;
export const selectFriendRequests = state => state.friends.requestsReceived;
export default friendsSlice.reducer;