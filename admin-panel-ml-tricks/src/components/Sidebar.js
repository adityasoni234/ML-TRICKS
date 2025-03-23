import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
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
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/dashboard/users" style={{ color: "#fff", textDecoration: "none" }}>
              Users
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link to="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>
              Settings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/datasets" style={{ color: "#fff", textDecoration: "none" }}>
              Datasets
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
