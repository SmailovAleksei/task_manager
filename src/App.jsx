import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TrashBin from "./components/TrashBin/TrashBin.jsx";
import './App.css';

function App() {
    const tasksState = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    const [currentTab, setCurrentTab] = useState(() => {
        try {
            return localStorage.getItem('currentTab') || 'tasks';
        } catch {
            return 'tasks'; // Защита на случай отключенных куки/хранилища
        }
    });

    // 1. Улучшенное чтение с проверкой parsed JSON (ваш вариант)
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

    // 2. Безопасное сохранение состояния с защитой от переполнения (ваш вариант)
    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasksState));
        } catch (error) {
            console.error('Не удалось сохранить задачи в localStorage (возможно, память переполнена):', error);
        }
    }, [tasksState]);

    // Безопасное сохранение вкладки
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

            {currentTab === 'tasks' ? (
                <>
                    <TaskForm />
                    <Statistics />
                    <TaskList />
                </>
            ) : (
                <TrashBin />
            )}
        </div>
    );
}

export default App;
