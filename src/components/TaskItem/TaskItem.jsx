import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTask, editTask } from '../../features/tasks/tasksSlice';

function TaskItem({ task }) {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    // Оставляем пустую строку по умолчанию, чтобы не держать черновик текста в памяти,
    // пока пользователь просто просматривает список задач.
    const [editTitle, setEditTitle] = useState('');

    const formattedDate = new Date(task.createdAt).toLocaleString('ru-RU');

    // Функция объединяет сброс флага и очистку текста, чтобы при любом выходе
    // из режима редактирования (сохранение/отмена/Escape) память гарантированно освобождалась.
    const closeEdit = () => {
        setIsEditing(false);
        setEditTitle('');
    };

    // Предзаполнение стейта текущим текстом нужно именно в момент клика,
    // чтобы пользователь видел старое название перед тем, как начать его исправлять.
    const handleStartEdit = () => {
        setIsEditing(true);
        setEditTitle(task.title);
    };

    const handleSave = () => {
        // Проверка .trim() защищает базу данных и Redux от сохранения пустых строк,
        // которые визуально ломают интерфейс списка задач.
        if (!editTitle.trim()) return;

        dispatch(editTask({ id: task.id, title: editTitle }));
        closeEdit();
    };

    const handleCancel = () => {
        closeEdit();
    };

    // Перехват клавиш улучшает UX (доступность): клавиатурный ввод позволяет опытным
    // пользователям управлять задачами "в один клик" без необходимости тянуться к мышке.
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
                        // autoFocus необходим, так как при условном рендеринге новый инпут
                        // рендерится без фокуса, и пользователю пришлось бы делать лишний клик.
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

            <div className="task-actions">
                {isEditing ? (
                    <div className="task-actions-edit">
                        <button onClick={handleSave} className="task-save-btn">
                            Сохранить
                        </button>
                        <button onClick={handleCancel} className="task-cancel-btn">
                            Отмена
                        </button>
                    </div>
                ) : (
                    <div className="task-actions-view">
                        <button
                            onClick={() => dispatch(removeTask(task.id))}
                            className="task-delete-btn"
                        >
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
