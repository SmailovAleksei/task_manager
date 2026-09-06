import { useTranslation } from 'react-i18next'; // <-- Импортируем хук для мультиязычности

function Filters({ filterStatus, setFilterStatus }) {
    const { t } = useTranslation(); // <-- Инициализируем функцию перевода t

    return (
        <div className="filter-buttons">
            <button
                className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
            >
                {t('filters.all')} {/* <-- Динамический перевод: "Все" / "All" */}
            </button>
            <button
                className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                onClick={() => setFilterStatus('active')}
            >
                {t('filters.active')} {/* <-- Динамический перевод: "Активные" / "Active" */}
            </button>
            <button
                className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterStatus('completed')}
            >
                {t('filters.completed')} {/* <-- Динамический перевод: "Выполненные" / "Completed" */}
            </button>
        </div>
    );
}

export default Filters;
