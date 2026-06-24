import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import Statistics from "./components/Statistics/Statistics.jsx"; // Подключили компонент статистики
import TaskList from "./components/TaskList/TaskList.jsx";

function App() {
    const tasks = useSelector((state) => state.tasks.items);
    const dispatch = useDispatch();

    // Загрузка сохраненных задач из localStorage ОДИН раз при старте приложения
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

    // Авто-сохранение списка в localStorage при любом изменении массива tasks
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager Pro</h1>

            {/* Форма для добавления новых задач */}
            <TaskForm />

            {/* Блок статистики: теперь он глобальный и находится над списком */}
            <Statistics />

            {/* Отфильтрованный список задач */}
            <TaskList />
        </div>
    );
}

export default App;
