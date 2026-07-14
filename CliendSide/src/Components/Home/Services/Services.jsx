import React from "react";
import styles from "./Services.module.css";

import CampaignIcon from "@mui/icons-material/Campaign";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HistoryIcon from "@mui/icons-material/History";

const services = [
  {
    icon: <CampaignIcon fontSize="large" />,
    title: "Report Issues",
    description:
      "Submit complaints with photos, location and detailed information."
  },
  {
    icon: <TrackChangesIcon fontSize="large" />,
    title: "Track Complaints",
    description:
      "Monitor complaint progress from submission to resolution."
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" />,
    title: "Real-Time Notifications",
    description:
      "Receive updates whenever your complaint status changes."
  },
  {
    icon: <HistoryIcon fontSize="large" />,
    title: "Complaint History",
    description:
      "View all your previous complaints and their current status."
  }
];

export const Services = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <span className={styles.badge}>
            CITIZEN SERVICES
          </span>

          <h2>Everything You Need In One Platform</h2>

          <p>
            Voice of Karachi provides citizens with modern digital tools
            to report, monitor and manage civic complaints.
          </p>
        </div>

        <div className={styles.grid}>

          {services.map((service, index) => (

            <div className={styles.card} key={index}>

              <div className={styles.icon}>
                {service.icon}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Services;