import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: [],
    reducers: {
        create: (state, action) => {
            const {payload} = action;
            
            state.push({
                id: state.length+1,
                description: payload,
                isComplete: false
            });
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

export const {create, edit, toggleComplete, remove} = friendsSlice.actions;
export default friendsSlice.reducer;