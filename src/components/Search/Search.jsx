import './Search.css';

function Search({ value, onChange }) {
    return (
        <div className="search-container">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Поиск задач..."
                className="search-input"
            />
        </div>
    );
}

export default Search;
