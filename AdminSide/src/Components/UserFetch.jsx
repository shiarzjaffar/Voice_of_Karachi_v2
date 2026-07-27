import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import styles from "./UserFetch.module.css";

export const UserFetch = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users"
        );

        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

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
    <div className={styles.page}>

      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <span className={styles.badge}>
            Voice of Karachi
          </span>

          <h1>Registered Users</h1>

          <p>
            View and search all registered citizens.
          </p>
        </div>

        <div className={styles.totalCard}>
          <Users size={34} />

          <div>
            <h2>{users.length}</h2>
            <span>Total Users</span>
          </div>
        </div>
      </motion.div>

      <div className={styles.toolbar}>

        <div className={styles.searchBox}>
          <Search size={18} />

          <input
            type="text"
            placeholder="Search by ID, Name, Email or Phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

      </div>

      <div className={styles.tableCard}>

        <table className={styles.table}>

          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id}>

                  <td className={styles.id}>
                    {user._id}
                  </td>

                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        {user.fullname.charAt(0).toUpperCase()}
                      </div>

                      <span>{user.fullname}</span>
                    </div>
                  </td>

                  <td>
                    <div className={styles.inline}>
                      <Mail size={16} />
                      {user.email}
                    </div>
                  </td>

                  <td>
                    <div className={styles.inline}>
                      <Phone size={16} />
                      {user.phone}
                    </div>
                  </td>

                  <td>
                    {user.userstatus === 1 ? (
                      <span className={styles.active}>
                        <ShieldCheck size={16} />
                        Active
                      </span>
                    ) : (
                      <span className={styles.inactive}>
                        Inactive
                      </span>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
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
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1)
            )
          }
          disabled={currentPage === 1}
        >
          <ArrowLeft size={18} />
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
};