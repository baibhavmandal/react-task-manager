import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container mt-4">
      <h1>Task Manager React App</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/taskList" className="nav-link">
              Task List
            </a>
          </li>
          <li className="nav-item">
            <a href="/taskForm" className="nav-link">
              Add Task
            </a>
          </li>
        </ul>
      </nav>
      {/* <Switch>
      <Route
        path="/"
        exact
        render={() => (
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
      />
      <Route
        path="/add-task"
        render={() => <TaskForm onAddTask={handleAddTask} />}
      />
    </Switch> */}
    </div>
  );
};

export default App;
