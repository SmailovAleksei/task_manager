function Filters({ filterStatus, setFilterStatus }) {
    return (
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
    );
}

export default Filters;
