import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Login.jsx";
import Registration from "./Registration.jsx";
import Head from "./components/head.jsx";
import Task from "./components/Task.jsx";
import API from "./api";

// Protected Task Page
function MainApp() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        navigate("/login");
      }
    };

    fetchTasks();
  }, [navigate]);

  const addTask = async (taskName, taskDate) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/tasks",
        { name: taskName, date: taskDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">
          Task Management App
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <Head addTask={addTask} />

      {/* Show Tasks */}
      {tasks.length === 0 ? (
        <p className="text-center mt-10 text-gray-500 text-lg">No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task._id}
            name={task.name}
            date={task.date}
            onDelete={() => deleteTask(task._id)}
          />
        ))
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/tasks" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
