import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Активные задачи
    trash: []  // Удаленные задачи (корзина)
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        addTask: (state, action) => {
            state.items.push(action.payload);
        },

        // 1. Изменили: теперь задача перемещается в корзину, а не удаляется насовсем
        removeTask: (state, action) => {
            const task = state.items.find(
                task => task.id === action.payload
            );

            if (!task) return;

            state.trash.push(task);

            state.items = state.items.filter(
                task => task.id !== action.payload
            );
        },

        // 2. Новое: восстановление задачи из корзины обратно в активные
        restoreTask: (state, action) => {
            const taskIndex = state.trash.findIndex(task => task.id === action.payload);
            if (taskIndex !== -1) {
                const [restoredTask] = state.trash.splice(taskIndex, 1);
                state.items.push(restoredTask);
            }
        },

        // 3. Новое: окончательное удаление из корзины (навсегда)
        deleteTaskPermanently: (state, action) => {
            state.trash = state.trash.filter(task => task.id !== action.payload);
        },

        // 4. Новое: полностью очистить корзину
        clearTrash: (state) => {
            state.trash = [];
        },

        toggleTask: (state, action) => {
            const task = state.items.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

        loadTasks: (state, action) => {
            const data = action.payload ?? {};

            state.items = Array.isArray(data.items)
                ? data.items
                : [];

            state.trash = Array.isArray(data.trash)
                ? data.trash
                : [];
        },

        editTask: (state, action) => {
            const task = state.items.find(item => item.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        },

        // 5. Изменили: завершенные задачи теперь тоже летят в корзину, а не стираются
        clearCompleted: (state) => {
            const completedTasks = state.items.filter(task => task.completed);
            state.trash.push(...completedTasks); // Копируем в корзину
            state.items = state.items.filter(task => !task.completed); // Удаляем из активных
        }
    },
});

export const {
    addTask,
    removeTask,
    restoreTask,
    deleteTaskPermanently,
    clearTrash,
    toggleTask,
    loadTasks,
    editTask,
    clearCompleted
} = tasksSlice.actions;

export default tasksSlice.reducer;
