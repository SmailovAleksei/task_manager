import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice.js';

function TaskForm() {
    const [title, setTitle] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        dispatch(
            addTask({
                id: Date.now(),
                title: title,
            })
        );

        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите текст..."
            />
            <button type="submit">
                Добавить задачу
            </button>
        </form>
    );
}

export default TaskForm;