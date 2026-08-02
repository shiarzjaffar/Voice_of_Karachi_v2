import React from "react";
import {
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";
import styles from "./ComplaintHotspots.module.css";

const ComplaintHotspots = ({
  hotspots = [],
  selectedArea,
  onAreaHover,
  onAreaLeave,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Complaint Hotspots</h2>
          <p>
            Areas generating the highest number of civic complaints.
          </p>
        </div>
      </div>

      <div className={styles.list}>
        {hotspots.map((hotspot, index) => {
          const isActive = selectedArea?.area === hotspot.area;

          return (
            <div
              key={`${hotspot.area}-${index}`}
              className={`${styles.card} ${
                isActive ? styles.active : ""
              }`}
              onMouseEnter={() => onAreaHover(hotspot)}
              onMouseLeave={onAreaLeave}
            >
              <div className={styles.rank}>
                #{index + 1}
              </div>

              <div className={styles.content}>
                <div className={styles.topRow}>
                  <div className={styles.area}>
                    <FiMapPin />
                    <span>{hotspot.area}</span>
                  </div>

                  <FiChevronRight className={styles.arrow} />
                </div>

                <div className={styles.stats}>
                  <div>
                    <strong>{hotspot.reports}</strong>
                    <span>Complaints</span>
                  </div>

                  <div>
                    <strong>{hotspot.resolved}%</strong>
                    <span>Resolved</span>
                  </div>
                </div>

                <div className={styles.progress}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${hotspot.resolved}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComplaintHotspots;