import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTask, editTask, changeTaskPriority } from '../../features/tasks/tasksSlice';

// Маппинг для красивого текстового отображения с индикатором
const priorityLabels = {
    high: '🔴 Высокий',
    medium: '🟡 Средний',
    low: '🟢 Низкий'
};

// Маппинг для динамических CSS-классов
const priorityClasses = {
    high: 'priority-badge-high',
    medium: 'priority-badge-medium',
    low: 'priority-badge-low'
};

function TaskItem({ task }) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');

    const formattedDate = task.createdAt
        ? new Date(task.createdAt).toLocaleString('ru-RU')
        : 'Дата не указана';

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
                    Создано: {formattedDate}
                </div>

                {/* Вывод текстового индикатора с динамическим CSS-классом */}
                <div className="task-priority-indicator">
                    <span className={`priority-badge ${priorityClasses[task.priority]}`}>
                        {priorityLabels[task.priority]}
                    </span>
                </div>

                <div className="task-priority-container">
                    <span className="task-priority-label">Изменить: </span>
                    <select
                        value={task.priority}
                        onChange={(e) => dispatch(changeTaskPriority({ id: task.id, priority: e.target.value }))}
                        className="task-priority-select"
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>
            </div>

            <div className="task-actions">
                {isEditing ? (
                    <div className="task-actions-edit">
                        <button onClick={handleSave} className="task-save-btn">Сохранить</button>
                        <button onClick={handleCancel} className="task-cancel-btn">Отмена</button>
                    </div>
                ) : (
                    <div className="task-actions-view">
                        <button onClick={() => dispatch(removeTask(task.id))} className="task-delete-btn">
                            Удалить
                        </button>
                        <button onClick={handleStartEdit} className="task-edit-btn">
                            Редактировать
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskItem;
