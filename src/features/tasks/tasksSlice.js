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
        },
        loadTasks: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        },
        editTask: (state, action) => {
            const task = state.items.find(
                item => item.id === action.payload.id
            );

            if (task) {
                task.title = action.payload.title;
            }
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(task => !task.completed);
        }
    },
});



export const {
    addTask,
    removeTask,
    toggleTask,
    loadTasks,
    editTask ,
    clearCompleted
} = tasksSlice.actions;

export default tasksSlice.reducer;