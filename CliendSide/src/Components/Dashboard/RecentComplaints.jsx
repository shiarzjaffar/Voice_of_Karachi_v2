import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

const RecentComplaints = ({ complaints = [] }) => {
  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString();

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

            {complaints.length === 0 ? (

              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No recent complaints found.
                </td>
              </tr>

            ) : (

              complaints.map((complaint) => (

                <tr key={complaint._id}>

                  <td>
                    #{complaint._id.slice(-8).toUpperCase()}
                  </td>

                  <td>{complaint.department}</td>

                  <td>{complaint.location}</td>

                  <td>

                    <span
                      className={`${styles.statusBadge}
                      ${
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

                  <td>
                    {formatDate(
                      complaint.reportSubmittedAt
                    )}
                  </td>

                  <td>

                    <button
                      className={styles.viewButton}
                      onClick={() =>
                        navigate(
                          `/report-tracking/${complaint._id}`
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
};

export default RecentComplaints;