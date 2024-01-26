import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TaskManager from "../services/TaskManager";

const taskManager = new TaskManager();

const TaskEditForm = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve task details by ID and set them in the state
    const existingTask = taskManager.getTaskId(taskId);

    if (existingTask) {
      setTask({
        title: existingTask.title,
        description: existingTask.description,
      });
    }

    console.log(taskId);
  }, [taskId]);

  const handleTitleChange = (e) => {
    setTask({
      ...task,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setTask({
      ...task,
      description: e.target.value,
    });
  };

  const handleUpdateTask = () => {
    // Validate the input, e.g., ensure task title is not empty
    if (task.title.trim() === "") {
      alert("Please enter a task title.");
      return;
    }

    // Update the task using TaskManager
    taskManager.editTask(taskId, task.title, task.description);

    // Display a success alert
    alert("Task updated successfully!");

    // Redirect or perform other actions after updating the task
    navigate(`/taskList`);
  };

  return (
    <div className="container mt-4">
      <h2>Edit Task</h2>
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
            value={task.title}
            onChange={handleTitleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="taskDescription">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={task.description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdateTask}>
          Update Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskEditForm;
