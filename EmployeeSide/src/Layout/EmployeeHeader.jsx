import styles from "./EmployeeHeader.module.css";
import {
  Bell,
  UserCircle,
  Menu,
  PanelLeftClose,
} from "lucide-react";

function EmployeeHeader({
  isSidebarOpen,
  toggleSidebar,
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <PanelLeftClose size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <div>
          <h1 className={styles.title}>
            Municipal Employee Portal
          </h1>

          <p className={styles.subtitle}>{today}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          <Bell size={20} />
        </button>

        <div className={styles.profile}>
          <UserCircle size={38} />

          <div>
            <span className={styles.name}>
              Employee
            </span>

            <small>Voice of Karachi</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EmployeeHeader;