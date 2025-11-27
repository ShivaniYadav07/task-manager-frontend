import React, { useContext, useMemo } from 'react';
import { TaskContext } from '../task-context';

export default function Filters() {
  const { filter, setFilter, tasks, syncEnabled, setSyncEnabled, syncFromBackend, syncToBackend } = useContext(TaskContext);

  const counts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  }), [tasks]);

  return (
    <div className="filters">
      <div>
        <button className={`chip ${filter==='all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          All ({counts.all})
        </button>
        <button className={`chip ${filter==='completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>
          Completed ({counts.completed})
        </button>
        <button className={`chip ${filter==='pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
          Pending ({counts.pending})
        </button>
      </div>

      <div className={`sync-controls ${syncEnabled ? 'active' : ''}`}>

        <label className="sync-title">
          <input
            type="checkbox"
            checked={syncEnabled}
            onChange={(e) => setSyncEnabled(e.target.checked)}
          />
          Enable Cloud Backup
        </label>

        <p className="sync-desc">
          Turn this on to save your tasks safely on the server and restore them anytime.
        </p>

        {syncEnabled && (
          <div className="sync-actions fade-in">

            <p className="sync-hint">
              First time? Click <b>Restore</b> to load saved tasks.  
              Made changes? Click <b>Backup</b> to store them safely.
            </p>

            <button className="btn small glow" onClick={syncFromBackend}>
              Restore Tasks from Server
            </button>

            <button className="btn small glow" onClick={syncToBackend}>
              Backup Tasks to Server
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
