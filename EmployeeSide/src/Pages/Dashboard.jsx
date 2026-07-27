import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import styles from "./Dashboard.module.css";

function Dashboard() {

  const employee = JSON.parse(
    localStorage.getItem("employee")
  );
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    pending: 0,
    assigned: 0,
    completedToday: 0,
    totalCompleted: 0,
    recent: [],
  });

  const [currentTime, setCurrentTime] =
    useState(new Date());

useEffect(() => {
  fetchDashboard();

  const timer = setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  const refreshDashboard = setInterval(() => {
    fetchDashboard();
  }, 60000);

  return () => {
    clearInterval(timer);
    clearInterval(refreshDashboard);
  };
}, []);

const fetchDashboard = async () => {
  try {

    setLoading(true);

    const res = await api.get(
      "/report/employee/dashboard"
    );

    setStats(res.data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }
};

  const hour = currentTime.getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17)
    greeting = "Good Afternoon";

  const formattedDate =
    currentTime.toLocaleDateString(
      "en-PK",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  const formattedTime =
    currentTime.toLocaleTimeString(
      "en-PK",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  return (
    <div className={styles.dashboard}>

    <section className={styles.welcomeSection}>

  <div className={styles.welcomeLeft}>

    <span className={styles.greeting}>
      {greeting} 👋
    </span>

    <h1>
      Welcome Back,
      {" "}
      {employee?.fullname}
    </h1>

    <p>
      Ready to manage today's complaints
      efficiently.
    </p>

    <div className={styles.employeeInfo}>

      <span>
        Employee ID:
        {" "}
        <strong>
          {employee?.employeeId}
        </strong>
      </span>

      <span>
        Department:
        {" "}
        <strong>
          {employee?.department}
        </strong>
      </span>

    </div>

  </div>

<div className={styles.dateCard}>

  <h3>{formattedDate}</h3>

  <p>{formattedTime}</p>

  <span>Employee Dashboard</span>

  <button
    className={styles.refreshButton}
    onClick={fetchDashboard}
  >
    🔄 Refresh Dashboard
  </button>

</div>

</section>

{loading && (

  <div className={styles.loadingBar}>

    Loading latest dashboard data...

  </div>

)}

<section className={styles.statsGrid}>

  <div className={styles.statCard}>

    <div className={styles.statIcon}>
      📥
    </div>

    <div className={styles.statContent}>

      <span className={styles.statTitle}>
        Pending Complaints
      </span>

      <h2 className={styles.statValue}>
        {stats.pending}
      </h2>

      <small className={styles.statDescription}>
        Waiting for assignment
      </small>

    </div>

  </div>

  <div className={styles.statCard}>

    <div className={styles.statIcon}>
      👨‍💼
    </div>

    <div className={styles.statContent}>

      <span className={styles.statTitle}>
        Assigned To Me
      </span>

      <h2 className={styles.statValue}>
        {stats.assigned}
      </h2>

      <small className={styles.statDescription}>
        Active work queue
      </small>

    </div>

  </div>

  <div className={styles.statCard}>

    <div className={styles.statIcon}>
      ✅
    </div>

    <div className={styles.statContent}>

      <span className={styles.statTitle}>
        Completed Today
      </span>

      <h2 className={styles.statValue}>
        {stats.completedToday}
      </h2>

      <small className={styles.statDescription}>
        Resolved today
      </small>

    </div>

  </div>

  <div className={styles.statCard}>

    <div className={styles.statIcon}>
      📊
    </div>

    <div className={styles.statContent}>

      <span className={styles.statTitle}>
        Total Completed
      </span>

      <h2 className={styles.statValue}>
        {stats.totalCompleted}
      </h2>

      <small className={styles.statDescription}>
        Overall completed complaints
      </small>

    </div>

  </div>

</section>

      <section className={styles.bottomGrid}>

<div className={styles.card}>

  <div className={styles.cardHeader}>

    <h3>Recent Assigned Complaints</h3>

    <span className={styles.cardCount}>
      {stats.recent.length} Records
    </span>

  </div>

  {stats.recent.length === 0 ? (

    <div className={styles.emptyState}>

      <div className={styles.emptyIcon}>
        📭
      </div>

      <h4>No Complaints Found</h4>

      <p>
        You don't have any assigned
        complaints at the moment.
      </p>

    </div>

  ) : (

    <table className={styles.table}>

      <thead>

        <tr>
          <th>Complaint ID</th>
          <th>Category</th>
          <th>Status</th>
          <th>Date</th>
        </tr>

      </thead>

      <tbody>

        {stats.recent.map((item) => (

          <tr key={item._id}>

            <td>

              <span className={styles.idBadge}>
                #{item._id.slice(-6).toUpperCase()}
              </span>

            </td>

            <td>{item.category}</td>

            <td>

              <span
                className={`${styles.statusBadge} ${
                  item.status === "Completed"
                    ? styles.completed
                    : item.status === "Assigned"
                    ? styles.assigned
                    : styles.pending
                }`}
              >
                {item.status}
              </span>

            </td>

            <td>

              {new Date(
                item.createdAt
              ).toLocaleDateString(
                "en-PK",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  )}

</div>

<div className={styles.rightColumn}>

  <div className={styles.card}>

    <div className={styles.cardHeader}>
      <h3>Quick Actions</h3>
    </div>

    <div className={styles.quickActions}>

      <button
        onClick={() => navigate("/pending")}
      >
        📥 Pending Complaints
      </button>

      <button
        onClick={() => navigate("/assigned")}
      >
        👨‍💼 Assigned Complaints
      </button>

      <button
        onClick={() => navigate("/completed")}
      >
        ✅ Completed Complaints
      </button>

      <button
        onClick={() => navigate("/profile")}
      >
        👤 My Profile
      </button>

    </div>

  </div>

  <div className={styles.card}>

    <div className={styles.cardHeader}>
      <h3>Department Information</h3>
    </div>

    <div className={styles.departmentInfo}>

      <div className={styles.infoRow}>
        <span>Employee</span>
        <strong>{employee?.fullname}</strong>
      </div>

      <div className={styles.infoRow}>
        <span>Employee ID</span>
        <strong>{employee?.employeeId}</strong>
      </div>

      <div className={styles.infoRow}>
        <span>Department</span>
        <strong>{employee?.department}</strong>
      </div>

      <div className={styles.infoRow}>
        <span>Role</span>
        <strong>{employee?.role}</strong>
      </div>

      <div className={styles.infoRow}>
        <span>Approval</span>

        <span
          className={
            employee?.approved
              ? styles.successBadge
              : styles.warningBadge
          }
        >
          {employee?.approved
            ? "Approved"
            : "Pending"}
        </span>

      </div>

      <div className={styles.infoRow}>
        <span>Account</span>

        <span
          className={
            employee?.userstatus === 1
              ? styles.successBadge
              : styles.dangerBadge
          }
        >
          {employee?.userstatus === 1
            ? "Active"
            : "Inactive"}
        </span>

      </div>

    </div>

  </div>

</div>

      </section>

    </div>
  );
}

export default Dashboard;