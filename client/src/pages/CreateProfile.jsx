import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../components/css/CreateProfile.css";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [medications, setMedications] = useState("");

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState(null);

  const [bloodGroup, setBloodGroup] = useState("");
  const [medical, setMedical] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [breed, setBreed] = useState("");
  const [chipId, setChipId] = useState("");

  const [customFields, setCustomFields] = useState([{ label: "", value: "" }]);
  const navigate = useNavigate();

  const handleAddField = () => {
    setCustomFields([...customFields, { label: "", value: "" }]);
  };

  const handleChangeField = (index, key, val) => {
    const updated = [...customFields];
    updated[index][key] = val;
    setCustomFields(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Photo is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("type", type);
    formData.append("condition", condition);
    formData.append("medications", medications); 
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("photo", photo);
    formData.append("bloodGroup", bloodGroup);
    formData.append("medical", medical);
    formData.append("allergies", allergies);
    formData.append("emergencyName", emergencyName);
    formData.append("emergencyPhone", emergencyPhone);
    formData.append("breed", breed);
    formData.append("chipId", chipId);
    formData.append("customFields", JSON.stringify(customFields));


    try {
      const token = localStorage.getItem("token");

      await axiosInstance.post("/api/profiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.msg) {
        alert("Error: " + err.response.data.msg);
      } else {
        alert("Failed to create profile");
      }
      console.error("Submit error:", err);
    }

  };

  return (
    <div className="create-profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Create Digital ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Type</option>
          <option>Senior</option>
          <option>Child</option>
          <option>Pet</option>
          <option>Friend</option>
          <option>Colleague</option>
          <option>Me</option>
          <option>Wife</option>
          <option>Other</option>
        </select>
        <input
          placeholder="Condition (e.g. Alzheimer's, Autism)"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <input
          placeholder="Medications (if any)"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          placeholder="Medical Notes"
          value={medical}
          onChange={(e) => setMedical(e.target.value)}
        />
        <input
          placeholder="Allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
        <input
          placeholder="Emergency Contact Name"
          value={emergencyName}
          onChange={(e) => setEmergencyName(e.target.value)}
        />
        <input
          placeholder="Emergency Contact Phone"
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          required
        />
        <input
          placeholder="Breed/Species"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <input
          placeholder="Microchip / Tag ID"
          value={chipId}
          onChange={(e) => setChipId(e.target.value)}
        />

        <h4>Custom Fields</h4>
        {customFields.map((field, idx) => (
          <div key={idx} className="custom-field-row">
            <input
              placeholder="Label"
              value={field.label}
              onChange={(e) => handleChangeField(idx, "label", e.target.value)}
            />
            <input
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleChangeField(idx, "value", e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddField}>
          + Add Field
        </button>
        <br />
        <br />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}
