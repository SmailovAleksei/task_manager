import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        addTask: (state, action) => {
            state.items.push(action.payload);
        },
        removeTask: (state, action) => {
            state.items = state.items.filter(
                task => task.id !== action.payload
            );
        },
    },
});



export const { addTask,removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;