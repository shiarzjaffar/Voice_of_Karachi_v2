import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Home,
  Users,
  UserCog,
  LogOut,
} from "lucide-react";

import styles from "./Sidebar.module.css";
import logo from "/logo.png";

export function Sidebar({
  isMobile,
  isMobileOpen,
  isCollapsed,
  closeMobileSidebar,
}) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: err.message,
      });
    }
  };

  const handleNavigate = () => {
    if (isMobile) closeMobileSidebar();
  };

  const sidebarClass = [
    styles.sidebar,
    isCollapsed && !isMobile ? styles.collapsed : "",
    isMobile
      ? isMobileOpen
        ? styles.mobileOpen
        : styles.mobileClosed
      : "",
  ].join(" ");

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobileSidebar}
        />
      )}

      <aside className={sidebarClass}>
        {/* Brand */}
        <div className={styles.brand}>
          <img src={logo} alt="Voice of Karachi" />

          {!isCollapsed && (
            <div className={styles.brandText}>
              <h2>Voice of Karachi</h2>
              <p>Government Portal</p>
            </div>
          )}
        </div>

        <nav className={styles.nav}>
          {!isCollapsed && (
            <div className={styles.sectionTitle}>
              MAIN
            </div>
          )}

          <NavLink
            to="/dashboard"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <Home size={20} />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>

          {!isCollapsed && (
            <div className={styles.sectionTitle}>
              MANAGEMENT
            </div>
          )}

          <NavLink
            to="/users"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <Users size={20} />
            {!isCollapsed && <span>Users</span>}
          </NavLink>

          <NavLink
            to="/employees"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <UserCog size={20} />
            {!isCollapsed && <span>Employees</span>}
          </NavLink>

          <div className={styles.bottom}>
            {!isCollapsed && (
              <div className={styles.sectionTitle}>
                ACCOUNT
              </div>
            )}

            <button
              onClick={logout}
              className={styles.logout}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}