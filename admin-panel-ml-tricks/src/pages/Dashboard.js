// Dashboard.js (Sidebar + Dashboard Boxes)
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const stats = {
    activeUsers: 12,
    totalModels: 45,
    totalUsers: 80,
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
            <li style={{ marginBottom: "15px" }}>
              <Link to="/dashboard/datasets" style={{ color: "#fff", textDecoration: "none" }}>
                Datasets
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link to="/dashboard/models" style={{ color: "#fff", textDecoration: "none" }}>
                ML Models
              </Link>
            </li>
            <li>
              <Link to="/dashboard/logs" style={{ color: "#fff", textDecoration: "none" }}>
                Activity Logs
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h2>Dashboard</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <StatCard title="Active Users" value={stats.activeUsers} />
          <StatCard title="Total ML Models" value={stats.totalModels} />
          <StatCard title="Total Users" value={stats.totalUsers} />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

export default Dashboard;
