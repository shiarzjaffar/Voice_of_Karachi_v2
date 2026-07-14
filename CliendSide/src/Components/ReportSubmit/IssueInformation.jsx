import React from "react";
import {
  FaClipboardList,
  FaTags,
} from "react-icons/fa";

import styles from "./IssueInformation.module.css";


const categoryIcons = {
  "Solid Waste": "🗑",
  "Roads & Infrastructure": "🛣",
  "Street Lights": "💡",
  "Water Supply": "💧",
  "Sewerage & Drainage": "🚰",
  "Parks & Green Areas": "🌳",
  Encroachments: "🚧",
  "Other Civic Issue": "📋",
};

const IssueInformation = ({
  formData,
  setFormData,
  showOptions,
  setShowOptions,
  assignedDepartment,
  estimatedResponse,
  categoryDetails,
}) => {
  return (
  <div className={styles.card}>

    {/* ============================
        Header
    ============================ */}

    <div className={styles.cardHeader}>

      <h2>📝 Issue Information</h2>

      <p>
        Tell us what happened so we can route your complaint
        to the correct department.
      </p>

    </div>

    {/* ============================
        Issue Title
    ============================ */}

    <div className={styles.section}>

      <label className={styles.label}>
        Issue Title
      </label>

      <div className={styles.inputBox}>

        <input
          type="text"
          placeholder="Example: Broken Street Light"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />

      </div>

    </div>

    {/* ============================
        Category
    ============================ */}

    <div className={styles.section}>

      <label className={styles.label}>
        Issue Category
      </label>

      <div
        className={`${styles.selectBox} ${
          showOptions ? styles.open : ""
        }`}
      >

        <div
          className={styles.selected}
          onClick={() => setShowOptions(!showOptions)}
        >

<span>
  {formData.category ? (
    <>
      <span className={styles.categoryIcon}>
        {categoryIcons[formData.category]}
      </span>

      {formData.category}
    </>
  ) : (
    "Select a category"
  )}
</span>

          <span className={styles.arrow}>
            ▼
          </span>

        </div>

        {showOptions && (

          <div className={styles.options}>

            {Object.keys(categoryDetails).map((category) => (

              <div
                key={category}
                className={styles.option}
                onClick={() => {

                  setFormData({
                    ...formData,
                    category,
                  });

                  setShowOptions(false);

                }}
              >

                <>
  <span className={styles.categoryIcon}>
    {categoryIcons[category]}
  </span>

  {category}
</>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

    {/* ============================
        Automatic Assignment
    ============================ */}

    {formData.category && (

      <div className={styles.assignmentCard}>

        <h3>🤖 Automatic Assignment</h3>

<p className={styles.assignmentText}>
Based on the selected category, your complaint
will automatically be routed to the appropriate
government department.
</p>

        <div className={styles.assignmentItem}>

          <strong>
            🏢 Assigned Department
          </strong>

          <span>
            {assignedDepartment}
          </span>

        </div>

        <div className={styles.assignmentItem}>

          <strong>
            ⏱ Estimated Response
          </strong>

          <span>
            {estimatedResponse}
          </span>

        </div>

      </div>

    )}

  </div>
);
};

export default IssueInformation;