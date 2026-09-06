import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // <-- Импортируем хук перевода
import { removeTask, toggleTask, editTask, changeTaskPriority } from '../../features/tasks/tasksSlice';

// Маппинг для динамических CSS-классов оставляем, так как он не зависит от языка
const priorityClasses = {
    high: 'priority-badge-high',
    medium: 'priority-badge-medium',
    low: 'priority-badge-low'
};

function TaskItem({ task }) {
    const { t, i18n } = useTranslation(); // <-- Получаем функции t и i18n
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    // Динамически форматируем дату под выбранный язык (ru-RU или en-US)
    const currentLangCode = i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US';
    const formattedDate = task.createdAt
        ? new Date(task.createdAt).toLocaleString(currentLangCode)
        : t('list.dateNotSpecified');

    const closeEdit = () => {
        setIsEditing(false);
        setEditTitle('');
    };

    const handleStartEdit = () => {
        setIsEditing(true);
        setEditTitle(task.title);
    };

    const handleSave = () => {
        if (!editTitle.trim()) return;
        dispatch(editTask({ id: task.id, title: editTitle }));
        closeEdit();
    };

    const handleCancel = () => {
        closeEdit();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') closeEdit();
    };

    return (
        <div className="task-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
                className="task-checkbox"
            />

            <div className="task-info-block">
                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="task-edit-input"
                        autoFocus
                    />
                ) : (
                    <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
                        {task.title}
                    </span>
                )}

                <div className="task-date">
                    {t('list.createdAt', { date: formattedDate })} {/* <-- Перевод шаблона даты */}
                </div>

                {/* Динамический вывод индикатора приоритета из JSON */}
                <div className="task-priority-indicator">
                    <span className={`priority-badge ${priorityClasses[task.priority]}`}>
                        {t(`priorities.${task.priority}`)}
                    </span>
                </div>

                <div className="task-priority-container">
                    <span className="task-priority-label">{t('list.changePriority')}</span>
                    <select
                        value={task.priority}
                        onChange={(e) => dispatch(changeTaskPriority({ id: task.id, priority: e.target.value }))}
                        className="task-priority-select"
                    >
                        <option value="low">{t('priorities.low')}</option>
                        <option value="medium">{t('priorities.medium')}</option>
                        <option value="high">{t('priorities.high')}</option>
                    </select>
                </div>
            </div>

            <div className="task-actions">
                {isEditing ? (
                    <div className="task-actions-edit">
                        <button onClick={handleSave} className="task-save-btn">
                            {t('actions.save')}
                        </button>
                        <button onClick={handleCancel} className="task-cancel-btn">
                            {t('actions.cancel')}
                        </button>
                    </div>
                ) : (
                    <div className="task-actions-view">
                        <button onClick={() => dispatch(removeTask(task.id))} className="task-delete-btn">
                            {t('actions.delete')}
                        </button>
                        <button onClick={handleStartEdit} className="task-edit-btn">
                            {t('actions.edit')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskItem;
