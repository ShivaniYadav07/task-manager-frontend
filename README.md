# Advanced Task Manager App (Frontend)

This is the frontend of a modern Task Manager application built with React. The app provides a smooth, responsive interface for managing tasks with features like drag-and-drop, dark mode, local storage persistence, and optional backend synchronization.

---

## Features

### Core Features
- Add, edit, and delete tasks
- Mark tasks as completed
- Filter tasks (All, Completed, Pending)
- Drag-and-drop task reordering
- Local storage persistence
- Optional synchronization with backend

### React Features
- Custom hook: `useLocalStorage`
- Context API for global state management
- Performance optimizations using `React.memo`, `useCallback`, and `useMemo`
- Form validation for task input

### UI & CSS Features
- Dark/Light theme toggle
- Sticky header
- Smooth animations for tasks
- Mobile-first responsive design
- Drag-and-drop hints for better usability

---

## Tech Stack
- React
- Context API
- Axios for HTTP requests
- @hello-pangea/dnd for drag-and-drop
- CSS for styling and animations

---

## Setup

### Install dependencies

```bash
npm install
Run development server
bash

npm start
The app will be available at http://localhost:5173/

Backend API
The frontend communicates with the backend API at:

arduino

https://task-manager-backend-e6f7.onrender.com

Endpoints:

GET /tasks - fetch all tasks

POST /tasks - create new task

PUT /tasks/:id - update task

DELETE /tasks/:id - delete task

Folder Structure
css

src/
 ├─ components/
 │   ├─ AddTaskForm.js
 │   ├─ TaskItem.js
 │   ├─ TaskList.js
 │   ├─ Filters.js
 │   └─ ThemeToggle.js
 ├─ task-context.js
 ├─ useLocalStorage.js
 ├─ App.js
 ├─ index.js
 └─ styles.css
Notes
The drag-and-drop interface is shown only when tasks are available.

Local storage allows offline usage; syncing with backend is optional.

The theme preference is saved in local storage for persistence.



Developer

Shivani Yadav