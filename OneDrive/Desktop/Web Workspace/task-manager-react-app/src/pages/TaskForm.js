import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import TaskManager from "../services/TaskManager";

const taskManager = new TaskManager();

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAddTask = () => {
    // Validate the input, e.g., ensure taskTitle is not empty
    if (taskTitle.trim() === "") {
      alert("Please enter a task title.");
      return;
    }

    // Create a new task object using TaskManager
    const newTask = taskManager.createTask(taskTitle, taskDescription);

    // Task creation alert
    alert("Task created successfully!");

    // Clear the input fields
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
    <div className="container mt-4">
      <h2>Add Task</h2>
      <ul className="navbar-nav mr-auto blueUnderline">
        <li className="nav-item">
          <a href="/taskList" className="nav-link">
            Task List
          </a>
        </li>
      </ul>
      <Form>
        <Form.Group className="mb-3" controlId="taskTitle">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDescription">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={taskDescription}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
