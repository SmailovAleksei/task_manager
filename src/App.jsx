import { useDispatch } from 'react-redux';
import { addTask } from './features/tasks/tasksSlice';
import TaskList from "./components/TaskList/TaskList.jsx";

function App() {
    const dispatch = useDispatch();

    const handleAddTask = () => {
        dispatch(
            addTask({
                id: Date.now(),
                title: 'Первая задача',
            })
        );
    };

    return (
        <div>
            <h1>Task Manager Pro</h1>

            <button onClick={handleAddTask}>
                Добавить задачу
            </button>

            <TaskList/>
        </div>
    );
}

export default App;