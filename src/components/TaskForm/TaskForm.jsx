import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/tasks/tasksSlice.js';
import './TaskForm.css';

function TaskForm() {
    const [title, setTitle] = useState('');
    // Локальное состояние для приоритета, по умолчанию "средний"
    const [priority, setPriority] = useState('medium');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        // Собираем объект задачи с учетом выбранного приоритета
        dispatch(
            addTask({
                id: Date.now(),
                title: title.trim(),
                createdAt: new Date().toISOString(),
                completed: false,
                priority: priority // Добавляем приоритет в объект
            })
        );

        // Очищаем текстовое поле, а приоритет сбрасываем на дефолтный
        setTitle('');
        setPriority('medium');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-inputs-wrapper">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите текст..."
                    className="form-input"
                />

                {/* Выпадающий список выбора приоритета */}
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-priority-select"
                >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                </select>
            </div>

            <button type="submit" className="form-button">
                Добавить задачу
            </button>
        </form>
    );
}

export default TaskForm;
