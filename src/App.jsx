import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TrashBin from "./components/TrashBin/TrashBin.jsx";
import Search from "./components/Search/Search.jsx";
import './App.css';

function App() {
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

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager Pro</h1>

            <div className="tab-navigation">
                <button
                    onClick={() => setCurrentTab('tasks')}
                    className={`tab-btn ${currentTab === 'tasks' ? 'active' : ''}`}
                >
                    Мои задачи ({tasksState.items.length})
                </button>
                <button
                    onClick={() => setCurrentTab('trash')}
                    className={`tab-btn ${currentTab === 'trash' ? 'active' : ''}`}
                >
                    Корзина ({tasksState.trash.length})
                </button>
            </div>

            <Search value={searchText} onChange={setSearchText} />

            {currentTab === 'tasks' ? (
                <>
                    <TaskForm />
                    <Statistics />
                    <TaskList searchText={searchText} />
                </>
            ) : (
                /* ИСПРАВЛЕНИЕ: Убрали лишний prop searchText, корзина теперь чистая */
                <TrashBin />
            )}
        </div>
    );
}

export default App;
