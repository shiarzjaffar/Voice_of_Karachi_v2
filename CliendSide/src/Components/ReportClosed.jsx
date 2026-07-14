import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ReportClosedcss from "./ReportClosed.module.css";
import { Sidebar } from "./Sidebar";

export const ReportClosed = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  /* ================= FETCH REPORTS ================= */
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/report/fetch",
          { withCredentials: true }
        );
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

  /* ================= SEARCH FILTER ================= */
  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = reports.filter(
      (item) =>
        item.category?.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower) ||
        item.userId?.fullname?.toLowerCase().includes(lower)
    );
    setFilteredReports(filtered);
  }, [search, reports]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const res = await axios.patch(
        `http://localhost:5000/api/report/status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      setReports((prev) =>
        prev.map((r) => (r._id === id ? res.data.report : r))
      );
      setFilteredReports((prev) =>
        prev.map((r) => (r._id === id ? res.data.report : r))
      );
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  /* ================= SUBMIT FEEDBACK ================= */
  const submitFeedback = async (reportId) => {
    const { value: feedback } = await Swal.fire({
      title: "Submit Feedback",
      input: "textarea",
      inputPlaceholder: "Write feedback for this report...",
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
    
      /* ===== MANUAL THEME ===== */
      background: "#0E2A43",
      color: "#F4F8F9",
      confirmButtonColor: "#5BA0BC",
      cancelButtonColor: "#3D6582",
    
      inputAttributes: {
        style: `
          background: #3D6582;
          color: #F4F8F9;
          border: 1px solid #5BA0BC;
          border-radius: 10px;
          padding: 12px;
        `,
      },
    
      inputValidator: (value) =>
        !value && "Feedback cannot be empty",
    });
  
    if (!feedback) return;
  
    try {
      await axios.post(
        `http://localhost:5000/api/report/feedback/${reportId}`,
        { feedback },
        { withCredentials: true }
      );
    
      setReports((prev) =>
        prev.map((r) =>
          r._id === reportId ? { ...r, feedback } : r
        )
      );
      setFilteredReports((prev) =>
        prev.map((r) =>
          r._id === reportId ? { ...r, feedback } : r
        )
      );
    
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Feedback submitted successfully",
        background: "#0E2A43",
        color: "#F4F8F9",
        confirmButtonColor: "#5BA0BC",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.error ||
          "Failed to submit feedback",
        background: "#0E2A43",
        color: "#F4F8F9",
        confirmButtonColor: "#5BA0BC",
      });
    }
  };

  /* ================= STATUS FLOW ================= */
  const getNextStatus = (status) => {
    switch (status) {
      case "Pending":
        return { next: "In Progress", label: "In Progress", disabled: false };
      case "In Progress":
        return { next: "Closed", label: "Closed", disabled: false };
      case "Closed":
        return { disabled: true };
      default:
        return { next: "Pending", label: "Update", disabled: false };
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className={ReportClosedcss.loaderContainer}>
        <div className={ReportClosedcss.loader}></div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <Sidebar />

      <div className={ReportClosedcss.userContainer}>
        <h2 className={ReportClosedcss.h2}>Report Status</h2>

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
                <th>Submit Date</th>
                <th>Closed Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="10" className={ReportClosedcss.emptyRow}>
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
                      <td>{report.category}</td>
                      <td>{report.description}</td>
                      <td>{report.location}</td>
                      <td>
                        {new Date(report.reportSubmittedAt).toLocaleString()}
                      </td>
                      <td>
                        {report.reportClosedAt
                          ? new Date(report.reportClosedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{report.status}</td>

                      <td>
                        {report.status === "Closed" ? (
                          report.feedback ? (
                            <span style={{ color: "lightgreen" }}>
                              Feedback Submitted
                            </span>
                          ) : (
                            <button
                              className={ReportClosedcss.feedbackButton}
                              onClick={() => submitFeedback(report._id)}
                            >
                              Feedback
                            </button>
                          )
                        ) : (
                          <button
                            className={ReportClosedcss.updateButton}
                            onClick={() => updateStatus(report._id, next)}
                            disabled={disabled || updatingId === report._id}
                          >
                            {updatingId === report._id
                              ? "Updating..."
                              : label}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};