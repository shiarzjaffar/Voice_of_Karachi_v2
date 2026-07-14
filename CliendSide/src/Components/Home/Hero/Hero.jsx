import React from "react";
import { Link } from "react-router-dom";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>

        <span className={styles.badge}>
          Government of Sindh • Digital Civic Platform
        </span>

        <h1 className={styles.title}>
          Voice of <span>Karachi</span>
        </h1>

        <p className={styles.subtitle}>
          Report civic issues directly to the relevant government departments,
          track complaint progress, and help build a cleaner, safer and smarter
          Karachi.
        </p>

        <div className={styles.actions}>
          <Link to="/report-submit" className={styles.primaryButton}>
            Report an Issue
          </Link>

          <Link to="/report-tracking" className={styles.secondaryButton}>
            Track Complaint
          </Link>
        </div>

        <div className={styles.statistics}>

          <div className={styles.statCard}>
            <h2>15K+</h2>
            <p>Citizens</p>
          </div>

          <div className={styles.statCard}>
            <h2>8,500+</h2>
            <p>Resolved</p>
          </div>

          <div className={styles.statCard}>
            <h2>12</h2>
            <p>Departments</p>
          </div>

          <div className={styles.statCard}>
            <h2>24/7</h2>
            <p>Support</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;