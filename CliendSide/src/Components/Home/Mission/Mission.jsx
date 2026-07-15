import React from "react";
import styles from "./Mission.module.css";

export const Mission = () => {
  const values = [
    {
      title: "🔍 Transparency",
      text: "Track every complaint from submission to resolution."
    },
    {
      title: "🛡 Accountability",
      text: "Departments remain responsible for every assigned issue."
    },
    {
      title: "👥 Citizen First",
      text: "A simple platform designed around the needs of Karachi's citizens."
    },
    {
      title: "🏛 Digital Governance",
      text: "Modern technology that improves communication and public services."
    }
  ];

  return (
    <section id="about" className={styles.mission}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <span className={styles.badge}>
            OUR PURPOSE
          </span>

          <h2>
            Building a Better Karachi
            <br />
            Through Digital Governance
          </h2>

          <p>
            Voice of Karachi is a digital civic engagement platform that enables
            citizens to report public issues directly to the relevant government
            departments. Our goal is to improve transparency, accountability and
            service delivery across the city.
          </p>
        </div>

        <div className={styles.grid}>
          {values.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.number}>
                0{index + 1}
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mission;