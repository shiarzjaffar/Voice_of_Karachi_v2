import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./ReportManager.module.css";

import {
  updateReportStatus,
  addFeedback,
} from "../services/reportsService";

export default function ReportManager({
  open,
  report,
  onClose,
  onRefresh,
}) {
  const [status, setStatus] = useState("Pending");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (report) {
      setStatus(report.status || "Pending");
      setFeedback(report.feedback || "");
    }
  }, [report]);

  if (!open || !report) return null;

  const user = report.userId || {};

  const submittedDate = report.reportSubmittedAt
    ? new Date(report.reportSubmittedAt).toLocaleString()
    : "N/A";

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateReportStatus(report._id, status);

      await addFeedback(report._id, feedback);

      toast.success("Report updated successfully");

      await onRefresh();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.msg ||
          error?.response?.data?.error ||
          "Failed to update report"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <div>
            <h2>Manage Report</h2>
            <p>Review and update report information</p>
          </div>

          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={saving}
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>

          <div className={styles.section}>
            <h3>Report Details</h3>

            <div className={styles.grid}>

              <div>
                <label>Title</label>
                <p>{report.title || "N/A"}</p>
              </div>

              <div>
                <label>Category</label>
                <p>{report.category || "N/A"}</p>
              </div>

              <div>
                <label>Submitted</label>
                <p>{submittedDate}</p>
              </div>

              <div>
                <label>Current Status</label>

                <select
                  className={styles.select}
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                  disabled={saving}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Closed">
                    Closed
                  </option>
                </select>

              </div>

            </div>

          </div>

          <div className={styles.section}>
            <h3>Citizen Information</h3>

            <div className={styles.grid}>

              <div>
                <label>Name</label>
                <p>{user.fullname || "N/A"}</p>
              </div>

              <div>
                <label>Email</label>
                <p>{user.email || "N/A"}</p>
              </div>

              <div>
                <label>Phone</label>
                <p>{user.phone || "N/A"}</p>
              </div>

            </div>

          </div>
                    <div className={styles.section}>
            <h3>Description</h3>

            <p className={styles.description}>
              {report.description || "No description available."}
            </p>
          </div>

          <div className={styles.section}>
            <h3>Location</h3>

            <p className={styles.description}>
              {report.location || "N/A"}
            </p>
          </div>

          <div className={styles.section}>
            <h3>Admin Feedback</h3>

            <textarea
              className={styles.textarea}
              placeholder="Write feedback for this report..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={saving}
              rows={5}
            />
          </div>

          <div className={styles.footer}>

            <button
              className={styles.secondary}
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              className={styles.primary}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}