import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Filters from '../Filters/Filters.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx';
import './TaskList.css';
import { clearCompleted } from '../../features/tasks/tasksSlice';

function TaskList() {
    const [filterStatus, setFilterStatus] = useState('all');
    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks.items);

    // Подсчет выполненных задач для управления кнопкой массовой очистки
    const completedCount = tasks.filter(task => task.completed).length;

    // Логика фильтрации списка
    const filteredTasks = tasks.filter(task => {
        if (filterStatus === 'active') return !task.completed;
        if (filterStatus === 'completed') return task.completed;
        return true;
    });

    return (
        <div>
            <h2>Список задач</h2>

            {/* Компонент фильтров */}
            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            {/* Рендеринг списка задач */}
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}

            {/* Кнопка удаления выполненных задач */}
            {completedCount > 0 && (
                <button
                    onClick={() => dispatch(clearCompleted())}
                    className="clear-completed-btn"
                >
                    Удалить выполненные ({completedCount})
                </button>
            )}
        </div>
    );
}

export default TaskList;
