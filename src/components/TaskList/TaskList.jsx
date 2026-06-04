import { useDispatch, useSelector } from 'react-redux';
import { removeTask } from '../../features/tasks/tasksSlice';

function TaskList() {
    const dispatch = useDispatch();

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const tasks = useSelector(
        (state) => state.tasks.items
    );

    return (
        <div>
            <h2>Список задач</h2>

            {tasks.map((task) => (
                <div key={task.id}>
                    <span>{task.title}</span>

                    <button onClick={() => handleRemoveTask(task.id)}>
                        Удалить
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TaskList;