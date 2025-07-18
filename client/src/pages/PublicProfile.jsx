//profile card for dashboard

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/profiles/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Error fetching profile:", err.message);
      });
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>{profile.name}'s Digital ID</h2>
      <img
        src={`http://localhost:5000/uploads/${profile.photo}`}
        alt="profile"
        style={{ width: "100%", borderRadius: 10 }}
      />
      <p>
        <strong>Age:</strong> {profile.age}
      </p>
      <p>
        <strong>Gender:</strong> {profile.gender}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
      <p>
        <strong>Blood Group:</strong> {profile.bloodGroup}
      </p>
      <p>
        <strong>Message:</strong> {profile.message}
      </p>

      {/* Show custom fields */}
      <h4>Additional Info</h4>
      {profile.customFields?.map((f, i) => (
        <p key={i}>
          <strong>{f.label}:</strong> {f.value}
        </p>
      ))}
    </div>
  );
}
