import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

import {
  FaClipboardList,
  FaSearch,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Report Complaint",
      description: "Create a new civic complaint.",
      icon: <FaClipboardList />,
      path: "/report-submit",
    },
    {
      title: "Track Complaints",
      description: "Check complaint progress and updates.",
      icon: <FaSearch />,
      path: "/report-tracking",
    },
    {
      title: "My Profile",
      description: "View and update your account.",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      title: "Help Center",
      description: "Emergency numbers and support.",
      icon: <FaQuestionCircle />,
      path: "/help-center",
    },
  ];

  return (
    <section className={styles.quickActions}>

      <div className={styles.sectionHeading}>
        <h2>Quick Actions</h2>
        <p>Access frequently used services with one click.</p>
      </div>

      <div className={styles.actionGrid}>
        {actions.map((action) => (
          <div
            key={action.title}
            className={styles.actionCard}
            onClick={() => navigate(action.path)}
          >
            <div className={styles.actionIcon}>
              {action.icon}
            </div>

            <h3>{action.title}</h3>

            <p>{action.description}</p>

            <span className={styles.actionLink}>
              Open →
            </span>

          </div>
        ))}
      </div>

    </section>
  );
};

export default QuickActions;