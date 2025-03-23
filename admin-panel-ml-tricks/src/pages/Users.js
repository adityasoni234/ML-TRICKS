import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const localStorageKey = "savedUsers";

const defaultUsers = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    number: "1234567890",
    datasets: ["dataset1.csv", "dataset2.csv"],
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    number: "9876543210",
    datasets: ["data_a.csv"],
  },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(null);
  const [editData, setEditData] = useState(null);
  const [newUserData, setNewUserData] = useState({ username: "", email: "", number: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      setUsers(defaultUsers);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedUsers));
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleSaveNewUser = () => {
    const { username, email, number } = newUserData;
    if (username.trim() && email.trim() && number.trim()) {
      const newUser = {
        id: Date.now(),
        username,
        email,
        number,
        datasets: [],
      };
      const updated = [...users, newUser];
      setUsers(updated);
      localStorage.setItem(localStorageKey, JSON.stringify(updated));
      setNewUserData({ username: "", email: "", number: "" });
      setShowAddForm(false);
    } else {
      alert("Please fill in all fields (username, email, phone number)."
      );
    }
  };

  const handleEdit = (user) => {
    setShowProfile(user);
    setEditData({ ...user });
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === editData.id ? editData : user
    );
    setUsers(updatedUsers);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedUsers));
    setShowProfile(null);
    setEditData(null);
  };

  const handleSaveAll = () => {
    alert("User list has been saved!");
    localStorage.setItem(localStorageKey, JSON.stringify(users));
    console.log("Saved Users:", users);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
          height: "100vh",
        }}
      >
        <h2>Admin</h2>
        <nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h2>Users</h2>
        <button onClick={handleAdd}>Add User</button>
        <button onClick={handleSaveAll} style={{ marginLeft: "10px" }}>Save List</button>

        {showAddForm && (
          <div style={{ marginTop: 20, border: "1px solid gray", padding: 10 }}>
            <h3>Add New User</h3>
            <label>
              Username:
              <input
                type="text"
                value={newUserData.username}
                onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                value={newUserData.number}
                onChange={(e) => setNewUserData({ ...newUserData, number: e.target.value })}
              />
            </label>
            <br />
            <button onClick={handleSaveNewUser} style={{ marginRight: "10px" }}>Save</button>
            <button onClick={() => setShowAddForm(false)}>Cancel</button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <div>
                <strong>{user.username}</strong> <br />
                <span>{user.email}</span>
              </div>
              <div>
                <button onClick={() => handleEdit(user)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showProfile && editData && (
          <div style={{ marginTop: 20, border: "1px solid black", padding: 10 }}>
            <h3>Edit User Profile</h3>
            <label>
              Username:
              <input
                type="text"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              />
            </label>
            <br />
            <label>
              Phone Number:
              <input
                type="text"
                value={editData.number}
                onChange={(e) => setEditData({ ...editData, number: e.target.value })}
              />
            </label>
            <br />
            <p><strong>Datasets:</strong></p>
            <ul>
              {editData.datasets.map((ds, idx) => (
                <li key={idx}>{ds}</li>
              ))}
            </ul>
            <button onClick={handleSave} style={{ marginRight: "10px" }}>Save</button>
            <button onClick={() => setShowProfile(null)}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Users;
