import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportStatuscss from "./ReportStatus.module.css";

export const ReportStatus = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/report/fetch");
        setReports(res.data);
        setFilteredReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Filter reports on search
  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = reports.filter((item) =>
      item.category?.toLowerCase().includes(lower) ||
      item.description?.toLowerCase().includes(lower) ||
      item.userId?.fullname?.toLowerCase().includes(lower)
    );
    setFilteredReports(filtered);
  }, [search, reports]);

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await axios.patch(
        `http://localhost:5000/api/report/status/${id}`,
        { status: newStatus }
      );
      setReports(reports.map(r => (r._id === id ? res.data.report : r)));
      setFilteredReports(filteredReports.map(r => (r._id === id ? res.data.report : r)));
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className={ReportStatuscss.loaderContainer}>
        <div className={ReportStatuscss.loader}></div>
      </div>
    );
  }

  // Determine next status and button label
  const getNextStatus = (status) => {
    switch (status) {
      case "Pending":
        return { next: "In Progress", label: "In Progress", disabled: false };
      case "In Progress":
        return { next: "Closed", label: "Closed", disabled: false };
      case "Closed":
        return { next: "Closed", label: "Closed", disabled: true };
      default:
        return { next: "Pending", label: "Update", disabled: false };
    }
  };

  return (
    <div className={ReportStatuscss.userContainer}>
      <h2 className={ReportStatuscss.h2}>Report Status</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        className={ReportStatuscss.searchInput}
        placeholder="Search by user, category, or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className={ReportStatuscss.tableContainer}>
        <table className={ReportStatuscss.userTable}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location</th>
              <th>Submit Date</th>
              <th>Closed Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No reports found
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => {
                const { next, label, disabled } = getNextStatus(report.status);

                return (
                  <tr key={report._id}>
                    <td>{report.userId?.fullname || "Unknown"}</td>
                    <td>{report.userId?.email || "N/A"}</td>
                    <td>{report.userId?.phone || "N/A"}</td>
                    <td>{report.category || "N/A"}</td>
                    <td>{report.description || "N/A"}</td>
                    <td>{report.location || "N/A"}</td>
                    <td>{new Date(report.reportSubmittedAt).toLocaleString() || "N/A"}</td>
                    <td>{new Date(report.reportClosedAt).toLocaleString() || "N/A"}</td>
                    <td>{report.status || "N/A"}</td>
                    <td>
                      <button
                        className={ReportStatuscss.updateButton}
                        onClick={() => updateStatus(report._id, next)}
                        disabled={disabled || updatingId === report._id}
                      >
                        {updatingId === report._id ? "Updating..." : label}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};