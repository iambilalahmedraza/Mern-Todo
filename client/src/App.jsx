import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5004/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post(API_URL, newTask);
    setTasks([...tasks, response.data]);
    setNewTask({ title: "", description: "", completed: false });
  };

  const updateTask = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="App">
      <h1>MERN CRUD TODO App (Vite)</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
            <button
              onClick={() =>
                updateTask(task._id, { ...task, completed: !task.completed })
              }
            >
              Toggle Status
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
