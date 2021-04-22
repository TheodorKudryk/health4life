import { createSlice} from "@reduxjs/toolkit";

export const ageSlice = createSlice({
    name: 'setAge',
    initialState: '0',
    reducers: {
        addAge: (state, action) => ({

                age: action.payload

        })
    }
    }
)

export const {addAge} = ageSlice.actions;

export default ageSlice.reducer;

