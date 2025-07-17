//footer component
import React from "react";
import "../css/NavbarFooter.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
      <p>
        Wishing safety and care for every soul — with compassion, Kashish Maurya
        🌼
      </p>
    </footer>
  );
};

export default Footer;
