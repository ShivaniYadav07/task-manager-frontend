import React, { useContext, useMemo, useCallback } from 'react';
import { TaskContext } from '../task-context';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function TaskList() {
  const { tasks, filter, reorderTasks, updateTask } = useContext(TaskContext);

  const filtered = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const onDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const startIdx = result.source.index;
    const endIdx = result.destination.index;
    const newTasks = Array.from(filtered);
    const [removed] = newTasks.splice(startIdx, 1);
    newTasks.splice(endIdx, 0, removed);
    // But reorderTasks expects whole app list order; we build new global order:
    // For simplicity, create a global reorder by mapping current tasks
    // Move in the global tasks list: we'll use id ordering to place moved item relative to filtered list.
    // Simpler approach: when filtered is same as tasks (common), just set new order; otherwise we map positions.
    // We'll build new global list by moving item id in tasks list accordingly.
    const movedId = removed.id;
    const global = Array.from(tasks);
    // remove movedId from global
    const gidx = global.findIndex(t => t.id === movedId);
    if (gidx !== -1) global.splice(gidx, 1);
    // compute destination item id in global: destination in filtered => find neighbor id in filtered after move
    const destNeighbor = newTasks[endIdx + 1];
    if (destNeighbor) {
      const neighborGlobalIndex = global.findIndex(t => t.id === destNeighbor.id);
      global.splice(neighborGlobalIndex, 0, removed);
    } else {
      // append to end
      global.push(removed);
    }
    reorderTasks(global);
  }, [filtered, tasks, reorderTasks]);

  return (
    <div className="task-list">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filtered.map((task, idx) => (
                <Draggable key={task.id} draggableId={task.id} index={idx}>
                  {(p) => (
                    <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                      <TaskItem task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
