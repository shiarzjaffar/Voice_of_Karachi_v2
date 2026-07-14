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

        setReport(res.data);

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

      <div className={styles.card}>

        <h1 className={styles.title}>
          {report.title}
        </h1>

        <p className={styles.description}>
          {report.description}
        </p>

      </div>

    </div>

  </div>

);

};

export default ReportTimeline;