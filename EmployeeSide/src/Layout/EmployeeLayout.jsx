import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "./EmployeeSidebar";
import EmployeeHeader from "./EmployeeHeader";

import styles from "./EmployeeLayout.module.css";

const DESKTOP_BREAKPOINT = 992;

function EmployeeLayout() {
  const getInitialCollapsed = () => {
    const saved = localStorage.getItem("employee-sidebar-collapsed");

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return false;
  };

  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsed);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= DESKTOP_BREAKPOINT
  );

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "employee-sidebar-collapsed",
      JSON.stringify(isCollapsed)
    );
  }, [isCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= DESKTOP_BREAKPOINT;

      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className={styles.layout}>
      <EmployeeSidebar
        isMobile={isMobile}
        isMobileOpen={isMobileOpen}
        isCollapsed={isCollapsed}
        closeMobileSidebar={closeMobileSidebar}
      />

      <div
        className={`${styles.main} ${
          isCollapsed
            ? styles.mainCollapsed
            : styles.mainExpanded
        }`}
      >
        <EmployeeHeader
          isSidebarOpen={
            isMobile ? isMobileOpen : !isCollapsed
          }
          toggleSidebar={toggleSidebar}
        />

        <main className={styles.content}>
          <Outlet />
        </main>


      </div>
    </div>
  );
}

export default EmployeeLayout;