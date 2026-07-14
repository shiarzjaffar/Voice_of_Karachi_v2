import React from "react";
import styles from "./FeaturesShowcase.module.css";

import { FaRegCircle, FaBezierCurve, FaInfinity } from "react-icons/fa";

import security1 from "/security1.jpg";
import security2 from "/security2.jpg";
import security3 from "/security3.jpg";

export const FeaturesShowcase = () => {
  return (
    <section className={styles.showcaseSection}>
      
      {/* ONE BIG CARD */}
      <div className={styles.featureCard}>

        {/* ROW 1 */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.imageBox}>
            <img src={security1} alt="Report" className={styles.featureImage} />
          </div>

          <div className={styles.textBox}>
            <FaRegCircle className={styles.icon} />
            <h2>Report</h2>
            <p>
              Get instant reporting insights powered by modern surveillance and smart monitoring tools.
            </p>
          </div>
        </div>

        {/* ROW 2 (IMAGE → TEXT FIXED) */}
        <div className={styles.row}>
          <div className={styles.imageBox}>
            <img src={security2} alt="Track" className={styles.featureImage} />
          </div>

          <div className={styles.textBox}>
            <FaBezierCurve className={styles.icon} />
            <h2>Track</h2>
            <p>
              Track real-time activities with layered intelligent analysis and monitoring systems.
            </p>
          </div>
        </div>

        {/* ROW 3 */}
        <div className={`${styles.row} ${styles.rowReverse}`}>
          <div className={styles.imageBox}>
            <img src={security3} alt="Resolve" className={styles.featureImage} />
          </div>

          <div className={styles.textBox}>
            <FaInfinity className={styles.icon} />
            <h2>Resolve</h2>
            <p>
              Resolve issues faster with enhanced visual clarity and intelligent decision-making tools.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};