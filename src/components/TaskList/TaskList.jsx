import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // <-- Импортируем хук перевода
import Filters from '../Filters/Filters.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';
import { clearCompleted } from '../../features/tasks/tasksSlice';

// Константа весов для числового сравнения приоритетов
const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
};

// Хранилище изолированных стратегий сортировки (object[key])
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

function TaskList({ searchText }) {
    const { t } = useTranslation(); // <-- Инициализируем функцию t
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('none');

    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks.items);
    const completedCount = tasks.filter(task => task.completed).length;

    const cleanSearch = searchText.toLowerCase().trim();

    // 1. Конвейер фильтрации (по статусу табов и поиску)
    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'active' && task.completed) return false;
        if (filterStatus === 'completed' && !task.completed) return false;

        if (cleanSearch && !task.title.toLowerCase().includes(cleanSearch)) {
            return false;
        }

        return true;
    });

    // 2. Архитектурное решение: конвейер динамической сортировки без единого if
    const sortedTasks = sortBy === 'none'
        ? filteredTasks
        : [...filteredTasks].sort(sortStrategies[sortBy]);

    return (
        <div>
            <h2>{t('list.title')}</h2> {/* <-- Перевод заголовка */}

            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            <div className="sort-container">
                <label htmlFor="sort-select">{t('list.sortLabel')}</label> {/* <-- Перевод "Сортировка: " */}
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    {/* Перевод опций сортировки */}
                    <option value="none">{t('list.sortNone')}</option>
                    <option value="priority">{t('list.sortByPriority')}</option>
                    <option value="title">{t('list.sortByTitle')}</option>
                </select>
            </div>

            {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}

            {completedCount > 0 && (
                <button
                    onClick={() => dispatch(clearCompleted())}
                    className="clear-completed-btn"
                >
                    {/* Передаем completedCount внутрь шаблона перевода */}
                    {t('actions.clearCompleted', { count: completedCount })}
                </button>
            )}
        </div>
    );
}

export default TaskList;
