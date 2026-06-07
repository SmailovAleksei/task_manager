import { useDispatch, useSelector } from 'react-redux';
import {removeTask, toggleTask} from '../../features/tasks/tasksSlice';
import './TaskList.css';

function TaskList() {
    const dispatch = useDispatch();

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const tasks = useSelector(
        (state) => state.tasks.items
    );


    // console.log(JSON.stringify(tasks, null, 2));
    return (
        <div>
            <h2>Список задач</h2>

            {tasks.map((task) => (
                <div key={task.id} className="task-item">
                    <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
                        {task.title}
                    </span>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => dispatch(toggleTask(task.id))}
                        className="task-checkbox"
                    />
                    <button onClick={() => handleRemoveTask(task.id)} className="task-delete-btn">
                        Удалить
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;