import { v4 as uuidv4 } from "uuid";

class TaskManager {
  constructor() {
    this.tasks = this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      return storedTasks;
    } catch (error) {
      console.error("Error loading tasks from local storage:", error);
      return [];
    }
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  createTask(title, description) {
    const newTask = {
      id: uuidv4(), // Generate a unique ID using uuid
      dateCreated: new Date().toISOString(),
      title,
      description,
      completed: false,
    };

    this.tasks.push(newTask);
    this.saveTasksToLocalStorage();

    return newTask;
  }

  editTask(id, newTitle, newDescription) {
    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle !== undefined ? newTitle : task.title,
            description:
              newDescription !== undefined ? newDescription : task.description,
          }
        : task
    );

    this.saveTasksToLocalStorage();
  }

  toggleTaskCompletionById(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    this.saveTasksToLocalStorage();
  }

  searchTasksByTitle(searchTerm) {
    return this.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  getTasks() {
    return this.tasks;
  }

  getTaskId(id) {
    console.log(this.tasks.find((task) => task.id === id));
    return this.tasks.find((task) => task.id === id);
  }

  deleteAllTasks() {
    this.tasks = [];
    this.saveTasksToLocalStorage();
  }

  deleteTaskById(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasksToLocalStorage();
  }
}

export default TaskManager;
