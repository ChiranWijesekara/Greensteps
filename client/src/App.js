import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/actions")
      .then(res => res.json())
      .then(data => setActivities(data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    const newAct = { title, category, completed: false, _id: Date.now() };
    setActivities([...activities, newAct]);
    setTitle("");
    setCategory("");
  };

  const handleDelete = (id) => setActivities(activities.filter(a => a._id !== id));

  const startEditing = (activity) => {
    setEditingId(activity._id);
    setEditTitle(activity.title);
    setEditCategory(activity.category);
  };

  const saveEdit = (id) => {
    setActivities(activities.map(a => a._id === id ? { ...a, title: editTitle, category: editCategory } : a));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const toggleComplete = (id) => {
    setActivities(activities.map(a => a._id === id ? { ...a, completed: !a.completed } : a));
  };

  const filteredActivities = filter
    ? activities.filter(a => a.category.toLowerCase().includes(filter.toLowerCase()))
    : activities;

  return (
    <div className="app-container">
      <h1 className="app-title">🌿 GreenSteps Activities 🌿</h1>

      {/* Add Activity */}
      <form className="activity-form" onSubmit={handleAdd}>
        <input type="text" placeholder="Activity title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <button type="submit">Add Activity</button>
      </form>

      {/* Filter */}
      <input
        type="text"
        placeholder="Filter by category..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="filter-box"
      />

      {/* Activity List */}
      <ul className="activity-list">
        {filteredActivities.map(a => (
          <li key={a._id} className="activity-item">
            <div className="activity-details">
              <input type="checkbox" checked={a.completed} onChange={() => toggleComplete(a._id)} />
              {editingId === a._id ? (
                <>
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                  <input type="text" value={editCategory} onChange={e => setEditCategory(e.target.value)} />
                </>
              ) : (
                <>
                  <span className="activity-title" style={{ textDecoration: a.completed ? "line-through" : "none" }}>{a.title}</span>
                  <span className="activity-category">{a.category}</span>
                </>
              )}
            </div>

            <div className="action-buttons">
              {editingId === a._id ? (
                <>
                  <button className="btn-save" onClick={() => saveEdit(a._id)}>Save</button>
                  <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="btn-edit" onClick={() => startEditing(a)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(a._id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
