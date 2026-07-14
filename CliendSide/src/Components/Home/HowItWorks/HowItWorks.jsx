import React from "react";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "01",
    title: "Report Issue",
    description:
      "Citizens submit complaints with images, location and complete details."
  },
  {
    number: "02",
    title: "Department Review",
    description:
      "The complaint is automatically assigned to the responsible department."
  },
  {
    number: "03",
    title: "Work in Progress",
    description:
      "Officials investigate the issue and update the complaint status."
  },
  {
    number: "04",
    title: "Issue Resolved",
    description:
      "The citizen receives a notification and can verify the completed work."
  }
];

export const HowItWorks = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <span className={styles.badge}>HOW IT WORKS</span>

          <h2>Simple. Transparent. Efficient.</h2>

          <p>
            Every complaint follows a structured workflow to ensure faster
            resolution and complete transparency.
          </p>
        </div>

        <div className={styles.timeline}>
          {steps.map((step) => (
            <div className={styles.card} key={step.number}>

              <div className={styles.circle}>
                {step.number}
              </div>

              <h3>{step.title}</h3>

              <p>{step.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;