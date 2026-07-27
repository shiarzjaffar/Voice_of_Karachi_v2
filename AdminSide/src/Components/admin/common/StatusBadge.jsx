import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }) {
  // User status
  if (
    status === 1 ||
    status === "1" ||
    status === true ||
    status === false ||
    status === 0 ||
    status === "0"
  ) {
    const isActive =
      status === 1 ||
      status === "1" ||
      status === true;

    return (
      <span
        className={`${styles.badge} ${
          isActive ? styles.active : styles.inactive
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  }

  // Report status
  let badgeClass = styles.pending;

  if (status === "In Progress") {
    badgeClass = styles.progress;
  } else if (status === "Closed") {
    badgeClass = styles.closed;
  }

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {status}
    </span>
  );
}