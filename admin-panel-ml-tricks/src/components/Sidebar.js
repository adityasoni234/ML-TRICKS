// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/dashboard/users" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div style={{ width: "220px", background: "#1e1e2f", height: "100vh", color: "white", padding: "1rem", boxSizing: "border-box" }}>
      <h2 style={{ marginBottom: "2rem" }}>ML Tricks Admin</h2>
      {menuItems.map((item) => (
        <div key={item.path} style={{ marginBottom: "1rem" }}>
          <Link
            to={item.path}
            style={{
              color: location.pathname === item.path ? "#61dafb" : "white",
              textDecoration: "none",
              fontWeight: location.pathname === item.path ? "bold" : "normal",
            }}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
