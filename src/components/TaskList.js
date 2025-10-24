
import React from 'react'
import TaskItem from './TaskItem'


export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
if (!tasks.length) return <p className="empty">No tasks found.</p>
return (
<ul className="task-list">
{tasks.map(t => (
<TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
))}
</ul>
)
}
