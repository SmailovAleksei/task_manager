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
            const taskIndex = state.items.findIndex(task => task.id === action.payload);
            if (taskIndex !== -1) {
                // Забираем задачу из основного списка
                const [removedTask] = state.items.splice(taskIndex, 1);
                // Добавляем её в корзину
                state.trash.push(removedTask);
            }
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
            // Если вы загружаете из localStorage, данные должны быть объектом с items и trash
            if (action.payload && typeof action.payload === 'object') {
                state.items = Array.isArray(action.payload.items) ? action.payload.items : [];
                state.trash = Array.isArray(action.payload.trash) ? action.payload.trash : [];
            }
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
