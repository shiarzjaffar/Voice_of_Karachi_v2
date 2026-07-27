import { useEffect, useState } from "react";
import styles from "./Users.module.css";

import PageHeader from "../../Components/admin/ui/PageHeader/PageHeader";

import UsersStats from "./components/UsersStats";
import UsersToolbar from "./components/UsersToolbar";
import UsersTable from "./components/UsersTable";
import UserDetailsModal from "./components/UserDetailsModal";
import DeleteUserDialog from "./components/DeleteUserDialog";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/admin/common/LoadingSpinner";

import {
  getUsers,
  deleteUser,
  toggleUserStatus,
} from "./services/usersService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

const loadUsers = async () => {
  console.log("Loading started");

  try {
    setLoading(true);

    const data = await getUsers();

    console.log("Users received:", data);

    setUsers(data);
  } catch (error) {
    console.error("LOAD USERS ERROR", error);
    toast.error("Failed to load users");
  } finally {
    console.log("Loading finished");
    setLoading(false);
  }
};

useEffect(() => {
  loadUsers();
}, []);

  const handleView = (user) => {
    setSelectedUser(user);
  };

const handleToggleStatus = async (user) => {
  try {
    setActionLoading(true);

    await toggleUserStatus(user._id);

    toast.success(
      user.userstatus === 1
        ? "User deactivated"
        : "User activated"
    );

    await loadUsers();
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  } finally {
    setActionLoading(false);
  }
};

const handleDelete = (user) => {
  setUserToDelete(user);
};

const confirmDelete = async () => {
  if (!userToDelete) return;

  try {
    setActionLoading(true);

    await deleteUser(userToDelete._id);

    toast.success("User deleted successfully");

    setUserToDelete(null);

    await loadUsers();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete user");
  } finally {
    setActionLoading(false);
  }
};

if (loading) {
  return (
    <LoadingSpinner
      text="Loading users..."
      fullScreen
    />
  );
}

  return (
    <div className={styles.users}>
      <PageHeader
        title="Users"
        subtitle="Manage registered citizens"
      />

      <UsersStats users={users} />

      <UsersToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      <UsersTable
        users={users}
        searchQuery={searchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onView={handleView}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        actionLoading={actionLoading}
      />

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

    <DeleteUserDialog
  user={userToDelete}
  onCancel={() => setUserToDelete(null)}
  onConfirm={confirmDelete}
/>

    </div>
  );
}