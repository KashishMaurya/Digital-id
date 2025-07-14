import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
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
      const res = await axios.post(
        "http://localhost:5000/api/profiles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

        alert("Profile created successfully!");
        navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create profile");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Create Digital ID</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          style={{ marginBottom: 10 }}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Medical Conditions"
          value={medical}
          onChange={(e) => setMedical(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Emergency Contact Name"
          value={emergencyName}
          onChange={(e) => setEmergencyName(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Emergency Contact Phone"
          value={emergencyPhone}
          onChange={(e) => setEmergencyPhone(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Breed/Species"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          placeholder="Microchip / Tag ID"
          value={chipId}
          onChange={(e) => setChipId(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <h4>Custom Fields</h4>
        {customFields.map((field, idx) => (
          <div key={idx} style={{ display: "flex", gap: 10, marginBottom: 5 }}>
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
