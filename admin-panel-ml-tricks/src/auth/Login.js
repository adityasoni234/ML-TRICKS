import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedAdmins = JSON.parse(localStorage.getItem("adminUsers")) || [];

    const matchedAdmin = storedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (matchedAdmin) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("adminEmail", email);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Login;
