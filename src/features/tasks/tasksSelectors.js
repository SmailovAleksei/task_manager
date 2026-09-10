import { createSelector } from '@reduxjs/toolkit';

const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
};

export const selectTasks = (state) => state.tasks.items;

const selectFilterStatus = (_, filterStatus) => filterStatus;
const selectSearchText = (_, filterStatus, searchText) => searchText;
// Шаг 2. Создаем селектор для sortBy, учитывая все 3 параметра перед ним
const selectSortBy = (_, filterStatus, searchText, sortBy) => sortBy;

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

export const selectFilteredTasks = createSelector(
    [
        selectTasks,
        selectFilterStatus,
        selectSearchText
    ],
    (tasks, filterStatus, searchText) => {
        const cleanSearch = searchText.toLowerCase().trim();

        return tasks.filter(task => {
            if (filterStatus === 'active' && task.completed) return false;
            if (filterStatus === 'completed' && !task.completed) return false;

            if (cleanSearch && !task.title.toLowerCase().includes(cleanSearch)) {
                return false;
            }

            return true;
        });
    }
);

const sortStrategies = {
    priority: (a, b) => {
        return priorityWeight[b.priority] - priorityWeight[a.priority];
    },
    title: (a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
    }
};

// Шаг 3. Переделываем selectSortedTasks в мемоизированный селектор
export const selectSortedTasks = createSelector(
    [
        selectFilteredTasks,
        selectSortBy
    ],
    (filteredTasks, sortBy) => {
        return sortBy === 'none'
            ? filteredTasks
            : [...filteredTasks].sort(sortStrategies[sortBy]);
    }
);
