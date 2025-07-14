import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/profile/:id" element={<PublicProfile />} />
    </Routes>
  );
}

export default App;
