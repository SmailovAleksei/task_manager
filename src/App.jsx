import TaskList from "./components/TaskList/TaskList.jsx";
import TaskForm from "./components/TaskForm/TaskForm.jsx";

function App() {

    return (
        <div className="app-container">
            <h1 className="app-title">Task Manager Pro</h1>

            <TaskForm />
            <TaskList />
        </div>
    );
}

export default App;