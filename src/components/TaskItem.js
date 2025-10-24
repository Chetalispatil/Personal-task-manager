import React, { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category || '');

  function saveEdit() {
    onEdit({ ...task, title: title.trim(), category: category.trim() || task.category });
    setEditing(false);
  }

  const due = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = due && !task.completed && due < new Date();

  // ✅ return is INSIDE the component function
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {editing ? (
          <>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
            <button className="btn small" onClick={saveEdit}>Save</button>
            <button className="btn small" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <div className="task-main">
            <div className="task-title">{task.title}</div>
            <div className="meta">
              {task.category} {task.dueDate ? ' • due ' + task.dueDate : ''}
            </div>
          </div>
        )}
      </label>

      {!editing && (
        <div className="task-actions">
          <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn small danger" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
