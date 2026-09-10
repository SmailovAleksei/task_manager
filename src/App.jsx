import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TrashBin from "./components/Trashbin/Trashbin.jsx";
import Search from "./components/Search/Search.jsx";
import { selectTotalCount } from './features/tasks/tasksSelectors.js';
import { getTasks, saveTasks } from './features/tasks/tasksApi.js'; // Проверь правильность этого пути к твоему API!
import './App.css';

function App() {
    const { t, i18n } = useTranslation();
    const tasksState = useSelector((state) => state.tasks);
    const totalCount = useSelector(selectTotalCount);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [isInitialized, setIsInitialized] = useState(false); // Защита от затирания базы данных
    const [currentTab, setCurrentTab] = useState(() => {
        try {
            return localStorage.getItem('currentTab') || 'tasks';
        } catch {
            return 'tasks';
        }
    });

    // 1. Эффект загрузки: Срабатывает ОДИН раз при старте приложения
    useEffect(() => {
        const savedTasks = getTasks(); // Читаем данные через наше API
        dispatch(loadTasks(savedTasks)); // Отправляем в Redux
        setIsInitialized(true); // Разрешаем сохранение, так как данные успешно подгрузились
    }, [dispatch]);

    // 2. Эффект сохранения: Следит за изменениями в Redux, но ждет флаг инициализации
    useEffect(() => {
        if (!isInitialized) return; // Если данные еще не загрузились — ничего не сохраняем!

        saveTasks(tasksState); // Сохраняем весь стейт через API
    }, [tasksState, isInitialized]);

    // 3. Сохранение текущей вкладки
    useEffect(() => {
        try {
            localStorage.setItem('currentTab', currentTab);
        } catch (error) {
            console.error('Ошибка сохранения вкладки', error);
        }
    }, [currentTab]);

    const toggleLanguage = () => {
        const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
        i18n.changeLanguage(nextLang);
    };

    const currentLangLabel = i18n.language.startsWith('ru') ? 'RU' : 'EN';

    return (
        <div className="app-layout">
            <div className="app-container">
                <button onClick={toggleLanguage} className="lang-toggle-btn">
                    {currentLangLabel}
                </button>

                <header className="app-header">
                    <h1 className="app-title">{t('title')}</h1>
                    <Statistics />
                </header>

                <div className="tab-navigation">
                    <button
                        onClick={() => setCurrentTab('tasks')}
                        className={`tab-btn ${currentTab === 'tasks' ? 'active' : ''}`}
                    >
                        {t('tabs.myTasks', { count: totalCount })}
                    </button>
                    <button
                        onClick={() => setCurrentTab('trash')}
                        className={`tab-btn ${currentTab === 'trash' ? 'active' : ''}`}
                    >
                        {t('tabs.trash', { count: tasksState.trash.length })}
                    </button>
                </div>

                <Search value={searchText} onChange={setSearchText} />

                {currentTab === 'tasks' ? (
                    <>
                        <TaskForm />
                        <TaskList searchText={searchText} />
                    </>
                ) : (
                    <TrashBin />
                )}
            </div>
        </div>
    );
}

export default App;
