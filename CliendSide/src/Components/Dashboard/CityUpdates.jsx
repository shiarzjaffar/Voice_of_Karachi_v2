import React from "react";
import styles from "./Dashboard.module.css";
import {
  FaRoad,
  FaTint,
  FaExclamationTriangle,
  FaBullhorn,
} from "react-icons/fa";

const CityUpdates = () => {
  const updates = [
    {
      icon: <FaRoad />,
      title: "Road Maintenance",
      description:
        "Road resurfacing work is scheduled in Clifton Block 2 from 10 July to 12 July.",
      type: "Information",
    },
    {
      icon: <FaTint />,
      title: "Water Supply Notice",
      description:
        "Temporary interruption of water supply is expected in Gulshan due to maintenance work.",
      type: "Notice",
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Weather Advisory",
      description:
        "Heavy rainfall is forecast this week. Citizens are advised to avoid flooded roads.",
      type: "Alert",
    },
    {
      icon: <FaBullhorn />,
      title: "Public Announcement",
      description:
        "Help keep Karachi clean by reporting overflowing garbage bins through Voice of Karachi.",
      type: "Community",
    },
  ];

  return (
    <section className={styles.cityUpdates}>

      <div className={styles.sectionHeading}>
        <h2>Government Notices & City Updates</h2>
        <p>
          Important announcements, advisories and public service information.
        </p>
      </div>

      <div className={styles.updateGrid}>

        {updates.map((update, index) => (
          <div key={index} className={styles.updateCard}>

            <div className={styles.updateIcon}>
              {update.icon}
            </div>

            <span className={styles.updateType}>
              {update.type}
            </span>

            <h3>{update.title}</h3>

            <p>{update.description}</p>

          </div>
        ))}

      </div>

    </section>
  );
};

export default CityUpdates;