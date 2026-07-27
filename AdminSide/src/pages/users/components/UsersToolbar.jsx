import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import styles from "./UsersToolbar.module.css";

export default function UsersToolbar({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
}) {
return (
  <DataCard
    title="Filters"
    subtitle="Search users"
  >
    <div className={styles.wrapper}>

      <input
        className={styles.search}
        type="text"
        placeholder="Search by ID, name, email or phone..."
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