import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportClosedcss from "./ReportClosed.module.css";

export const ReportClosed = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch all reports that are not closed
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/report/fetch");
        const openReports = res.data.filter(r => r.status !== "Closed");
        setReports(openReports);
        setFilteredReports(openReports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 🔍 Search filter
  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = reports.filter((item) =>
      item.category?.toLowerCase().includes(lower) ||
      item.description?.toLowerCase().includes(lower) ||
      item.userId?.fullname?.toLowerCase().includes(lower)
    );
    setFilteredReports(filtered);
  }, [search, reports]);

  // Close report
  const closeReport = async (id) => {
    try {
      setUpdatingId(id);
      const res = await axios.patch(`http://localhost:5000/api/report/close/${id}`);
      // Update the state by removing the closed report
      const updatedReports = reports.filter(r => r._id !== id);
      setReports(updatedReports);
      setFilteredReports(updatedReports);
    } catch (error) {
      console.error("Failed to close report:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className={ReportClosedcss.loaderContainer}>
        <div className={ReportClosedcss.loader}></div>
      </div>
    );
  }

  return (
    <div className={ReportClosedcss.userContainer}>
      <h2 className={ReportClosedcss.h2}>Open Reports</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        className={ReportClosedcss.searchInput}
        placeholder="Search by user, category, or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={ReportClosedcss.tableContainer}>
        <table className={ReportClosedcss.userTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No open reports found
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report._id}>
                  <td>{report.userId?.fullname || "Unknown"}</td>
                  <td>{report.userId?.email || "N/A"}</td>
                  <td>{report.userId?.phone || "N/A"}</td>
                  <td>{report.category}</td>
                  <td>{report.description}</td>
                  <td>{report.location}</td>
                  <td>{new Date(report.createdAt).toLocaleString()}</td>
                  <td>{report.status}</td>
                  <td>
                    <button
                      className={ReportClosedcss.closeButton}
                      onClick={() => closeReport(report._id)}
                      disabled={updatingId === report._id}
                    >
                      {updatingId === report._id ? "Closing..." : "Close"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};