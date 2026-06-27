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

    // 1. Изменили: теперь начальное значение вкладки берется из localStorage. Если его там нет — ставим 'tasks'
    const [currentTab, setCurrentTab] = useState(() => {
        return localStorage.getItem('currentTab') || 'tasks';
    });

    useEffect(() => {
        try {
            const saved = localStorage.getItem('tasks');
            if (saved) {
                dispatch(loadTasks(JSON.parse(saved)));
            }
        } catch (error) {
            console.error('Ошибка чтения localStorage', error);
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasksState));
    }, [tasksState]);

    // 2. Добавили: авто-сохранение текущей вкладки при её изменении
    useEffect(() => {
        localStorage.setItem('currentTab', currentTab);
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
