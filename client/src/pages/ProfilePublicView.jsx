//public view page card (after qr scanned)

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { QRCodeCanvas } from "qrcode.react";
import "../components/css/ProfilePublicView.css";

export default function ProfilePublicView() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/profiles/${id}`)
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

          {profile.type && (
            <p>
              <strong>Type:</strong> {profile.type}
            </p>
          )}
          {profile.age && (
            <p>
              <strong>Age:</strong> {profile.age}
            </p>
          )}
          {profile.gender && (
            <p>
              <strong>Gender:</strong> {profile.gender}
            </p>
          )}
          {profile.condition && (
            <p>
              <strong>Condition:</strong> {profile.condition}
            </p>
          )}
          {profile.bloodGroup && (
            <p>
              <strong>Blood Group:</strong> {profile.bloodGroup}
            </p>
          )}
          {profile.medical && (
            <p>
              <strong>Medical:</strong> {profile.medical}
            </p>
          )}
          {profile.allergies && (
            <p>
              <strong>Allergies:</strong> {profile.allergies}
            </p>
          )}
          {profile.breed && (
            <p>
              <strong>Breed:</strong> {profile.breed}
            </p>
          )}
          {profile.chipId && (
            <p>
              <strong>Chip ID:</strong> {profile.chipId}
            </p>
          )}
          {profile.address && (
            <p>
              <strong>Address:</strong> {profile.address}
            </p>
          )}
          {profile.phone && (
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
          )}
          {(profile.emergencyName || profile.emergencyPhone) && (
            <p>
              <strong>Emergency Contact:</strong> {profile.emergencyName}{" "}
              {profile.emergencyPhone && `(${profile.emergencyPhone})`}
            </p>
          )}
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
