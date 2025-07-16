// navbar component
import React from "react";
import { Link } from "react-router-dom";
import "../css/NavbarFooter.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          💙 CareConnect
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/learn-more">Learn More</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
