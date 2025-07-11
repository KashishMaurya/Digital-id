// login/register form

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "register" : "login";

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          email,
          password,
        }
      );

      if (!isRegistering) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Registration successful. Please log in.");
        setIsRegistering(false);
      }

      setError("");
    } catch (err) {
      const msg = err.response?.data?.msg || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <p>
        {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}
