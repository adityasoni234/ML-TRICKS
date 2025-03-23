import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Datasets from "./pages/Datasets"; // ✅ IMPORT THIS

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard and Admin Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/datasets" element={<Datasets />} /> {/* ✅ ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
