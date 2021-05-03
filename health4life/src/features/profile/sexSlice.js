import { createSlice} from "@reduxjs/toolkit";

export const sexSlice = createSlice({
    name: 'setSex',
    initialState: 'none',
    reducers: {
        addSex: (state, action) => ({

                sex: action.payload

        })
    }
    }
)

export const {addSex} = sexSlice.actions;

export default sexSlice.reducer;