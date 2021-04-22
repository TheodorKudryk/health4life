import { createSlice } from "@reduxjs/toolkit";

export const activityLevelSlice = createSlice({
    name: 'setActivityLevel',
    initialState: 'none',
    reducers: {
        addActivityLevel: (state, action) => ({

                activityLevel: action.payload

        })
    }
    }
)

export const {addActivityLevel} = activityLevelSlice.actions;

export default activityLevelSlice.reducer;