import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Enter a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring"
        >
          Add
        </button>
      </div>
      <div className="flex mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-2 rounded-l-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-2 ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-3 py-2 rounded-r-md ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Pending
        </button>
      </div>
      <ul className="w-full">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white border rounded-md mb-2 p-2"
          >
            <span
              onClick={() => toggleTaskCompletion(task.id)}
              className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
