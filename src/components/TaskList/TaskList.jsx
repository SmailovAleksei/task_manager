import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
            <h2>Список задач</h2>

            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            <div className="sort-container">
                <label htmlFor="sort-select">Сортировка: </label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="none">Без сортировки</option>
                    <option value="priority">По приоритету</option>
                    <option value="title">По названию</option>
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
                    Удалить выполненные ({completedCount})
                </button>
            )}
        </div>
    );
}

export default TaskList;
