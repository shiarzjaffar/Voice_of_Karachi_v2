import { useMemo } from "react";

import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import UserRow from "./UserRow";
import styles from "./UsersTable.module.css";




export default function UsersTable({
  users,
  searchQuery,
  currentPage,
  setCurrentPage,
  onView,
  onDelete,
  onToggleStatus,
  actionLoading,
}) {

  const usersPerPage = 10;



  const filteredUsers = useMemo(() => {
  return users.filter((user) => {
    const query = searchQuery.toLowerCase();

    return (
      user._id.toLowerCase().includes(query) ||
      user.fullname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phone.includes(searchQuery)
    );
  });
}, [users, searchQuery]);


const totalPages = Math.max(
  1,
  Math.ceil(filteredUsers.length / usersPerPage)
);

const currentUsers = filteredUsers.slice(
  (currentPage - 1) * usersPerPage,
  currentPage * usersPerPage
);

return (
  <DataCard
    title="Users"
    subtitle={`Total Users: ${users.length}`}
  >
    <>

<div className={styles.tableWrapper}>
      <table className={styles.table}>
<thead className={styles.head}>
  <tr>
    <th>ID</th>
    <th>User</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Role</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>

<tbody className={styles.body}>
  {currentUsers.length > 0 ? (
    currentUsers.map((user) => (
<UserRow
  key={user._id}
  user={user}
  onView={onView}
  onDelete={onDelete}
  onToggleStatus={onToggleStatus}
  actionLoading={actionLoading}
  disabled={actionLoading}
/>
    ))
  ) : (
    <tr>
<td
    colSpan={7}
    className={styles.empty}
>
    No users found.
</td>
    </tr>
  )}
</tbody>
</table>
</div>

<div className={styles.pagination}>

  <button
    className={styles.pageButton}
    onClick={() =>
      setCurrentPage((prev) => Math.max(prev - 1, 1))
    }
    disabled={currentPage === 1}
  >
    ← Previous
  </button>

  <div className={styles.pageInfo}>
    Page {currentPage} of {totalPages}
  </div>

  <button
    className={styles.pageButton}
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={currentPage === totalPages}
  >
    Next →
  </button>

</div>

    </>
  </DataCard>
);
}