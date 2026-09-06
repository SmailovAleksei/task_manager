import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filters from '../Filters/Filters.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';
import { clearCompleted } from '../../features/tasks/tasksSlice';
import { selectTasks, selectCompletedCount } from '../../features/tasks/tasksSelectors';

const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1
};

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
    const { t } = useTranslation();
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('none');

    const dispatch = useDispatch();

    const tasks = useSelector(selectTasks);
    const completedCount = useSelector(selectCompletedCount);

    const cleanSearch = searchText.toLowerCase().trim();

    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'active' && task.completed) return false;
        if (filterStatus === 'completed' && !task.completed) return false;

        if (cleanSearch && !task.title.toLowerCase().includes(cleanSearch)) {
            return false;
        }

        return true;
    });

    const sortedTasks = sortBy === 'none'
        ? filteredTasks
        : [...filteredTasks].sort(sortStrategies[sortBy]);

    return (
        <div>
            <h2>{t('list.title')}</h2>

            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            <div className="sort-container">
                <label htmlFor="sort-select">{t('list.sortLabel')}</label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
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
                    {t('actions.clearCompleted', { count: completedCount })}
                </button>
            )}
        </div>
    );
}

export default TaskList;
