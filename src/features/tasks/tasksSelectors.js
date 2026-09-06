export const selectTasks = (state) => state.tasks.items;

export const selectCompletedTasks = (state) => {
    return selectTasks(state).filter(task => task.completed);
};

export const selectActiveTasks = (state) => {
    return selectTasks(state).filter(task => !task.completed);
};

export const selectCompletedCount = (state) => {
    return selectCompletedTasks(state).length;
};

export const selectActiveCount = (state) => {
    return selectActiveTasks(state).length;
};

export const selectTotalCount = (state) => {
    return selectTasks(state).length;
};

export const selectProgress = (state) => {
    const total = selectTotalCount(state);
    const completed = selectCompletedCount(state);
    return total ? Math.round((completed / total) * 100) : 0;
};