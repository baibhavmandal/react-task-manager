// TaskList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import TaskForm from "./TaskForm"; // Import the TaskForm component

import TaskManager from "../services/TaskManager";

const taskManager = new TaskManager();

const TaskList = () => {
  const [filterCompleted, setFilterCompleted] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(taskManager.getTasks());
  }, [filterCompleted]);

  const handleFilterChange = (filterOption) => {
    setFilterCompleted(filterOption);
  };

  const onToggleComplete = (taskId) => {
    taskManager.toggleTaskCompletionById(taskId);
    setTasks(taskManager.getTasks());
  };

  const onDelete = (taskId) => {
    taskManager.deleteTaskById(taskId);
    setTasks(taskManager.getTasks());
  };

  const deleteAllTasks = () => {
    taskManager.deleteAllTasks();
    setTasks([]);
  };

  const handleEditTask = (task) => {
    console.log(task);
    navigate(`/taskEditForm/${task.id}`);
  };

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: true },
    { label: "Not Completed", value: false },
  ];

  return (
    <div className="container border p-4">
      <h2 className="d-flex justify-content-between align-items-center">
        Task List
        <Button variant="danger" onClick={deleteAllTasks}>
          Delete All Tasks
        </Button>
      </h2>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto blueUnderline">
          <li className="nav-item">
            <a href="/taskForm" className="nav-link">
              Add Task
            </a>
          </li>
        </ul>
      </nav>
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="filterDropdown">
          Filter Tasks
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {filterOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              active={filterCompleted === option.value}
              onClick={() => handleFilterChange(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* Render TaskForm if editTask is set */}
      {editTask && (
        <TaskForm
          task={editTask}
          onSave={(updatedTask) => {
            // Handle saving the updated task
            taskManager.editTask(
              updatedTask.id,
              updatedTask.title,
              updatedTask.description
            );
            setTasks(taskManager.getTasks());
            setEditTask(null); // Reset edit mode after saving
          }}
        />
      )}
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks
            .filter(
              (task) =>
                filterCompleted === "all" || task.completed === filterCompleted
            )
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={handleEditTask}
              />
            ))
        ) : (
          <p className="container m-4">No tasks</p>
        )}
      </ul>
    </div>
  );
};

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const handleToggle = () => {
    onToggleComplete(task.id);
  };

  const handleDeleteTask = () => {
    onDelete(task.id);
  };

  const handleEditTask = () => {
    onEdit(task);
  };

  return (
    <li className="list-group-item container border p-4">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`completeCheckbox-${task.id}`}
              checked={task.completed}
              onChange={handleToggle}
            />
            <label
              className={`form-check-label ${
                task.completed ? "text-muted" : ""
              }`}
              htmlFor={`completeCheckbox-${task.id}`}
            >
              {task.completed ? "Task Completed" : "Task Not Completed"}
            </label>
          </div>
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={handleDeleteTask}
            style={{ marginLeft: "10px" }}
          >
            <TiDelete /> Delete
          </button>
          <button
            className="btn btn-primary"
            onClick={handleEditTask}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>
        </div>
      </div>
    </li>
  );
};

export default TaskList;
