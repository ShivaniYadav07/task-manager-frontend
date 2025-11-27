import React, { useState, useContext, useCallback } from 'react';
import { TaskContext } from '../task-context';
import { nanoid } from 'nanoid';

export default function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const { addTask } = useContext(TaskContext);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title cannot be empty.');
      return;
    }
    const newTask = {
      id: nanoid(),
      title: title.trim(),
      description: desc.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    addTask(newTask);
    setTitle('');
    setDesc('');
  }, [title, desc, addTask]);

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <input
        className="input"
        placeholder="Add new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="input input-small"
        placeholder="Optional description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
