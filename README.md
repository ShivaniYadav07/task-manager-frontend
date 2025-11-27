Advanced Task Manager frontend:
- Uses localStorage as primary persistence (useLocalStorage hook).
- Optional backend sync via TaskContext methods (enable "Sync backend" and run backend).
- Drag-and-drop uses @hello-pangea/dnd.
- Performance: components memoized, callbacks stable.
