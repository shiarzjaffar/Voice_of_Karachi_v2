import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./ReportTimeline.module.css";

const ReportTimeline = () => {

  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/report/${id}`
        );
        console.log(res.data);

        setReport(res.data);
        console.log(report);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchReport();

  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!report) {
    return <h2>Report not found.</h2>;
  }

return (

  <div className={styles.page}>

    <div className={styles.container}>

      <Link
        to="/report-tracking"
        className={styles.backButton}
      >
        ← Back to Tracking
      </Link>

      <div className={styles.header}>

    <div>

        <h1 className={styles.title}>
            {report.title}
        </h1>

        <p className={styles.trackingId}>
            Tracking ID:
            {" "}
            VOK-{report._id.slice(-8).toUpperCase()}
        </p>

    </div>

    <span
        className={`${styles.status} ${
            styles[
                report.status
                    ?.replace(/\s/g, "")
                    .toLowerCase()
            ]
        }`}
    >
        {report.status}
    </span>

</div>

      <div className={styles.card}>
<div className={styles.overviewCard}>

    <h2>Complaint Overview</h2>

    <div className={styles.overviewGrid}>

        <div className={styles.overviewItem}>
            <span>Category</span>
            <strong>{report.category}</strong>
        </div>

        <div className={styles.overviewItem}>
            <span>Department</span>
            <strong>
                {report.department || "To Be Assigned"}
            </strong>
        </div>

        <div className={styles.overviewItem}>
            <span>Submitted</span>
            <strong>
                {new Date(report.createdAt).toLocaleDateString()}
            </strong>
        </div>

        <div className={styles.overviewItem}>
            <span>Location</span>
            <strong>{report.location}</strong>
        </div>

    </div>

</div>

<div className={styles.descriptionCard}>

    <h2>Complaint Description</h2>

    <p className={styles.description}>
        {report.description}
    </p>

    <div className={styles.timelineCard}>

    <h2>Complaint Timeline</h2>

    <div className={styles.timeline}>

        <div className={styles.timelineItem}>
            <div className={`${styles.timelineIcon} ${styles.completed}`}>
                ✓
            </div>

            <div>
                <h4>Complaint Submitted</h4>
                <p>
                    {new Date(report.createdAt).toLocaleString()}
                </p>
            </div>
        </div>

        <div className={styles.timelineItem}>
            <div
                className={`${styles.timelineIcon} ${
                    report.department
                        ? styles.completed
                        : styles.pendingStep
                }`}
            >
                {report.department ? "✓" : "2"}
            </div>

            <div>
                <h4>Assigned to Department</h4>
                <p>
                    {report.department || "Awaiting assignment"}
                </p>
            </div>
        </div>

        <div className={styles.timelineItem}>
            <div
                className={`${styles.timelineIcon} ${
                    report.status === "In Progress"
                        ? styles.active
                        : report.status === "Resolved"
                        ? styles.completed
                        : styles.pendingStep
                }`}
            >
                {report.status === "Resolved" ? "✓" : "3"}
            </div>

            <div>
                <h4>Work in Progress</h4>
                <p>{report.status}</p>
            </div>
        </div>

        <div className={styles.timelineItem}>
            <div
                className={`${styles.timelineIcon} ${
                    report.status === "Resolved"
                        ? styles.completed
                        : styles.pendingStep
                }`}
            >
                {report.status === "Resolved" ? "✓" : "4"}
            </div>

            <div>
                <h4>Complaint Resolved</h4>
                <p>
                    {report.status === "Resolved"
                        ? "Completed"
                        : "Pending"}
                </p>
            </div>
        </div>

    </div>

</div>

</div>



      </div>

    </div>

  </div>



);

};

export default ReportTimeline;