import React from "react";
import Aboutuscss from "./Aboutus.module.css";
import AboutUsIMG from "/AboutUs.jpg";

import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export const Aboutus = () => {
  return (
    <div className={Aboutuscss.aboutContainer}>
      
      {/* Top Header Image */}
      <div className={Aboutuscss.headerImageWrapper}>
        <img src={AboutUsIMG} className={Aboutuscss.headerImage} alt="About Us" />
        <h1 className={Aboutuscss.pageTitle}>About Us</h1>
      </div>

      {/* Content Section */}
      <div className={Aboutuscss.contentWrapper}>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>Who We Are</h2>
          <p className={Aboutuscss.text}>
            UrbanFix is dedicated to improving the quality of urban living through
            reliable road maintenance services, waste and garbage removal, public
            space cleaning, and city-area upkeep. Our purpose is to build cleaner,
            safer, and well-maintained environments for communities to thrive.
          </p>
        </section>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>Our Mission</h2>
          <p className={Aboutuscss.text}>
            To maintain and transform public spaces by keeping roads safe, streets
            clean, and environments sustainable. We aim to bring efficiency and
            accountability to everyday city maintenance.
          </p>
        </section>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>Our Vision</h2>
          <p className={Aboutuscss.text}>
            A future where every city is clean, organized, safe, and environmentally
            responsible — where communities can rely on consistent and transparent
            municipal services.
          </p>
        </section>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>What We Do</h2>
          <ul className={Aboutuscss.list}>
            <li>🛣 Road & Pathway Maintenance</li>
            <li>🗑 Garbage Collection & Waste Removal</li>
            <li>🏞 Public Space Cleaning & Maintenance</li>
            <li>🚮 Street Sweeping & Litter Control</li>
            <li>🌿 Small Landscaping & Green Area Care</li>
          </ul>
        </section>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>Our Values</h2>
          <ul className={Aboutuscss.list}>
            <li>✔ Responsibility</li>
            <li>✔ Cleanliness</li>
            <li>✔ Transparency</li>
            <li>✔ Efficiency</li>
            <li>✔ Community Trust</li>
          </ul>
        </section>

        <section className={Aboutuscss.section}>
          <h2 className={Aboutuscss.sectionTitle}>Our Commitment</h2>
          <p className={Aboutuscss.text}>
            At UrbanFix, we take pride in serving local communities with dependable and
            high-quality maintenance services. Our team works with dedication to
            ensure cleaner streets, safer environments, and well-maintained public areas.
          </p>
        </section>

        {/* Social Media Section */}
        <div className={Aboutuscss.socialWrapper}>
          <h2 className={Aboutuscss.sectionTitle}>Connect With Us</h2>

          <div className={Aboutuscss.socialLinks}>

            <div className={Aboutuscss.iconBox}>
              <FaFacebookF className={Aboutuscss.icon} />
              <span className={Aboutuscss.iconLabel}>Facebook</span>
            </div>

            <div className={Aboutuscss.iconBox}>
              <FaTwitter className={Aboutuscss.icon} />
              <span className={Aboutuscss.iconLabel}>Twitter</span>
            </div>

            <div className={Aboutuscss.iconBox}>
              <FaInstagram className={Aboutuscss.icon} />
              <span className={Aboutuscss.iconLabel}>Instagram</span>
            </div>

            <div className={Aboutuscss.iconBox}>
              <FaLinkedinIn className={Aboutuscss.icon} />
              <span className={Aboutuscss.iconLabel}>LinkedIn</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};