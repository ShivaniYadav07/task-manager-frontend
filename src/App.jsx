import React, { useContext } from 'react';
import { TaskContext } from './task-context';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Filters from './components/Filters';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="app">
      <header className="header">
  <div className="brand">
    <h4>Advanced Task Manager</h4>
  </div>
  <ThemeToggle />
</header>


      <main className="container">
        <AddTaskForm />
        <Filters />
        <TaskList tasks={tasks} />
      </main>

      <footer className="footer">
        <small>Tasks: {tasks.length}</small>
      </footer>
    </div>
  );
}
