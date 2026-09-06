import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TrashBin from "./components/Trashbin/Trashbin.jsx";
import Search from "./components/Search/Search.jsx";
import './App.css';

function App() {
    const { t, i18n } = useTranslation();
    const tasksState = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [currentTab, setCurrentTab] = useState(() => {
        try {
            return localStorage.getItem('currentTab') || 'tasks';
        } catch {
            return 'tasks';
        }
    });

    useEffect(() => {
        try {
            const saved = localStorage.getItem('tasks');
            if (!saved) return;
            const parsed = JSON.parse(saved);
            dispatch(loadTasks(parsed));
        } catch (error) {
            console.error('Ошибка чтения localStorage', error);
        }
    }, [dispatch]);

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasksState));
        } catch (error) {
            console.error('Не удалось сохранить задачи в localStorage:', error);
        }
    }, [tasksState]);

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

    return (
        <div className="app-container">
            {/* Кнопка переключения языка теперь изолирована в верхнем углу */}
            <button onClick={toggleLanguage} className="lang-toggle-btn">
                {i18n.language.startsWith('ru') ? 'EN' : 'RU'}
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
                    {t('tabs.myTasks', { count: tasksState.items.length })}
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
    );
}

export default App;
