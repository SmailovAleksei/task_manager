import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import TrashBin from "./components/TrashBin/TrashBin.jsx"; // Импортируем корзину
import './App.css'

function App() {
    // Получаем весь объект tasks (и items, и trash), чтобы следить за изменениями обоих массивов
    const tasksState = useSelector((state) => state.tasks);
    const dispatch = useDispatch();

    // Состояние для переключения вкладок: 'tasks' или 'trash'
    const [currentTab, setCurrentTab] = useState('tasks');

    // 1. Загрузка сохраненного состояния из localStorage при старте приложения
    useEffect(() => {
        try {
            const saved = localStorage.getItem('tasks');
            if (saved) {
                // loadTasks в нашем новом слайсе умеет правильно разбирать объект с items и trash
                dispatch(loadTasks(JSON.parse(saved)));
            }
        } catch (error) {
            console.error('Ошибка чтения localStorage', error);
        }
    }, [dispatch]);

    // 2. Авто-сохранение ВСЕГО состояния (и активных, и корзины) при любых изменениях
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasksState));
    }, [tasksState]);

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager Pro</h1>

            {/* Навигация между списком и корзиной */}
            <div className="tab-navigation" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                    onClick={() => setCurrentTab('tasks')}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: currentTab === 'tasks' ? '#007bff' : '#f0f0f0',
                        color: currentTab === 'tasks' ? '#fff' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontWeight: currentTab === 'tasks' ? 'bold' : 'normal'
                    }}
                >
                    Мои задачи ({tasksState.items.length})
                </button>
                <button
                    onClick={() => setCurrentTab('trash')}
                    style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: currentTab === 'trash' ? '#007bff' : '#f0f0f0',
                        color: currentTab === 'trash' ? '#fff' : '#333',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontWeight: currentTab === 'trash' ? 'bold' : 'normal'
                    }}
                >
                    Корзина ({tasksState.trash.length})
                </button>
            </div>

            {/* Условный рендеринг в зависимости от выбранной вкладки */}
            {currentTab === 'tasks' ? (
                <>
                    {/* Форма для добавления новых задач */}
                    <TaskForm />

                    {/* Блок статистики: теперь он глобальный и находится над списком */}
                    <Statistics />

                    {/* Отфильтрованный список задач */}
                    <TaskList />
                </>
            ) : (
                /* Компонент корзины */
                <TrashBin />
            )}
        </div>
    );
}

export default App;
