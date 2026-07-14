import React from "react";
import styles from "./Dashboard.module.css";
import { FaUserShield } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";

const WelcomeSection = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const greeting = () => {
    const hour = today.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <section className={styles.welcomeCard}>

      <div className={styles.welcomeLeft}>

        <span className={styles.badge}>
          <FaUserShield />
          Citizen Portal
        </span>

        <h1>
          {greeting()},
          <br />
          Citizen
        </h1>

        <p>
          Welcome back to <strong>Voice of Karachi</strong>.
          Report civic issues, track complaint progress and
          help build a cleaner, safer and smarter Karachi.
        </p>

      </div>

      <div className={styles.welcomeRight}>

        <div className={styles.dateCard}>
          <MdOutlineCalendarToday />
          <span>{formattedDate}</span>
        </div>

      </div>

    </section>
  );
};

export default WelcomeSection;