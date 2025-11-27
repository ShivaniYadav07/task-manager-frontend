import React, { createContext, useCallback, useMemo, useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import axios from 'axios';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks_v1', []);
  const [tasks, setTasks] = useState(storedTasks || []);
  const [filter, setFilter] = useLocalStorage('tasks_filter', 'all');
  const [syncEnabled, setSyncEnabled] = useLocalStorage('sync_backend', false);

  // keep local state and storedTasks in sync
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // basic CRUD
  const addTask = useCallback((task) => {
    setTasks(prev => [task, ...prev]);
  }, []);

  const updateTask = useCallback((id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  }, []);

  const deleteTask = async (id) => {
  // UI se remove immediately
  setTasks(prev => prev.filter(t => t.id !== id));

  // agar sync enabled ho
  if (!syncEnabled) return;

  try {
    await fetch(`http://localhost:4000/tasks/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Failed to delete from backend', error);
  }
};


  const reorderTasks = useCallback((newList) => {
    setTasks(newList);
  }, []);

  // Optional: sync with backend if toggle is enabled
  const syncFromBackend = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:4000/tasks');
      setTasks(res.data);
    } catch (e) {
      console.warn('Could not sync from backend:', e.message);
    }
  }, []);

  const syncToBackend = useCallback(async () => {
    try {
      // naive approach: delete all and re-create — simple but acceptable for small assignment
      const res = await axios.get('http://localhost:4000/tasks');
      const remote = res.data;
      // create map of remote
      const remoteMap = new Map(remote.map(t => [t.id, t]));
      // create/patch remote
      for (const t of tasks) {
        if (remoteMap.has(t.id)) {
          await axios.put(`http://localhost:4000/tasks/${t.id}`, t).catch(() => {});
        } else {
          await axios.post('http://localhost:4000/tasks', t).catch(() => {});
        }
      }
      // delete remote ones not in local
      for (const r of remote) {
        if (!tasks.find(t => t.id === r.id)) {
          await axios.delete(`http://localhost:4000/tasks/${r.id}`).catch(() => {});
        }
      }
    } catch (e) {
      console.warn('Could not sync to backend:', e.message);
    }
  }, [tasks]);

  useEffect(() => {
  syncFromBackend(); // always load from backend initially
}, []);


  const memo = useMemo(() => ({
    tasks,
    filter,
    setFilter,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
    syncEnabled,
    setSyncEnabled,
    syncFromBackend,
    syncToBackend
  }), [tasks, filter, addTask, updateTask, deleteTask, reorderTasks, syncEnabled, setSyncEnabled, syncFromBackend, syncToBackend]);

  return <TaskContext.Provider value={memo}>{children}</TaskContext.Provider>;
}
