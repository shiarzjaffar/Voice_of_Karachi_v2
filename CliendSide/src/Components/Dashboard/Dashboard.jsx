import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import styles from "./Dashboard.module.css";

import WelcomeSection from "./WelcomeSection";
import StatsCards from "./StatsCards";
import ChartsSection from "./ChartsSection";
import QuickActions from "./QuickActions";
import RecentComplaints from "./RecentComplaints";

const Dashboard = () => {
 
const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  closed: 0,
});

const [loading, setLoading] = useState(true);

const [recentComplaints, setRecentComplaints] = useState([]);

const [monthlyData, setMonthlyData] = useState([]);

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {

    const res = await api.get("/report/user/dashboard");

    setStats({
      total: res.data.total,
      pending: res.data.pending,
      inProgress: res.data.inProgress,
      resolved: res.data.closed,
    });

    setRecentComplaints(res.data.recent);
    setMonthlyData(res.data.monthly);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

if (loading) {
  return (
    <main className={styles.dashboard}>
      <h2>Loading Dashboard...</h2>
    </main>
  );
}

  return (
    <main className={styles.dashboard}>

      <WelcomeSection />

      <StatsCards stats={stats} />

      <ChartsSection
  stats={stats}
  monthlyData={monthlyData}
/>

      <QuickActions />

      <RecentComplaints complaints={recentComplaints} />

    </main>
  );
};

export default Dashboard;