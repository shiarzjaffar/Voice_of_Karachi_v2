import React from "react";
import styles from "./Departments.module.css";

import EngineeringIcon from "@mui/icons-material/Engineering";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import TrafficIcon from "@mui/icons-material/Traffic";
import ParkIcon from "@mui/icons-material/Park";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const departments = [
  {
    icon: <EngineeringIcon fontSize="large" />,
    title: "Road Maintenance",
    desc: "Report potholes, damaged roads and broken footpaths."
  },
  {
    icon: <WaterDropIcon fontSize="large" />,
    title: "Water Supply",
    desc: "Water leakage, shortage and pipeline complaints."
  },
  {
    icon: <DeleteSweepIcon fontSize="large" />,
    title: "Waste Management",
    desc: "Garbage collection and cleanliness issues."
  },
  {
    icon: <TrafficIcon fontSize="large" />,
    title: "Traffic Signals",
    desc: "Broken traffic lights and road signal issues."
  },
  {
    icon: <ParkIcon fontSize="large" />,
    title: "Parks & Green Areas",
    desc: "Maintenance of parks and public gardens."
  },
  {
    icon: <LightbulbIcon fontSize="large" />,
    title: "Street Lighting",
    desc: "Broken or non-functional street lights."
  }
];

export const Departments = () => {
  return (
    <section id="departments" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>

          <span className={styles.badge}>
            GOVERNMENT DEPARTMENTS
          </span>

          <h2>
            Government Departments
          </h2>

          <p>
            Every complaint is automatically assigned to the responsible government department, ensuring transparent tracking and timely resolution.
          </p>

        </div>

        <div className={styles.grid}>

          {departments.map((item, index) => (

            <div className={styles.card} key={index}>

              <div className={styles.icon}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Departments;