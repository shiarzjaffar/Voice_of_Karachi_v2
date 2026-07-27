import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* Brand */}

        <div className={styles.brand}>

          <h2>Voice of Karachi</h2>

          <p className={styles.subtitle}>
            Citizen Complaint Management System
          </p>

          <p className={styles.description}>
            Voice of Karachi enables citizens to report civic issues, monitor complaint progress, and improve public service delivery through a transparent digital platform.
          </p>

        </div>

        {/* Platform */}

        <div>

          <h3>Quick Links</h3>

          <ul>

            <li><Link to="/">Home</Link></li>

            <li><Link to="/">About</Link></li>

            <li><Link to="/report-submit">Report Issue</Link></li>

            <li><Link to="/report-tracking">Track Complaint</Link></li>

          </ul>

        </div>

        {/* Departments */}

        <div>

          <h3>Government Departments</h3>

          <ul>

            <li>Road Maintenance</li>

            <li>Water Supply</li>

            <li>Waste Management</li>

            <li>Street Lighting</li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3>Contact</h3>

          <ul>

            <li>Karachi, Pakistan</li>

            <li>support@voiceofkarachi.pk</li>

            <li>Available 24/7</li>

          </ul>

        </div>

      </div>

      <div className={styles.bottomBar}>

        <p>
          © {new Date().getFullYear()} Voice of Karachi
        </p>

        <p>
          Final Year Project • Department of Computer Science
        </p>

      </div>

    </footer>
  );
};

export default Footer;