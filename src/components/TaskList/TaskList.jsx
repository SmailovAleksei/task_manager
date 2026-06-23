import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, toggleTask, editTask } from '../../features/tasks/tasksSlice';
import './TaskList.css';

function TaskList() {
    const dispatch = useDispatch();

    // Состояния для фильтрации
    const [filterStatus, setFilterStatus] = useState('all');

    // Локальные состояния для режима редактирования
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const tasks = useSelector(
        (state) => state.tasks.items
    );

    // Логика фильтрации через переменную filteredTasks
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    const filteredTasks = safeTasks.filter(task => {
        if (filterStatus === 'active') return !task.completed;
        if (filterStatus === 'completed') return task.completed;
        return true;
    });

    return (
        <div>
            <h2>Список задач</h2>

            {/* Блок кнопок переключения фильтров */}
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                >
                    Все
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('active')}
                >
                    Активные
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('completed')}
                >
                    Выполненные
                </button>
            </div>

            {/* Рендеринг отфильтрованного массива filteredTasks */}
            {filteredTasks.map((task) => {
                const formattedDate = new Date(
                    task.createdAt
                ).toLocaleString('ru-RU');

                return (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch(toggleTask(task.id))}
                            className="task-checkbox"
                        />

                        <div className="task-info-block">
                            {/* Условный рендеринг: инпут ИЛИ текст задачи */}
                            {editingId === task.id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="task-edit-input"
                                />
                            ) : (
                                <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
                                    {task.title}
                                </span>
                            )}
                            <div className="task-date">
                                Создано: {formattedDate}
                            </div>
                        </div>

                        {/* Условный рендеринг КНОПОК */}
                        {editingId === task.id ? (
                            <div className="task-actions-edit">
                                <button
                                    onClick={() => {
                                        dispatch(editTask({ id: task.id, title: editTitle }));
                                        setEditingId(null);
                                    }}
                                    className="task-save-btn"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="task-cancel-btn"
                                >
                                    Отмена
                                </button>
                            </div>
                        ) : (
                            <div className="task-actions-view">
                                <button onClick={() => handleRemoveTask(task.id)} className="task-delete-btn">
                                    Удалить
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingId(task.id);
                                        setEditTitle(task.title);
                                    }}
                                    className="task-edit-btn"
                                >
                                    Редактировать
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TaskList;
