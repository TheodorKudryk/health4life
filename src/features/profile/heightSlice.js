import { createSlice} from "@reduxjs/toolkit";

export const heightSlice = createSlice({
    name: 'setHeight',
    initialState: '0',
    reducers: {
        addHeight: (state, action) => ({

         height: action.payload
        })
    }
    }
)

export const {addHeight} = heightSlice.actions;

export default heightSlice.reducer;
