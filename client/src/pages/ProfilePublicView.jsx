import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "../components/css/ProfilePublicView.css";

const API_BASE = import.meta.env.VITE_API_URL;

export default function ProfilePublicView() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/profiles/${id}`)
      .then((res) => setProfile(res.data))
      .catch(() => setError("Profile not found"));
  }, [id]);

  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="public-profile-wrapper">
      <div className="id-card">
        {profile.photoUrl && (
          <img src={profile.photoUrl} alt="Profile" className="id-card-photo" />
        )}

        <div className="id-card-content">
          <h2>{profile.name}</h2>
          <p>
            <strong>Type:</strong> {profile.type}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender}
          </p>
          <p>
            <strong>Condition:</strong> {profile.condition}
          </p>
          <p>
            <strong>Blood Group:</strong> {profile.bloodGroup}
          </p>
          <p>
            <strong>Medical:</strong> {profile.medical}
          </p>
          <p>
            <strong>Allergies:</strong> {profile.allergies}
          </p>
          <p>
            <strong>Breed:</strong> {profile.breed}
          </p>
          <p>
            <strong>Chip ID:</strong> {profile.chipId}
          </p>
          <p>
            <strong>Address:</strong> {profile.address}
          </p>
          <p>
            <strong>Phone:</strong> {profile.phone}
          </p>
          {profile.emergencyName || profile.emergencyPhone ? (
            <p>
              <strong>Emergency Contact:</strong> {profile.emergencyName}{" "}
              {profile.emergencyPhone && `(${profile.emergencyPhone})`}
            </p>
          ) : null}
          {profile.message && (
            <p>
              <strong>Message:</strong> {profile.message}
            </p>
          )}

          <div className="qr-section">
            <QRCodeCanvas value={window.location.href} size={128} />
            <p className="qr-caption">Scan for live info</p>
          </div>
        </div>
      </div>
    </div>
  );
}
