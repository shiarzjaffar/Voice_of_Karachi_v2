import React from "react";
import styles from "./ComplaintDetails.module.css";

const ComplaintDetails = ({ formData, setFormData }) => {

  const maxCharacters = 1000;
  const characterCount = formData.description.length;

  return (
    <div className={styles.card}>

      {/* Header */}

      <div className={styles.cardHeader}>
        <h2>📝 Complaint Details</h2>

        <p>
          Provide a clear description of the issue so the responsible
          department understands the problem.
        </p>
      </div>

      {/* Description */}

      <div className={styles.section}>

        <label className={styles.label}>
          Description
        </label>

        <textarea
          className={styles.textarea}
          placeholder="Describe the issue in detail..."
          maxLength={maxCharacters}
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <div className={styles.counter}>
          {characterCount} / {maxCharacters}
        </div>

      </div>

      {/* Tips */}

      <div className={styles.tipCard}>

        <h3>💡 Tips for a Better Report</h3>

        <ul>

          <li>Mention nearby landmarks.</li>

          <li>Explain how severe the issue is.</li>

          <li>Mention if it creates a safety risk.</li>

          <li>Include any useful observations.</li>

        </ul>

      </div>

    </div>
  );
};

export default ComplaintDetails;