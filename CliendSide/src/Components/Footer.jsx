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
            Digital Civic Engagement Platform
          </p>

          <p className={styles.description}>
            Empowering citizens to report civic issues, track complaint
            progress and contribute towards a cleaner, safer and smarter
            Karachi.
          </p>

        </div>

        {/* Platform */}

        <div>

          <h3>Platform</h3>

          <ul>

            <li><Link to="/">Home</Link></li>

            <li><Link to="/">About</Link></li>

            <li><Link to="/report-submit">Report Issue</Link></li>

            <li><Link to="/report-tracking">Track Complaint</Link></li>

          </ul>

        </div>

        {/* Departments */}

        <div>

          <h3>Departments</h3>

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
          Developed for academic demonstration purposes.
        </p>

      </div>

    </footer>
  );
};

export default Footer;