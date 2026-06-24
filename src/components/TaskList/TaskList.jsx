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

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    // Вычисляем количество выполненных задач, чтобы динамически управлять
    // отображением кнопки массовой очистки и выводить счетчик для пользователя.
    const completedCount = safeTasks.filter(task => task.completed).length;

    const filteredTasks = safeTasks.filter(task => {
        if (filterStatus === 'active') return !task.completed;
        if (filterStatus === 'completed') return task.completed;
        return true;
    });

    return (
        <div>
            <h2>Список задач</h2>

            {/* Компонент фильтров */}
            <Filters filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

            {/* Рендеринг ультра-лаконичного списка через TaskItem */}
            {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}

            {/*
                Условный рендеринг: кнопка появляется в DOM только тогда,
                когда в списке есть хотя бы одна выполненная задача, требующая удаления.
            */}
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
