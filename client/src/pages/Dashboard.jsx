import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/profiles/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching profiles", err);
      });
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/create-profile")}>
        + Create New Profile
      </button>

      {profiles.map((profile) => (
        <div
          key={profile._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginTop: 20,
          }}
        >
          <p>
            <strong>Name:</strong> {profile.name}
          </p>

          <QRCodeCanvas
            title={profile._id}
            value={`http://localhost:5173/profile/${profile._id}`}
            size={128}
            onClick={(e) => {
              const win = window.open();
              win.document.write(`<img src="${e.target.toDataURL()}" />`);
            }}
          />

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => {
                const canvas = document.querySelector(
                  `canvas[title="${profile._id}"]`
                );
                const img = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = img;
                link.download = "qr-code.png";
                link.click();
              }}
            >
              Save QR
            </button>

            <button style={{ marginLeft: 10 }} onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
