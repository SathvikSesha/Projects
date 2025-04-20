import React, { useState } from "react";

function Head({ addTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleAdd = () => {
    if (taskName && taskDate) {
      addTask(taskName, taskDate);
      setTaskName("");
      setTaskDate("");
    }
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between mx-auto mt-5 max-w-xl gap-3 px-2"
      role="form"
      aria-label="Add Task Form"
    >
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="border-2 border-blue-900 rounded-sm w-full sm:w-64 p-2"
        placeholder="Enter the task"
        aria-label="Task Name"
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
        className="border-2 border-gray-900 rounded-sm w-full sm:w-40 p-2"
        aria-label="Task Date"
      />
      <button
        onClick={handleAdd}
        className="bg-sky-700 text-white hover:bg-blue-500 h-12 w-full sm:w-28 rounded-md"
        aria-label="Add Task"
      >
        Add
      </button>
    </div>
  );
}

export default Head;
