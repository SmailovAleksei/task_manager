import { useTranslation } from 'react-i18next'; // <-- Импортируем хук перевода
import './Search.css';

function Search({ value, onChange }) {
    const { t } = useTranslation(); // <-- Инициализируем функцию t

    return (
        <div className="search-container">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t('search.placeholder')} // <-- Динамический плейсхолдер
                className="search-input"
            />
        </div>
    );
}

export default Search;
