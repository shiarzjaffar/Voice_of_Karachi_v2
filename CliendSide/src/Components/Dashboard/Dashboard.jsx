import React, { useState } from "react";
import styles from "./Dashboard.module.css";

import WelcomeSection from "./WelcomeSection";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";
import QuickActions from "./QuickActions";
import RecentComplaints from "./RecentComplaints";
import CityUpdates from "./CityUpdates";

const Dashboard = () => {
  // Placeholder data (will come from API later)
  const [stats] = useState({
    total: 12,
    pending: 4,
    inProgress: 3,
    resolved: 5,
  });

  const [recentComplaints] = useState([
    {
      id: "VOK-1001",
      department: "Solid Waste",
      location: "Clifton",
      status: "Pending",
      date: "09 Jul 2026",
    },
    {
      id: "VOK-1002",
      department: "Road Maintenance",
      location: "DHA",
      status: "Resolved",
      date: "07 Jul 2026",
    },
    {
      id: "VOK-1003",
      department: "Street Lights",
      location: "Gulshan",
      status: "In Progress",
      date: "05 Jul 2026",
    },
  ]);

  return (
    <main className={styles.dashboard}>

      <WelcomeSection />

      <StatsCards stats={stats} />

      <ChartsSection stats={stats} />

      <QuickActions />

      <RecentComplaints complaints={recentComplaints} />

      <CityUpdates />

    </main>
  );
};

export default Dashboard;