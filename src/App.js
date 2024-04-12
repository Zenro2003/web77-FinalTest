import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import "./styles.css";
import moment from "moment"; // Import thư viện moment

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          {
            id: 1,
            title: "Build some websites",
            done: false,
            dueDate: "2024-04-12"
          },
          {
            id: 2,
            title: "Do exercises",
            done: false,
            dueDate: "2024-04-12"
          },
          {
            id: 3,
            title: "Go shopping",
            done: false,
            dueDate: "2024-04-12"
          },
          {
            id: 4,
            title: "House cleaning",
            done: false,
            dueDate: "2024-04-12"
          },
        ];
        
  });

  const [showOnlyUndone, setShowOnlyUndone] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setShowOnlyUndone(searchParams.get("withDone") === "1");
  }, [location.search]);

  const addTask = (title, dueDate) => {
    // Sử dụng moment để chuyển đổi ngày thành định dạng mong muốn
    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");
    const newTask = {
      id: tasks.length + 1,
      title,
      done: false,
      dueDate: formattedDueDate // Sử dụng ngày đã định dạng
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const countUndoneTasks = () => {
    return tasks.filter((task) => !task.done).length;
  };

  const filteredTasks = showOnlyUndone
    ? tasks.filter((task) => !task.done)
    : tasks;

  const handleCheckboxChange = () => {
    const newShowOnlyUndone = !showOnlyUndone;
    setShowOnlyUndone(newShowOnlyUndone);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("withDone", newShowOnlyUndone ? "1" : "0");
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="showOnlyUndone"
            checked={showOnlyUndone}
            onChange={handleCheckboxChange}
            className="checkbox-input"
          />
          <label htmlFor="showOnlyUndone" className="checkbox-label">
            Show only undone tasks
          </label>
        </div>
        <TodoListHeader count={countUndoneTasks()} />
        <TodoList tasks={filteredTasks} toggleTaskStatus={toggleTaskStatus} />
        <Form addTask={addTask} /> {/* Chỉnh sửa ở đây */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
