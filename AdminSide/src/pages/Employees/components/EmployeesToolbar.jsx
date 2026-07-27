import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import styles from "./EmployeesToolbar.module.css";

export default function EmployeesToolbar({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
}) {
  return (
    <DataCard
      title="Filters"
      subtitle="Search employees"
    >
      <div className={styles.wrapper}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search by Employee ID, Name, Department, Email or Phone..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
    </DataCard>
  );
}