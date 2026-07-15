import React from "react";
import footercss from "./Footer.module.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className={footercss.footer}>
      <div className={footercss.container}>
        
        {/* 🏢 Branding */}
        <div className={footercss.brand}>
          <h2>RSI</h2>
          <p>Smart Reporting & Issue Management</p>
        </div>

        {/* 🔗 Navigation */}
        <div className={footercss.links}>
          <ul>
            <li><Link to="/dashboard">Admin Dashboard</Link></li>
            <li><Link to="/report-fetch">All Reports</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </ul>
        </div>

        {/* 📞 Contact Section */}
        <div className={footercss.contact}>
          <p>
            Support:{" "}
            <a href="mailto:rsi.support@gmail.com">rsi.support@gmail.com</a>
          </p>
          <p>&copy; {new Date().getFullYear()} RSI System. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};