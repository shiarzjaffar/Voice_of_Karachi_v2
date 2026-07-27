import styles from "./ReportsToolbar.module.css";

export default function ReportsToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onRefresh,
}) {
  return (
    <div className={styles.toolbar}>
      <input
        type="text"
        placeholder="Search reports..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
      />

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(e.target.value)
        }
      >
        <option value="All">
          All Status
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Closed">
          Closed
        </option>
      </select>

      <button onClick={onRefresh}>
        Refresh
      </button>
    </div>
  );
}