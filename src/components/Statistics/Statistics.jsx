import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    selectTotalCount,
    selectCompletedCount,
    selectActiveCount,
    selectProgress
} from '../../features/tasks/tasksSelectors';
import './Statistics.css';

function Statistics() {
    const { t } = useTranslation();

    const total = useSelector(selectTotalCount);
    const completed = useSelector(selectCompletedCount);
    const active = useSelector(selectActiveCount);
    const progress = useSelector(selectProgress);

    return (
        <div className="task-stats">
            <div className="stats-item">
                {t('stats.total')} <span>{total}</span>
            </div>
            <div className="stats-item">
                {t('stats.active')} <span>{active}</span>
            </div>
            <div className="stats-item">
                {t('stats.completed')} <span>{completed}</span>
            </div>

            <div className="stats-item progress-wrapper">
                <div className="progress-text">
                    {t('stats.progress')} <span>{progress}%</span>
                </div>
                <div className="progress-bar-container" style={{ '--progress': `${progress}%` }}>
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
