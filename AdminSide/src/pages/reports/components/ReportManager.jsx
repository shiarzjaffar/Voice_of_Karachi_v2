import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    updateReportStatus,
    updateAdminNotes,
} from "../services/reportsService";

import styles from "./ReportManager.module.css";

export default function ReportManager({
  open,
  report,
  onClose,
  onRefresh,
}) {
  const [status, setStatus] = useState("Pending");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (report) {
      setStatus(report.status || "Pending");
      setAdminNotes(
report.adminNotes || "");
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

      await updateAdminNotes(
    report._id,
    adminNotes
);

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

    <h3>Citizen Feedback</h3>

    {report.rating ? (

        <>

            <div className={styles.ratingDisplay}>

                {"★".repeat(report.rating)}
                {"☆".repeat(5 - report.rating)}

            </div>

            <div className={styles.feedbackBox}>

                {report.feedback
                    ? `"${report.feedback}"`
                    : "Citizen submitted a rating without comments."}

            </div>

        </>

    ) : (

        <div className={styles.noFeedback}>

            No feedback has been submitted yet.

        </div>

    )}

</div>

          <div className={styles.section}>
            <h3>Administrative Notes</h3>
            <p className={styles.sectionHint}>
    Visible to administrators and assigned employees only.
</p>

            <textarea
              className={styles.notesTextarea}
    value={adminNotes}
    onChange={(e) => setAdminNotes(e.target.value)}
    placeholder="Add internal notes for this report..."

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