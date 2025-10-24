

import React, { useState } from 'react'


const DEFAULT_CATEGORIES = ['Work', 'Personal', 'Study']


export default function AddTaskForm({ onAdd }) {
const [title, setTitle] = useState('')
const [category, setCategory] = useState(DEFAULT_CATEGORIES[0])
const [dueDate, setDueDate] = useState('')


function submit(e) {
e.preventDefault()
if (!title.trim()) return
onAdd({
id: Date.now().toString(),
title: title.trim(),
category: category || 'Uncategorized',
dueDate: dueDate || null,
completed: false,
createdAt: new Date().toISOString()
})
setTitle('')
setDueDate('')
setCategory(DEFAULT_CATEGORIES[0])
}


return (
<form className="add-form" onSubmit={submit}>
<input
aria-label="Task title"
className="input title"
placeholder="Add new task..."
value={title}
onChange={(e) => setTitle(e.target.value)}
/>


<select
aria-label="Category"
className="input"
value={category}
onChange={(e) => setCategory(e.target.value)}
>
{DEFAULT_CATEGORIES.map((c) => (
<option key={c} value={c}>{c}</option>
))}
<option value="Other">Other</option>
</select>


<input
aria-label="Due date"
className="input"
type="date"
value={dueDate}
onChange={(e) => setDueDate(e.target.value)}
/>


<button className="btn" type="submit">Add</button>
</form>
)
}