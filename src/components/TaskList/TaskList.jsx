import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, toggleTask } from '../../features/tasks/tasksSlice';
import './TaskList.css';

function TaskList() {
    const dispatch = useDispatch();

    // Переименовали состояние в filterStatus
    const [filterStatus, setFilterStatus] = useState('all');

    const handleRemoveTask = (id) => {
        dispatch(removeTask(id));
    };

    const tasks = useSelector(
        (state) => state.tasks.items
    );

    // Логика фильтрации через переменную filteredTasks
    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'active') return !task.completed;
        if (filterStatus === 'completed') return task.completed;
        return true;
    });

    return (
        <div>
            <h2>Список задач</h2>

            {/* Блок кнопок переключения фильтров */}
            <div className="filter-buttons">
                <button
                    className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                >
                    Все
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('active')}
                >
                    Активные
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('completed')}
                >
                    Выполненные
                </button>
            </div>

            {/* Рендеринг отфильтрованного массива filteredTasks */}
            {filteredTasks.map((task) => {
                const formattedDate = new Date(
                    task.createdAt
                ).toLocaleString('ru-RU');

                return (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch(toggleTask(task.id))}
                            className="task-checkbox"
                        />

                        <div className="task-info-block">
                            <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
                                {task.title}
                            </span>
                            <div className="task-date">
                                Создано: {formattedDate}
                            </div>
                        </div>

                        <button onClick={() => handleRemoveTask(task.id)} className="task-delete-btn">
                            Удалить
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default TaskList;
