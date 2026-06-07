import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice.js';
import './TaskForm.css';

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
                completed: false
            })
        );

        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите текст..."
                className="form-input"
            />
            <button type="submit" className="form-button">
                Добавить задачу
            </button>
        </form>
    );
}

export default TaskForm;