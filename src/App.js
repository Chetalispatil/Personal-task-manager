import React, { useEffect, useMemo, useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import { loadTasks, saveTasks } from './utils/storage';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(task) {
    setTasks(t => [task, ...t]);
  }

  function toggleTask(id) {
    setTasks(t => t.map(x => x.id === id ? { ...x, completed: !x.completed } : x));
  }

  function deleteTask(id) {
    setTasks(t => t.filter(x => x.id !== id));
  }

  function editTask(updated) {
    setTasks(t => t.map(x => x.id === updated.id ? updated : x));
  }

  const categories = useMemo(() => {
    const set = new Set(tasks.map(t => t.category).filter(Boolean));
    return Array.from(set);
  }, [tasks]);

  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: '',
    showOverdueOnly: false
  });

  const visible = useMemo(() => {
    return tasks.filter(t => {
      if (filters.status === 'pending' && t.completed) return false;
      if (filters.status === 'completed' && !t.completed) return false;
      if (filters.category !== 'all' && t.category !== filters.category) return false;
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.showOverdueOnly) {
        if (!t.dueDate) return false;
        const due = new Date(t.dueDate);
        if (t.completed) return false;
        if (due >= new Date()) return false;
      }
      return true;
    }).sort((a, b) =>
      new Date(a.dueDate || 8640000000000000) - new Date(b.dueDate || 8640000000000000)
    );
  }, [tasks, filters]);

  return (
    <div className="app" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)` }}>
      <header>
        <h1>Personal Task Manager</h1>
        <p className="tag">Manage Your stress by making Task Manager list</p>
      </header>

      <main>
        <AddTaskForm onAdd={addTask} />
        <FilterBar filters={filters} setFilters={setFilters} categories={categories} />
        <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      </main>

      <footer>
        <small> total tasks {tasks.length}</small>
      </footer>
    </div>
  );
}

export default App;
