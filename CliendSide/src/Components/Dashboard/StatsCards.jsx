import React from "react";
import styles from "./Dashboard.module.css";
import {
  FaClipboardList,
  FaClock,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Complaints",
      value: stats.total,
      icon: <FaClipboardList />,
      className: styles.primaryCard,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      className: styles.pendingCard,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <FaTools />,
      className: styles.progressCard,
    },
    {
      title: "Resolved",
      value: stats.resolved,
      icon: <FaCheckCircle />,
      className: styles.successCard,
    },
  ];

  return (
    <section className={styles.statsGrid}>
      {cards.map((card) => (
        <div key={card.title} className={`${styles.statCard} ${card.className}`}>
          <div className={styles.statIcon}>{card.icon}</div>

          <div className={styles.statInfo}>
            <h3>{card.value}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StatsCards;