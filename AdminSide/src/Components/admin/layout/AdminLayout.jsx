import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";

import styles from "./AdminLayout.module.css";

const DESKTOP_BREAKPOINT = 992;

export function AdminLayout() {
  const getInitialCollapsed = () => {
    const saved = localStorage.getItem("vok-sidebar-collapsed");

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return false;
  };

  const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsed);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    localStorage.setItem(
      "vok-sidebar-collapsed",
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

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
      return;
    }

    setIsCollapsed((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className={styles.layout}>
      <Sidebar
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
        <AdminHeader
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          toggleSidebar={toggleSidebar}
        />

        <main className={styles.content}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}