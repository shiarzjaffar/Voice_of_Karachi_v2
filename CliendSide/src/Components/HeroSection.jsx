import React from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import HeroSectioncss from "./HeroSection.module.css";

export const HeroSection = () => {
  return (
    <header className={`${HeroSectioncss.hero} ${HeroSectioncss.fadeIn}`}>

      <p className={HeroSectioncss.badge}>
        Voice of Karachi
      </p>

      <h1 className={HeroSectioncss.typewriterText}>
        <Typewriter
          words={[
            "Report Civic Issues",
            "Track Complaint Progress",
            "Build a Better Karachi",
            "Together We Improve Our City"
          ]}
          loop
          cursor
          cursorStyle="|"
          typeSpeed={55}
          deleteSpeed={35}
          delaySpeed={1800}
        />
      </h1>

      <p className={HeroSectioncss.description}>
        Voice of Karachi empowers citizens to report civic issues,
        monitor complaint progress, and collaborate with city departments
        to create a cleaner, safer and smarter Karachi.
      </p>

      <div className={HeroSectioncss.buttonGroup}>
        <Link to="/report-submit" className={HeroSectioncss.ctaButton}>
          Report an Issue
        </Link>

        <Link to="/report-tracking" className={HeroSectioncss.secondaryButton}>
          Track Complaint
        </Link>
      </div>

      <div className={HeroSectioncss.stats}>

        <div className={HeroSectioncss.card}>
          <h2>15K+</h2>
          <span>Citizens</span>
        </div>

        <div className={HeroSectioncss.card}>
          <h2>8500+</h2>
          <span>Resolved</span>
        </div>

        <div className={HeroSectioncss.card}>
          <h2>12</h2>
          <span>Departments</span>
        </div>

        <div className={HeroSectioncss.card}>
          <h2>24/7</h2>
          <span>Support</span>
        </div>

      </div>

    </header>
  );
};