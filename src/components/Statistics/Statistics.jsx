import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // <-- Импортируем хук перевода
import './Statistics.css';

function Statistics() {
    const { t } = useTranslation(); // <-- Инициализируем функцию t
    const tasks = useSelector((state) => state.tasks.items);

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="task-stats">
            <div className="stats-item">
                {t('stats.total')} <span>{total}</span> {/* <-- Перевод "Всего задач:" */}
            </div>
            <div className="stats-item">
                {t('stats.active')} <span>{active}</span> {/* <-- Перевод "Активных:" */}
            </div>
            <div className="stats-item">
                {t('stats.completed')} <span>{completed}</span> {/* <-- Перевод "Выполненных:" */}
            </div>

            <div className="stats-item progress-wrapper">
                <div className="progress-text">
                    {t('stats.progress')} <span>{progress}%</span> {/* <-- Перевод "Прогресс:" */}
                </div>
                <div className="progress-bar-container" style={{ '--progress': `${progress}%` }}>
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
