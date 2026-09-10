const LOCAL_STORAGE_KEY = 'tasks';

/**
 * Получает состояние задач из localStorage
 * @returns {{ items: Array, trash: Array }}
 */
export const getTasks = () => {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!saved) {
            return {
                items: [],
                trash: []
            };
        }

        const parsed = JSON.parse(saved);

        return {
            items: Array.isArray(parsed.items) ? parsed.items : [],
            trash: Array.isArray(parsed.trash) ? parsed.trash : []
        };
    } catch (error) {
        console.error('Ошибка при чтении задач из localStorage:', error);
        return {
            items: [],
            trash: []
        };
    }
};

/**
 * Сохраняет состояние задач в localStorage
 * @param {{ items: Array, trash: Array }} tasksState
 */
export const saveTasks = (tasksState) => {
    try {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify(tasksState)
        );
    } catch (error) {
        console.error('Ошибка при сохранении задач в localStorage:', error);
    }
};
