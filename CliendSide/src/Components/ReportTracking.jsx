import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import styles from "./ReportTracking.module.css";



const ReportTracking = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [complaints, setComplaints] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  fetchReports();

}, []);

const fetchReports = async () => {

  try {

    const res = await api.get("/report/user/reports");

    setComplaints(res.data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

};

  const filtered = complaints.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item._id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "In Progress":
        return styles.progress;
      case "Closed":
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

      {loading ? (

        <p>Loading complaints...</p>

      ) : (

      <div className={styles.grid}>

        filtered.length === 0 ? (

<div className={styles.card}>
    No complaints found.
</div>

) : (

filtered.map(...)

)

      </div>
      )}
    </div>
    
  );
};

export default ReportTracking;