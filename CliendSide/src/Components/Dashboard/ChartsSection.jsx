import React from "react";
import styles from "./Dashboard.module.css";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const ChartsSection = ({ stats }) => {

  const statusData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ];

  const monthlyData = [
    { month: "Jan", complaints: 4 },
    { month: "Feb", complaints: 7 },
    { month: "Mar", complaints: 5 },
    { month: "Apr", complaints: 9 },
    { month: "May", complaints: 11 },
    { month: "Jun", complaints: 8 },
    { month: "Jul", complaints: stats.total },
  ];

  const COLORS = [
    "#F59E0B",
    "#2563EB",
    "#16A34A",
  ];

  return (
    <section className={styles.chartSection}>

      <div className={styles.chartCard}>

        <div className={styles.chartHeader}>
          <h2>Complaint Status</h2>
          <p>Current distribution of your complaints</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              innerRadius={55}
            >
              {statusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className={styles.chartCard}>

        <div className={styles.chartHeader}>
          <h2>Monthly Complaints</h2>
          <p>Complaints submitted over time</p>
        </div>

        <ResponsiveContainer width="100%" height={320}>

          <LineChart data={monthlyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="complaints"
              stroke="#006A4E"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
};

export default ChartsSection;