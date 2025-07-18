// dashboard - parent user

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { QRCodeCanvas } from "qrcode.react";
import "../components/css/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance
      // .get("/api/profiles/user")
      .get("/api/profiles/user", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      })
      .then((res) => setProfiles(res.data))
      .catch((err) => console.error("Error fetching profiles", err));
  }, [navigate]
  );

  const handleDeleteProfile = async (id) => {
    if (!window.confirm("Delete this profile?")) return;
    try {
      await axiosInstance.delete(`/api/profiles/${id}`);
      setProfiles(profiles.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleSaveQR = (id) => {
    const canvas = document.querySelector(`canvas[title="${id}"]`);
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = img;
    link.download = "qr-code.png";
    link.click();
  };

  const handleViewLarge = (profile) => {
    const fields = [
      { label: "Type", value: profile.type },
      { label: "Age", value: profile.age },
      { label: "Gender", value: profile.gender },
      { label: "Condition", value: profile.condition },
      { label: "Blood Group", value: profile.bloodGroup },
      { label: "Medical", value: profile.medical },
      { label: "Allergies", value: profile.allergies },
      { label: "Breed", value: profile.breed },
      { label: "Chip ID", value: profile.chipId },
      { label: "Address", value: profile.address },
      { label: "Phone", value: profile.phone },
      {
        label: "Emergency Contact",
        value:
          profile.emergencyName && profile.emergencyPhone
            ? `${profile.emergencyName} (${profile.emergencyPhone})`
            : profile.emergencyName || profile.emergencyPhone || "",
      },
      { label: "Message", value: profile.message },
    ];

    const infoHTML = fields
      .filter((f) => f.value && f.value.trim() !== "")
      .map((f) => `<p><strong>${f.label}:</strong> ${f.value}</p>`)
      .join("");

    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(`
      <html>
        <head>
          <title>${profile.name} - Full View</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
            img.photo { width: 160px; height: 160px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; border: 2px solid #007bff; }
            h2 { margin-bottom: 0.5rem; }
            .info { text-align: left; margin-top: 1rem; font-size: 0.95rem; }
            .info p { margin: 0.4rem 0; }
            canvas { margin-top: 1.5rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>${profile.name}</h2>
            ${
              profile.photoUrl
                ? `<img src="${profile.photoUrl}" alt="Photo" class="photo" />`
                : ""
            }
  
            <div class="info">
              ${infoHTML}
            </div>
  
            <canvas id="qrCanvas"></canvas>
          </div>
  
          <script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>
          <script>
            QRCode.toCanvas(document.getElementById("qrCanvas"), "${
              window.location.origin
            }/profile/${profile._id}", { width: 200 });
          </script>
        </body>
      </html>
    `);
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            💙 CareConnect
          </Link>
        </div>
        <div className="navbar-right">
          <Link to="/settings" className="btn outline">
            ⚙️ Settings
          </Link>
        </div>
      </nav>

      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Managing {profiles.length} profiles</p>
      </div>

      <div className="profile-grid">
        {profiles.map((profile) => (
          <div key={profile._id} className="profile-card">
            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="profile-photo"
              />
            )}

            <div className="profile-role-label">{profile.type}</div>

            <h3>{profile.name}</h3>
            <div className="profile-details">
              Age: {profile.age}
              {profile.condition &&
                profile.condition.trim() !== "" &&
                ` • ${profile.condition}`}
            </div>

            <div className="qr-wrapper">
              <QRCodeCanvas
                title={profile._id}
                value={`${window.location.origin}/profile/${profile._id}`}
                size={96}
                onClick={(e) => {
                  const win = window.open();
                  win.document.write(`<img src="${e.target.toDataURL()}" />`);
                }}
              />
            </div>
            <p className="qr-label">
              QR Code: QR_{profile._id.slice(-5).toUpperCase()}
            </p>

            <div className="profile-actions">
              <button onClick={() => handleViewLarge(profile)}>
                View Large
              </button>
              <button onClick={() => window.print()}>Print</button>
            </div>

            <div className="profile-actions">
              <button onClick={() => navigate(`/edit-profile/${profile._id}`)}>
                Edit
              </button>
              <button
                className="danger"
                onClick={() => handleDeleteProfile(profile._id)}
              >
                Delete
              </button>
            </div>

            <p className="created-date">
              Created: {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
