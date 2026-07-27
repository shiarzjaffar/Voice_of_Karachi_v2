import styles from "./AdminHeader.module.css";
import {
  Bell,
  UserCircle,
  Menu,
  PanelLeftClose,
} from "lucide-react";

export function AdminHeader({
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
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <PanelLeftClose size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <div>
          <h1 className={styles.title}>
            Administrator Dashboard
          </h1>

          <p className={styles.subtitle}>
            {today}
          </p>
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
              Administrator
            </span>

            <small>
              Voice of Karachi
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}