import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    { label: "Total Users", value: 120 },
    { label: "Active Sessions", value: 45 },
    { label: "System Alerts", value: 3 },
  ];

  const recentActivities = [
    "User John logged in",
    "Settings updated",
    "New user registered",
    "Alert triggered: Server downtime",
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin</h2>
        <nav>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <Link to="/dashboard/users" style={{ color: "#fff", textDecoration: "none" }}>
                Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" style={{ color: "#fff", textDecoration: "none" }}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "30px" }}>
        <h1>Dashboard</h1>

        {/* Stats */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "8px",
                minWidth: "150px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <h2>Recent Activities</h2>
          <ul>
            {recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
