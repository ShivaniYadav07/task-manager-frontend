import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { TaskProvider } from './task-context';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>
);
