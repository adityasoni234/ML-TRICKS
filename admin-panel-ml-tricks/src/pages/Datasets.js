import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Datasets() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const loggedEmail = localStorage.getItem("adminEmail");
    const adminUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];

    if (loggedIn !== "true") {
      navigate("/");
      return;
    }

    const isRegisteredAdmin = adminUsers.some(
      (admin) => admin.email === loggedEmail
    );

    if (!isRegisteredAdmin) {
      navigate("/unauthorized");
    }
  }, [navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "20px" }}>
        <h2>Datasets</h2>
        <p>Here you can manage and view uploaded datasets.</p>
        {/* Future features: upload form, table of datasets, actions */}
      </main>
    </div>
  );
}

export default Datasets;