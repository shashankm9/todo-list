import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, isEditing: false }]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const editTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].isEditing = true;
        setTasks(newTasks);
    };

    const saveTask = (index, newText) => {
        const newTasks = [...tasks];
        newTasks[index].text = newText;
        newTasks[index].isEditing = false;
        setTasks(newTasks);
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        {task.isEditing ? (
                            <>
                                <input
                                    type="text"
                                    defaultValue={task.text}
                                    onBlur={(e) => saveTask(index, e.target.value)}
                                />
                                <button onClick={() => saveTask(index, task.text)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{task.text}</span>
                                <button onClick={() => editTask(index)}>Edit</button>
                                <button onClick={() => deleteTask(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
