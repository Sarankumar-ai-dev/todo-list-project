import React, { useState, useEffect } from "react";
import "./Content.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

function Content({ search }) {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://todo-list-project-ld8p.onrender.com/api/tasks/", { headers });
      setTasks(res.data);
    } catch {
      console.error("Failed to fetch tasks");
    }
  };

  const openAdd = () => {
    setTitle(""); setStart(""); setEnd(""); setEditId(null);
    setShowModal(true);
  };

  const openEdit = (task) => {
    setTitle(task.title);
    setStart(task.start);
    setEnd(task.end);
    setEditId(task.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!title || !start || !end) return alert("All fields are required");
    try {
      if (editId) {
        await axios.put(`https://todo-list-project-ld8p.onrender.com/api/tasks/${editId}/`,
          { title, start, end }, { headers });
      } else {
        await axios.post("https://todo-list-project-ld8p.onrender.com/api/tasks/",
          { title, start, end, completed: false }, { headers });
      }
      setShowModal(false);
      fetchTasks();
    } catch {
      alert("Failed to save task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`https://todo-list-project-ld8p.onrender.com/api/tasks/${id}/`, { headers });
      fetchTasks();
    } catch {
      alert("Failed to delete task");
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.patch(`https://todo-list-project-ld8p.onrender.com/api/tasks/${task.id}/`,
        { completed: !task.completed }, { headers });
      fetchTasks();
    } catch {
      alert("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedTasks = [
    ...filteredTasks.filter(t => !t.completed),
    ...filteredTasks.filter(t => t.completed),
  ];

  return (
    <div className="page">
      {tasks.length === 0 && (
        <div className="empty">
          <div className="empty-box">
            <div className="empty-icon">📋</div>
            <p className="empty-text">No tasks yet!</p>
            <button className="primary-btn" onClick={openAdd}>
              + Add Your First Task
            </button>
          </div>
        </div>
      )}
      <div className="task-wrapper">
        {sortedTasks.map((task) => (
          <div className={`task-box ${task.completed ? "completed-task" : ""}`} key={task.id}>
            <div className="top">
              <div className="left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                />
                <span className={`title ${task.completed ? "strikethrough" : ""}`}>
                  {task.title}
                </span>
              </div>
              <div className="icons">
                <FaEdit onClick={() => openEdit(task)} title="Edit" />
                <FaTrash className="delete" onClick={() => deleteTask(task.id)} title="Delete" />
              </div>
            </div>
            <div className="bottom">
              <span>📅 Start: {task.start}</span>
              <span>🏁 End: {task.end}</span>
            </div>
          </div>
        ))}
      </div>
      {tasks.length > 0 && (
        <button className="floating-btn" onClick={openAdd} title="Add Task">
          <FaPlus />
        </button>
      )}

      {showModal && (
        <div className="modal" onClick={(e) => e.target.classList.contains("modal") && setShowModal(false)}>
          <div className="modal-box">
            <h2>{editId ? "Edit Task" : "Add Task"}</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />

            <button className="primary-btn" onClick={handleSave}>
              {editId ? "Update" : "Add"}
            </button>
            <button className="secondary-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Content;
