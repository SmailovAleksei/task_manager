import { useSelector, useDispatch } from 'react-redux';
import { restoreTask, deleteTaskPermanently, clearTrash } from '../../features/tasks/tasksSlice';
import './TrashBin.css'; // Импортируем созданные стили

function TrashBin() {
    const trashTasks = useSelector((state) => state.tasks.trash);
    const dispatch = useDispatch();

    return (
        <div className="trash-bin">
            <h2>Корзина ({trashTasks.length})</h2>

            {/* Кнопка полной очистки корзины */}
            {trashTasks.length > 0 && (
                <button
                    onClick={() => dispatch(clearTrash())}
                    className="clear-trash-btn"
                >
                    Очистить корзину
                </button>
            )}

            {trashTasks.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div className="trash-list">
                    {trashTasks.map((task) => (
                        <div key={task.id} className="trash-item">
                            <div className="trash-info">
                                <span className={`trash-task-title ${task.completed ? 'completed' : ''}`}>
                                    {task.title}
                                </span>
                                <div className="trash-task-date">
                                    Создано: {new Date(task.createdAt).toLocaleString('ru-RU')}
                                </div>
                            </div>

                            <div className="trash-actions">
                                <button
                                    onClick={() => dispatch(restoreTask(task.id))}
                                    className="task-restore-btn"
                                >
                                    Восстановить
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTaskPermanently(task.id))}
                                    className="task-delete-perm-btn"
                                >
                                    Удалить навсегда
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TrashBin;
