
import React from 'react'


export default function FilterBar({ filters, setFilters, categories }) {
return (
<div className="filter-bar">
<div>
<label>
<select value={filters.status} onChange={(e) => setFilters(f => ({...f, status: e.target.value}))}>
<option value="all">All</option>
<option value="pending">Pending</option>
<option value="completed">Completed</option>
</select>
</label>


<label>
<select value={filters.category} onChange={(e) => setFilters(f => ({...f, category: e.target.value}))}>
<option value="all">All categories</option>
{categories.map(c => <option key={c} value={c}>{c}</option>)}
</select>
</label>


<input
aria-label="Search tasks"
placeholder="Search..."
value={filters.search}
onChange={(e) => setFilters(f => ({...f, search: e.target.value}))}
/>
</div>


<div>
<small>{filters.showOverdueOnly ? 'Showing only overdue' : ''}</small>
<label className="chk">Show overdue
<input type="checkbox" checked={filters.showOverdueOnly} onChange={(e) => setFilters(f => ({...f, showOverdueOnly: e.target.checked}))} />
</label>
</div>
</div>
)
}