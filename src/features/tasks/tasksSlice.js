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
        toggleTask: (state, action) => {
            const task = state.items.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
    },
});



export const { addTask,removeTask,toggleTask } = tasksSlice.actions;

export default tasksSlice.reducer;