import { useSelector } from 'react-redux';
import './Statistics.css';

function Statistics() {
    const tasks = useSelector((state) => state.tasks.items);

    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="task-stats">
            <div className="stats-item">Всего задач: <span>{total}</span></div>
            <div className="stats-item">Активных: <span>{active}</span></div>
            <div className="stats-item">Выполненных: <span>{completed}</span></div>

            <div className="stats-item progress-wrapper">
                <div className="progress-text">
                    Прогресс: <span>{progress}%</span>
                </div>
                {/*
                  Передаем значение только как конфигурационную CSS-переменную --progress.
                  Сам тег заполнения остается чистым, без стилизации ширины в коде.
                */}
                <div className="progress-bar-container" style={{ '--progress': `${progress}%` }}>
                    <div className="progress-bar-fill"></div>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
