import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import PageHeader from "../../Components/admin/ui/PageHeader/PageHeader";

import DashboardStats from "./components/DashboardStats";
import ComplaintTrend from "./components/ComplaintTrend";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";

export default function Dashboard() {

  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    contacts: 0,
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/admin/stats/totals"
        );

        const data = await res.json();

        setStats({
          users: data.users || 0,
          reports: data.reports || 0,
          contacts: data.contacts || 0,
        });

      } catch (err) {

        console.error(err);

      }

    };

    fetchStats();

  }, []);

  return (

    <div className={styles.dashboard}>

      <PageHeader
        title="Dashboard"
        subtitle="Voice of Karachi Administration Portal"
      />

      <DashboardStats stats={stats} />

      <div className={styles.contentGrid}>

        <ComplaintTrend stats={stats} />

        <QuickActions />

      </div>

      <RecentActivity />

    </div>

  );

}