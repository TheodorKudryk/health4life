import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    friendList: [],
    requestsReceived: []
};

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        create: (state, action) => {
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
        },
        edit: (state, action) => {
            const {id, description} = action.payload;

            const friendToEdit = state.find(friend => friend.id === id);

            if (friendToEdit) {
                friendToEdit.description = description;
            }
        },
        toggleComplete: (state, action) => {

            const friendToToggle = state.find(friend => friend.id === action.payload);

            if (friendToToggle) {
                friendToToggle.isComplete = !friendToToggle.isComplete;
            }
        },
        remove: (state, action) => {

            const index = state.findIndex(friend => friend.id === action.payload);

            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const {create, updateRequests, edit, toggleComplete, remove} = friendsSlice.actions;
export const selectFriendList = state => state.friends.friendList;
export const selectFriendRequests = state => state.friends.requestsReceived;
export default friendsSlice.reducer;