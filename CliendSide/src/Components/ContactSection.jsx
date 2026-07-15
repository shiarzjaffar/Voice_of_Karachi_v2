import React from "react";
import styles from "./ContactSection.module.css";

import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

export const ContactSection = () => {
  return (
    <section id="contact" className={styles.section}>

      <div className={styles.container}>

        <div className={styles.heading}>

          <span className={styles.badge}>
            SUPPORT
          </span>

          <h2>Need Assistance?</h2>

          <p>
            Have questions about reporting civic issues or tracking complaints?
            Our support team is here to help you.
          </p>

        </div>

        <div className={styles.cards}>

          <div className={styles.card}>

            <div className={styles.icon}>
              <EmailIcon fontSize="large" />
            </div>

            <h3>Email</h3>

            <p>support@voiceofkarachi.pk</p>

          </div>

          <div className={styles.card}>

            <div className={styles.icon}>
              <LocationOnIcon fontSize="large" />
            </div>

            <h3>Office</h3>

            <p>Karachi, Pakistan</p>

          </div>

          <div className={styles.card}>

            <div className={styles.icon}>
              <AccessTimeIcon fontSize="large" />
            </div>

            <h3>Office Hours</h3>

            <p>Monday – Friday</p>

            <span>9:00 AM – 5:00 PM</span>

          </div>

        </div>

        <div className={styles.buttonContainer}>

          <button className={styles.button}>

            <SupportAgentIcon />

            Contact Support

          </button>

        </div>

      </div>

    </section>
  );
};

export default ContactSection;