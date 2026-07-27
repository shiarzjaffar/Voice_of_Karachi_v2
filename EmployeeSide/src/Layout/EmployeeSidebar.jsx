import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Home,
  ClipboardList,
  Briefcase,
  CheckCircle,
  User,
  LogOut,
} from "lucide-react";

import styles from "./EmployeeSidebar.module.css";
import logo from "/logo.png";

function EmployeeSidebar({
  isMobile,
  isMobileOpen,
  isCollapsed,
  closeMobileSidebar,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    // Employee logout API will be added later

    navigate("/");
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
              <p>Employee Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}

        <nav className={styles.nav}>
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

          <NavLink
            to="/pending"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <ClipboardList size={20} />
            {!isCollapsed && (
              <span>Pending Complaints</span>
            )}
          </NavLink>

          <NavLink
            to="/assigned"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <Briefcase size={20} />
            {!isCollapsed && (
              <span>My Assigned</span>
            )}
          </NavLink>

          <NavLink
            to="/completed"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <CheckCircle size={20} />
            {!isCollapsed && (
              <span>Completed</span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            <User size={20} />
            {!isCollapsed && <span>Profile</span>}
          </NavLink>

          <button
            className={styles.logout}
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </nav>
      </aside>
    </>
  );
}

export default EmployeeSidebar;