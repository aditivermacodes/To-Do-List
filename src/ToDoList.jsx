import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Breakfast" },
    { id: 2, text: "Gym" }
  ]);

  const [newTask, setNewTask] = useState("");

  function handleNewTask(e) {
    setNewTask(e.target.value);
  }

  function addNewTask() {
    if (newTask.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: newTask
      };

      setTasks(prev => [...prev, newItem]);
      setNewTask("");
    }
  }

  function removeTask(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add("removing");
    setTimeout(() => {
      setTasks(prev => prev.filter(task => task.id !== id));
    }, 300);
  }
}

  function moveUpTask(index) {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] =
        [updated[index - 1], updated[index]];
      setTasks(updated);
    }
  }

  function moveDownTask(index) {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] =
        [updated[index + 1], updated[index]];
      setTasks(updated);
    }
  }

  return (
    <div className="todolist">
      <h2>✨ My To Do List</h2>

      <div className="input-section">
        <input
          className="inp"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleNewTask}
          onKeyDown={(e) => e.key === "Enter" && addNewTask()}
        />
        <button className="inpbut" onClick={addNewTask}>
          Add
        </button>
      </div>

      <ol className="lis">
        {tasks.map((task, index) => (
          <li id={task.id} className="task-item" key={task.id}>
            <span>{task.text}</span>

            <div className="btn-group">
              <button
                className="rmbut"
                onClick={() => removeTask(task.id)}
              >
                🗑
              </button>

              <button
                className="upbut"
                onClick={() => moveUpTask(index)}
              >
                ⬆
              </button>

              <button
                className="dnbut"
                onClick={() => moveDownTask(index)}
              >
                ⬇
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;