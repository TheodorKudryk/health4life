import { createSlice} from "@reduxjs/toolkit";

let weightId = 1;

export const weightSlice = createSlice({
    name: 'weights',
    initialState: [],
    reducers: {
        newWeight: (state, action) => {
            const {payload} = action;

            state.push({
                id: weightId,
                weight: payload,
                isComplete: false
            });

            weightId++;
        },
        edit: (state,action) => {
            const {id, description} = action.payload;

            const weightToEdit = state.find(weight => weight.id === id)

            if (weightToEdit) {
                weightToEdit.description = description;
            }
        },
        toggleComplete: (state, action) => {
            const {payload} = action;

            const weightToToggle = state.find(weight => weight.id === payload)

            if (weightToToggle) {
                weightToToggle.isComplete = !weightToToggle.isComplete;
            }
        },
        remove: (state, action) => {
            const {payload} = action;
            const i = 1;

            const index = state.findIndex(weight => weight.id === payload)

            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});


export const {newWeight, edit, toggleComplete, remove} = weightSlice.actions;

export default weightSlice.reducer;