const STORAGE_KEY = 'ptm_tasks_v1'


export function loadTasks() {
try {
const raw = localStorage.getItem(STORAGE_KEY)
return raw ? JSON.parse(raw) : []
} catch (e) {
console.error('Failed to load tasks', e)
return []
}
}


export function saveTasks(tasks) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
} catch (e) {
console.error('Failed to save tasks', e)
}
}