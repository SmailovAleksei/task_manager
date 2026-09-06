import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // <-- Импортируем хук для перевода
import { addTask } from '../../features/tasks/tasksSlice.js';
import './TaskForm.css';

function TaskForm() {
    const { t } = useTranslation(); // <-- Инициализируем функцию t
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        dispatch(
            addTask({
                id: Date.now(),
                title: title.trim(),
                createdAt: new Date().toISOString(),
                completed: false,
                priority: priority
            })
        );

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
                    placeholder={t('form.placeholder')} // <-- Динамический плейсхолдер
                    className="form-input"
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-priority-select"
                >
                    {/* Динамический перевод опций приоритета */}
                    <option value="low">{t('priorities.low')}</option>
                    <option value="medium">{t('priorities.medium')}</option>
                    <option value="high">{t('priorities.high')}</option>
                </select>
            </div>

            <button type="submit" className="form-button">
                {t('form.button')} {/* <-- Динамический текст кнопки */}
            </button>
        </form>
    );
}

export default TaskForm;
