import React from "react";
import styles from "./ReviewSubmit.module.css";

const ReviewSubmit = ({
    formData,
    assignedDepartment,
    estimatedResponse,
    loading,
}) => {

    return (

        <div className={styles.card}>

            <div className={styles.cardHeader}>

                <h2>✅ Review Your Complaint</h2>

                <p>

                    Please verify the information before submitting.

                </p>

            </div>

            <div className={styles.summaryCard}>

                <div className={styles.item}>

                    <strong>📝 Issue</strong>

                    <span>{formData.title || "-"}</span>

                </div>

                <div className={styles.item}>

                    <strong>📂 Category</strong>

                    <span>{formData.category || "-"}</span>

                </div>

                <div className={styles.item}>

                    <strong>📍 Location</strong>

                    <span>{formData.location || "-"}</span>

                </div>

                <div className={styles.item}>

                    <strong>🏢 Department</strong>

                    <span>{assignedDepartment}</span>

                </div>

                <div className={styles.item}>

                    <strong>⏱ Response Time</strong>

                    <span>{estimatedResponse}</span>

                </div>

                <div className={styles.item}>

                    <strong>📷 Images</strong>

                    <span>{formData.photos.length} Attached</span>

                </div>

            </div>

            <label className={styles.confirmBox}>

                <input type="checkbox" required />

                <span>

                    I confirm that the above information is correct.

                </span>

            </label>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
            >

                {loading
                    ? "Submitting..."
                    : "Submit Complaint"}

            </button>

        </div>

    );

};

export default ReviewSubmit;