import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        addTask: (state, action) => {
            // state.items.push(action.payload);
            if (!Array.isArray(state.items)) {
                state.items = [];
            }
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
            // state.items = action.payload;
            // Защита: если из localStorage пришел не массив, принудительно ставим пустой массив
            state.items = Array.isArray(action.payload) ? action.payload : [];
        }
    },
});



export const { addTask,removeTask,toggleTask,loadTasks } = tasksSlice.actions;

export default tasksSlice.reducer;