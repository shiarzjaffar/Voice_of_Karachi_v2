import React, { useState } from "react";
import styles from "./ReportTracking.module.css";

const dummyComplaints = [
  {
    id: "UF-2026-000145",
    title: "Road Damage",
    status: "In Progress",
    department: "Road Maintenance",
    submitted: "15 Jul 2026",
  },
  {
    id: "UF-2026-000138",
    title: "Street Light Not Working",
    status: "Pending",
    department: "Electrical Maintenance",
    submitted: "13 Jul 2026",
  },
  {
    id: "UF-2026-000126",
    title: "Garbage Collection",
    status: "Resolved",
    department: "Solid Waste Management",
    submitted: "09 Jul 2026",
  },
];

const ReportTracking = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyComplaints.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "In Progress":
        return styles.progress;
      case "Resolved":
        return styles.resolved;
      default:
        return "";
    }
  };

  return (
    <div className={styles.page}>

      {/* Hero */}

      <div className={styles.hero}>

        <span className={styles.breadcrumb}>
          Dashboard / Report Tracking
        </span>

        <h1>Track Your Complaints</h1>

        <p>
          Monitor the progress of your reported civic issues and receive updates
          from the responsible department.
        </p>

      </div>

      {/* Search */}

      <div className={styles.searchCard}>

        <input
          type="text"
          placeholder="Search by Tracking ID or Issue Title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Complaint List */}

      <div className={styles.grid}>

        {filtered.map((item) => (

          <div className={styles.card} key={item.id}>

            <div className={styles.cardTop}>

              <h3>{item.title}</h3>

              <span className={`${styles.badge} ${getStatusClass(item.status)}`}>
                {item.status}
              </span>

            </div>

            <p>
              <strong>Tracking ID:</strong> {item.id}
            </p>

            <p>
              <strong>Department:</strong> {item.department}
            </p>

            <p>
              <strong>Submitted:</strong> {item.submitted}
            </p>

            <button className={styles.button}>
              View Details →
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ReportTracking;