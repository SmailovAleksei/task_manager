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

        removeTask: (state, action) => {
            const task = state.items.find(t => t.id === action.payload);
            if (!task) return;

            state.trash.push(task);
            state.items = state.items.filter(t => t.id !== action.payload);
        },

        restoreTask: (state, action) => {
            const taskIndex = state.trash.findIndex(t => t.id === action.payload);
            if (taskIndex !== -1) {
                const [restoredTask] = state.trash.splice(taskIndex, 1);
                state.items.push(restoredTask);
            }
        },

        deleteTaskPermanently: (state, action) => {
            state.trash = state.trash.filter(t => t.id !== action.payload);
        },

        clearTrash: (state) => {
            state.trash = [];
        },

        toggleTask: (state, action) => {
            const task = state.items.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

        loadTasks: (state, action) => {
            const data = action.payload ?? {};

            state.items = Array.isArray(data.items)
                ? data.items.map(task => ({
                    ...task,
                    priority: task.priority ?? 'medium'
                }))
                : [];

            state.trash = Array.isArray(data.trash)
                ? data.trash.map(task => ({
                    ...task,
                    priority: task.priority ?? 'medium'
                }))
                : [];
        },

        // Исправленный редюсер: теперь сохраняет и текст, и приоритет
        editTask: (state, action) => {
            const task = state.items.find(item => item.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
                task.priority = action.payload.priority; // Больше никакого JSX тут нет!
            }
        },

        // Новый редюсер для быстрого изменения приоритета при просмотре
        changeTaskPriority: (state, action) => {
            const task = state.items.find(item => item.id === action.payload.id);
            if (task) {
                task.priority = action.payload.priority;
            }
        },

        clearCompleted: (state) => {
            const completedTasks = state.items.filter(task => task.completed);
            state.trash.push(...completedTasks);
            state.items = state.items.filter(task => !task.completed);
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
    clearCompleted,
    changeTaskPriority // Не забыли экспортировать
} = tasksSlice.actions;

export default tasksSlice.reducer;
