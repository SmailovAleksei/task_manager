import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Filters from '../Filters/Filters.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';
import { clearCompleted } from '../../features/tasks/tasksSlice';
import { selectCompletedCount, selectSortedTasks } from '../../features/tasks/tasksSelectors';

function TaskList({ searchText }) {
    const { t } = useTranslation();
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('none');

    const dispatch = useDispatch();

    const completedCount = useSelector(selectCompletedCount);

    const sortedTasks = useSelector((state) =>
        selectSortedTasks(state, filterStatus, searchText, sortBy)
    );

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
