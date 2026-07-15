import React, { useEffect, useState } from "react";
import AdminDashboardcss from "./AdminDashboard.module.css";
import { FaUsers, FaFileInvoice, FaEnvelopeOpenText } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    reports: 0,
    contacts: 0,
    NGOs: 0,
  });

  // Demo data for chart
  const demoData = [
    { name: "Users", count: stats.users },
    { name: "Reports", count: stats.reports },
    { name: "Messages", count: stats.contacts },
    { name: "NGOs", count: stats.NGOs },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats/totals");
        const data = await res.json();
        setStats({
          users: data.users || 0,
          reports: data.reports || 0,
          contacts: data.contacts || 0,
          NGOs: data.NGOs || 0,
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={AdminDashboardcss.dashboardContainer}>
      
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={AdminDashboardcss.title}
      >
        Admin Dashboard
      </motion.h1>

      <div className={AdminDashboardcss.grid}>
        <Link to="/user-fetch" className={AdminDashboardcss.link}>
          <motion.div className={AdminDashboardcss.card} whileHover={{ scale: 1.05 }}>
            <FaUsers size={35} />
            <h2>{stats.users}</h2>
            <p>Total Users</p>
          </motion.div>
        </Link>

        <Link to="/report-fetch" className={AdminDashboardcss.link}>
          <motion.div className={AdminDashboardcss.card} whileHover={{ scale: 1.05 }}>
            <FaFileInvoice size={35} />
            <h2>{stats.reports}</h2>
            <p>Total Reports</p>
          </motion.div>
        </Link>

        <Link to="/view-message" className={AdminDashboardcss.link}>
          <motion.div className={AdminDashboardcss.card} whileHover={{ scale: 1.05 }}>
            <FaEnvelopeOpenText size={35} />
            <h2>{stats.contacts}</h2>
            <p>Total Messages</p>
          </motion.div>
        </Link>

        <Link to="/ngo-fetch" className={AdminDashboardcss.link}>
          <motion.div className={AdminDashboardcss.card} whileHover={{ scale: 1.05 }}>
            <FaEnvelopeOpenText size={35} />
            <h2>{stats.NGOs}</h2>
            <p>Total NGOs</p>
          </motion.div>
        </Link>
      </div>

      {/* Demo Chart */}
      <div className={AdminDashboardcss.chartContainer}>
        <h3>Summary Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={demoData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#5BA0BC" />

            {/* XAxis & YAxis with white labels */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#fff", fontSize: 14 }}
            />
            <YAxis
              tick={{ fill: "#fff", fontSize: 14 }}
            />

            <Tooltip
              contentStyle={{ backgroundColor: "transparent", border: "2px solid rgba(255, 255, 255, 0.9)", borderRadius: "12px" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "transparent"}}
            />
            <Legend wrapperStyle={{ display: "none"}} />

            <Bar
              dataKey="count"
              fill="#5BA0BC"
              radius={[8, 8, 0, 0]}
              style={{ outline: "none", stroke: "none" }}
              activeShape={(props) => (
                <rect
                  x={props.x}
                  y={props.y}
                  width={props.width}
                  height={props.height}
                  fill="#5BA0BC"
                  rx={8}
                />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};