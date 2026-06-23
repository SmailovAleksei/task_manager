import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskForm from "./components/TaskForm/TaskForm.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";

function App() {
    const tasks = useSelector((state) => state.tasks.items);
    const dispatch = useDispatch();

    // 1. Загрузка из localStorage ОДИН раз при старте
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
    // 2. Авто-сохранение при каждом изменении списка задач
    useEffect(() => {
            localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager Pro</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
}

export default App;