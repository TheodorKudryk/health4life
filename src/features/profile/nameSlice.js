import { createSlice} from "@reduxjs/toolkit";

export const nameSlice = createSlice({
    name: 'setName',
    initialState: 'user',
    reducers: {
        addName: (state, action) => ({

                name: action.payload

        })
    }
    }
)

export const {addName} = nameSlice.actions;

export default nameSlice.reducer;