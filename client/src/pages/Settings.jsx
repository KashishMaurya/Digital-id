//settings page

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account and all associated profiles?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete("http://localhost:5000/api/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Account deleted");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      alert("Failed to delete account");
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          backgroundColor: "#f1f1f1",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <h2 style={{ marginBottom: "1rem" }}>⚙️ Settings</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button
          onClick={() => navigate("/create-profile")}
          style={{
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          + Add New Profile
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.75rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          ↪ Logout
        </button>

        <button
          onClick={handleDeleteAccount}
          style={{
            padding: "0.75rem",
            backgroundColor: "darkred",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          🗑 Delete My Account
        </button>
      </div>
    </div>
  );
}
