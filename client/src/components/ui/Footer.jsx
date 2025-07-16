import React from "react";
import "../css/NavbarFooter.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CareConnect. All rights reserved.</p>
      <p>Keeping families connected and safe.</p>
    </footer>
  );
};

export default Footer;
