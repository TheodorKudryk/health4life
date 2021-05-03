import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
    name: 'setGoal',
    initialState: 'none',
    reducers: {
        addGoal: (state, action) => ({

                goal: action.payload

        })
    }
    }
)

export const {addGoal} = goalSlice.actions;

export default goalSlice.reducer;