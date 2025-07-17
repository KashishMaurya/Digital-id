import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import PublicProfile from "./pages/PublicProfile";
import EditProfile from "./pages/EditProfile";
import LandingPage from "./pages/LandingPage";
import LearnMore from "./pages/LearnMore";
import Settings from "./pages/Settings";
import ProfilePublicView from "./pages/ProfilePublicView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn-more" element={<LearnMore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/profile/:id" element={<ProfilePublicView />} />
      <Route path="/edit-profile/:id" element={<EditProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
