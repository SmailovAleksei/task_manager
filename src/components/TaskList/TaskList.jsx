import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, toggleTask, editTask } from '../../features/tasks/tasksSlice';
import Filters from '../Filters/Filters.jsx'; // Импортируем новый компонент
import './TaskList.css';

function TaskList() {
    const dispatch = useDispatch();

    // Состояния для фильтрации (остаются здесь, так как нужны для filteredTasks)
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

    // Функция сохранения изменений
    const handleSave = (id) => {
        if (!editTitle.trim()) return;
        dispatch(editTask({ id, title: editTitle }));
        setEditingId(null);
        setEditTitle('');
    };

    // Функция отмены редактирования
    const handleCancel = () => {
        setEditingId(null);
        setEditTitle('');
    };

    return (
        <div>
            <h2>Список задач</h2>

            {/* Рендерим компонент фильтров и передаем пропсы */}
            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

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
                        </div>

                        {/* Условный рендеринг КНОПОК */}
                        {editingId === task.id ? (
                            <div className="task-actions-edit">
                                <button
                                    onClick={() => handleSave(task.id)}
                                    className="task-save-btn"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={handleCancel}
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
