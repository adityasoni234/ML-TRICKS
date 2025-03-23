import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SETTINGS_KEY = "adminSettings";

function Settings() {
  const [settings, setSettings] = useState({
    adminName: "",
    adminEmail: "",
    notificationsEnabled: true,
    darkMode: false,
  });

  const [adminUsers, setAdminUsers] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const loggedEmail = localStorage.getItem("adminEmail");

    if (loggedIn !== "true") {
      navigate("/");
      return;
    }

    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    const existing = localStorage.getItem("adminUsers");
    if (existing) {
      const parsedAdmins = JSON.parse(existing);
      setAdminUsers(parsedAdmins);

      const isRegisteredAdmin = parsedAdmins.some(admin => admin.email === loggedEmail);
      if (!isRegisteredAdmin) {
        navigate("/unauthorized");
      }
    }
  }, [navigate]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    alert("Settings saved!");
  };

  const handleAddAdmin = () => {
    if (!newAdmin.email || !newAdmin.password) {
      return alert("Please fill in both email and password.");
    }
    const updated = [...adminUsers, newAdmin];
    setAdminUsers(updated);
    localStorage.setItem("adminUsers", JSON.stringify(updated));
    setNewAdmin({ email: "", password: "" });
  };

  const handleRemoveAdmin = (email) => {
    const updated = adminUsers.filter((a) => a.email !== email);
    setAdminUsers(updated);
    localStorage.setItem("adminUsers", JSON.stringify(updated));
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h2>Settings</h2>

        <div style={{ maxWidth: "400px" }}>
          <label>
            Admin Name:
            <input
              type="text"
              value={settings.adminName}
              onChange={(e) => handleChange("adminName", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Admin Email:
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleChange("adminEmail", e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) => handleChange("notificationsEnabled", e.target.checked)}
            />
            Enable Notifications
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleChange("darkMode", e.target.checked)}
            />
            Enable Dark Mode (visual only)
          </label>
          <br />
          <button onClick={handleSave} style={{ marginTop: "15px" }}>
            Save Settings
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        <h3>Manage Admin Logins</h3>
        <label>
          Email:
          <input
            type="email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={newAdmin.password}
            onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </label>
        <br />
        <button onClick={handleAddAdmin}>Add Admin</button>

        <ul style={{ marginTop: "20px" }}>
          {adminUsers.map((admin, index) => (
            <li key={index}>
              {admin.email}
              <button
                onClick={() => handleRemoveAdmin(admin.email)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Settings;
