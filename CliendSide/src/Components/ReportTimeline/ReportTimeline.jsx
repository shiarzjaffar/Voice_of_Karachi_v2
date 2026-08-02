import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./ReportTimeline.module.css";
import { FaStar } from "react-icons/fa";

const ReportTimeline = () => {

  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const res = await api.get(`/report/${id}`);
        console.log(res.data);

        setReport(res.data);
 setRating(res.data.rating ?? 0);
setFeedback(res.data.feedback ?? "");

if (res.data.feedback || res.data.rating) {
    setSubmitted(true);
}
        console.log(report);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    fetchReport();

  }, [id]);

  const handleSubmitFeedback = async () => {

    if (rating === 0) {
        alert("Please select a rating.");
        return;
    }

    try {

        setSubmitting(true);

await api.post(
    `/report/feedback/${report._id}`,
    {
        rating,
        feedback,
    }
);

        setReport((prev) => ({
            ...prev,
            rating,
            feedback,
        }));

        setSubmitted(true);

        alert("Thank you for your feedback!");

    } catch (error) {

        console.error(error);

        alert("Unable to submit feedback.");

    } finally {

        setSubmitting(false);

    }

};

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
                        : report.status === "Closed"
                        ? styles.completed
                        : styles.pendingStep
                }`}
            >
                {report.status === "Closed" ? "✓" : "3"}
            </div>

            <div>

                <h4>Work in Progress</h4>

                <p>

                    {report.status === "Pending"
                        ? "Awaiting Assignment"
                        : report.status === "In Progress"
                        ? "Work is currently underway"
                        : "Work completed"}

                </p>

            </div>
        </div>

        <div className={styles.timelineItem}>
            <div
                className={`${styles.timelineIcon} ${
                    report.status === "Closed"
                        ? styles.completed
                        : styles.pendingStep
                }`}
            >
                {report.status === "Closed" ? "✓" : "4"}
            </div>

            <div>
                <h4>Complaint Resolved</h4>
            <p>

                {report.status === "Closed"

                    ? `Completed on ${new Date(
                        report.reportClosedAt
                    ).toLocaleString()}`

                    : "Pending"}

            </p>
            </div>
        </div>

    </div>

</div>

</div>


{report.status === "Closed" && report.reportClosedAt && (

    <div className={styles.feedbackCard}>

        <h2>Citizen Feedback</h2>

        {submitted ? (

            <>
                <div className={styles.ratingDisplay}>

                    {"★".repeat(report.rating || 0)}
                    {"☆".repeat(5 - (report.rating || 0))}

                </div>

                <p className={styles.feedbackText}>

                    {report.feedback
                        ? `"${report.feedback}"`
                        : "No feedback submitted."}

                </p>

                <p className={styles.thankYou}>
                    ✓ Thank you for your feedback.
                </p>

            </>

        ) : (

            <>

                <p className={styles.feedbackLabel}>
                    How satisfied are you with the resolution?
                </p>

                <div className={styles.ratingSelector}>

                    {[1,2,3,4,5].map((star) => (

                        <span
                            key={star}
                            className={
                                star <= rating
                                    ? styles.starActive
                                    : styles.star
                            }
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>

                    ))}

                </div>

                <textarea
                    className={styles.feedbackInput}
                    rows={5}
                    placeholder="Share your experience..."
                    value={feedback}
                    onChange={(e) =>
                        setFeedback(e.target.value)
                    }
                />

                <button
                    className={styles.submitButton}
                    disabled={submitting}
                    onClick={handleSubmitFeedback}
                >
                    {submitting
                        ? "Submitting..."
                        : "Submit Feedback"}
                </button>

            </>

        )}

    </div>

)}


      </div>

    </div>

  </div>



);

};

export default ReportTimeline;