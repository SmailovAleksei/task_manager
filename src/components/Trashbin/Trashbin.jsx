import { useSelector, useDispatch } from 'react-redux';
import { restoreTask, deleteTaskPermanently, clearTrash } from '../../features/tasks/tasksSlice';
import './TrashBin.css'; // Обычный импорт чистого CSS файла

function TrashBin() {
    const trashTasks = useSelector((state) => state.tasks.trash);
    const dispatch = useDispatch();

    return (
        <div className="trash-bin">
            {trashTasks.length > 0 && (
                <button
                    onClick={() => dispatch(clearTrash())}
                    className="clear-trash-btn"
                >
                    Очистить корзину ({trashTasks.length})
                </button>
            )}

            {trashTasks.length === 0 ? (
                <p className="trash-empty-text">Корзина пуста</p>
            ) : (
                <div className="trash-list">
                    {trashTasks.map((task) => (
                        <div key={task.id} className="trash-bin-card">
                            <div className="trash-info-block">
                                <span className={`trash-text ${task.completed ? 'trash-completed' : ''}`}>
                                    {task.title}
                                </span>
                                <div className="trash-date">
                                    Создано: {new Date(task.createdAt).toLocaleString('ru-RU')}
                                </div>
                            </div>

                            <div className="trash-actions-view">
                                <button
                                    onClick={() => dispatch(restoreTask(task.id))}
                                    className="trash-restore-btn"
                                >
                                    Восстановить
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTaskPermanently(task.id))}
                                    className="trash-delete-btn"
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
