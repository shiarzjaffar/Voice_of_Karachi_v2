import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const RecentComplaints = ({ complaints }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.recentSection}>

      <div className={styles.sectionHeading}>
        <h2>Recent Complaints</h2>
        <p>Your latest submitted complaints.</p>
      </div>

      <div className={styles.tableContainer}>

        <table className={styles.complaintTable}>

          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>

            {complaints.map((complaint) => (

              <tr key={complaint.id}>

                <td>{complaint.id}</td>

                <td>{complaint.department}</td>

                <td>{complaint.location}</td>

                <td>

                  <span
                    className={`${styles.statusBadge} ${
                      complaint.status === "Pending"
                        ? styles.pending
                        : complaint.status === "In Progress"
                        ? styles.progress
                        : styles.resolved
                    }`}
                  >
                    {complaint.status}
                  </span>

                </td>

                <td>{complaint.date}</td>

                <td>

                  <button
                    className={styles.viewButton}
                    onClick={() => navigate("/report-tracking")}
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default RecentComplaints;