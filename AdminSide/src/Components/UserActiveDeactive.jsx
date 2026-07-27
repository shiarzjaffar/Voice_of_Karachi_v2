import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import PageHeader from "./admin/ui/PageHeader/PageHeader";
import DataCard from "./admin/ui/DataCard/DataCard";
import StatusBadge from "./admin/common/StatusBadge";
import IconActionButton from "./admin/common/IconActionButton";

import {
  Users,
  UserCheck,
  UserX,
  RefreshCw,
} from "lucide-react";

import styles from "./UserActiveDeactive.module.css";

export const UserActiveDeactive = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/admin/users"
      );

      setUsers(response.data);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load users.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleStatus = async (user) => {
    const activate = user.userstatus !== 1;

    const result = await Swal.fire({
      title: activate
        ? "Activate User?"
        : "Deactivate User?",
      text: activate
        ? "This account will become active."
        : "This account will be disabled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#114232",
      cancelButtonColor: "#6B7280",
      confirmButtonText: activate
        ? "Activate"
        : "Deactivate",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.put(
        `http://localhost:5000/api/admin/user-status/${user._id}`
      );

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: activate
          ? "User activated successfully."
          : "User deactivated successfully.",
        timer: 1400,
        showConfirmButton: false,
      });

      loadUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Unable to update user status.",
      });
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return users.filter((user) => {
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

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (u) => u.userstatus === 1
  ).length;

  const inactiveUsers = totalUsers - activeUsers;

    return (
    <div className={styles.container}>
      <PageHeader
        title="Manage Users"
        subtitle="Activate or deactivate registered citizen accounts"
      />

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.iconBlue}>
            <Users size={24} />
          </div>

          <div>
            <span>Total Users</span>
            <h2>{totalUsers}</h2>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconGreen}>
            <UserCheck size={24} />
          </div>

          <div>
            <span>Active Users</span>
            <h2>{activeUsers}</h2>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconRed}>
            <UserX size={24} />
          </div>

          <div>
            <span>Inactive Users</span>
            <h2>{inactiveUsers}</h2>
          </div>
        </div>
      </div>

      <DataCard
        title="Filters"
        subtitle="Search users"
      >
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by ID, Name, Email or Phone..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </DataCard>

      <DataCard
        title="User Management"
        subtitle={`Total Users: ${users.length}`}
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th width="170">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>

                    <td>{user.fullname}</td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>
                      <StatusBadge
                        status={user.userstatus}
                      />
                    </td>

                    <td className={styles.actions}>
                      <IconActionButton
                        icon={<RefreshCw size={16} />}
                        title={
                          user.userstatus === 1
                            ? "Deactivate User"
                            : "Activate User"
                        }
                        variant="warning"
                        onClick={() =>
                          handleToggleStatus(user)
                        }
                        disabled={loading}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className={styles.emptyState}
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
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </div>

          <button
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
      </DataCard>
    </div>
  );
};