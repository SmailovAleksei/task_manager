import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // <-- Импортируем хук перевода
import { restoreTask, deleteTaskPermanently, clearTrash } from '../../features/tasks/tasksSlice';
import './TrashBin.css';

function TrashBin() {
    const { t, i18n } = useTranslation(); // <-- Инициализируем t и i18n
    const trashTasks = useSelector((state) => state.tasks.trash);
    const dispatch = useDispatch();

    // Настраиваем формат времени в зависимости от выбранного языка
    const currentLangCode = i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US';

    return (
        <div className="trash-bin">
            {trashTasks.length > 0 && (
                <button
                    onClick={() => dispatch(clearTrash())}
                    className="clear-trash-btn"
                >
                    {/* Передаем динамический count в шаблон перевода очистки корзины */}
                    {t('actions.clearTrash', { count: trashTasks.length })}
                </button>
            )}

            {trashTasks.length === 0 ? (
                <p className="trash-empty-text">{t('list.trashEmpty')}</p> /* <-- Перевод "Корзина пуста" */
            ) : (
                <div className="trash-list">
                    {trashTasks.map((task) => (
                        <div key={task.id} className="trash-bin-card">
                            <div className="trash-info-block">
                                <span className={`trash-text ${task.completed ? 'trash-completed' : ''}`}>
                                    {task.title}
                                </span>
                                <div className="trash-date">
                                    {/* Динамическая подстановка даты с нужной локалью */}
                                    {t('list.createdAt', {
                                        date: task.createdAt ? new Date(task.createdAt).toLocaleString(currentLangCode) : t('list.dateNotSpecified')
                                    })}
                                </div>
                            </div>

                            <div className="trash-actions-view">
                                <button
                                    onClick={() => dispatch(restoreTask(task.id))}
                                    className="trash-restore-btn"
                                >
                                    {t('actions.restore')} {/* <-- Перевод "Восстановить" */}
                                </button>
                                <button
                                    onClick={() => dispatch(deleteTaskPermanently(task.id))}
                                    className="trash-delete-btn"
                                >
                                    {t('actions.deletePermanently')} {/* <-- Перевод "Удалить навсегда" */}
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
