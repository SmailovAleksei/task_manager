import { useState } from 'react';
import { useSelector } from 'react-redux';
import Filters from '../Filters/Filters.jsx';
import TaskItem from '../TaskItem/TaskItem.jsx'; // Импортируем новый компонент
import './TaskList.css';

function TaskList() {
    // Состояние для фильтрации остается здесь, так как оно нужно для filteredTasks
    const [filterStatus, setFilterStatus] = useState('all');

    const tasks = useSelector((state) => state.tasks.items);

    // Логика фильтрации
    const safeTasks = Array.isArray(tasks) ? tasks : [];

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
        </div>
    );
}

export default TaskList;
