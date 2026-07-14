import React from "react";
import styles from "./LatestIssues.module.css";

const issues = [
  {
    title: "Road Damage",
    location: "Shahrah-e-Faisal",
    status: "In Progress"
  },
  {
    title: "Water Leakage",
    location: "Gulshan-e-Iqbal",
    status: "Resolved"
  },
  {
    title: "Garbage Collection",
    location: "DHA Phase 6",
    status: "Pending"
  },
  {
    title: "Broken Street Lights",
    location: "North Nazimabad",
    status: "Assigned"
  }
];

const getStatusClass = (status) => {
  switch (status) {
    case "Resolved":
      return styles.resolved;
    case "In Progress":
      return styles.progress;
    case "Assigned":
      return styles.assigned;
    default:
      return styles.pending;
  }
};

export const LatestIssues = () => {
  return (
    <section className={styles.section}>

      <div className={styles.container}>

        <div className={styles.heading}>

          <span className={styles.badge}>
            LATEST COMMUNITY ISSUES
          </span>

          <h2>
            Recent Complaints
          </h2>

          <p>
            Stay informed about recently reported civic issues across Karachi.
          </p>

        </div>

        <div className={styles.grid}>

          {issues.map((issue, index) => (

            <div className={styles.card} key={index}>

              <h3>{issue.title}</h3>

              <p className={styles.location}>
                📍 {issue.location}
              </p>

              <span className={`${styles.status} ${getStatusClass(issue.status)}`}>
                {issue.status}
              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default LatestIssues;