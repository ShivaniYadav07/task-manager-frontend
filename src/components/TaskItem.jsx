import React, { useContext, useCallback } from 'react';
import { TaskContext } from '../task-context';

function TaskItemInner({ task, onToggle, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id, !task.completed)} />
        <div className="task-main">
          <div className="task-title">{task.title}</div>
          {task.description && <div className="task-desc">{task.description}</div>}
        </div>
      </div>
      <div className="task-right">
        <button className="btn small" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

const TaskItem = React.memo(function TaskItem({ task }) {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const onToggle = useCallback((id, completed) => {
    updateTask(id, { completed });
  }, [updateTask]);

  const onDelete = useCallback((id) => {
    if (confirm('Delete this task?')) deleteTask(id);
  }, [deleteTask]);

  return <TaskItemInner task={task} onToggle={onToggle} onDelete={onDelete} />;
});

export default TaskItem;
