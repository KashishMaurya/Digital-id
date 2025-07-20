import { useNavigate } from "react-router-dom";
import Session from "supertokens-auth-react/recipe/session"; 
import axiosInstance from "../api/axiosInstance";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Session.signOut(); 
      navigate("/"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account and all associated profiles?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete("/api/auth/delete");
      alert("Account deleted");
      await Session.signOut(); 
       alert("Account deleted successfully");
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
