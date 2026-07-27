import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const MobileDrawer = ({
  mobileOpen,
  setMobileOpen,
  loggedIn,
  navLinks,
  handleLogout,
}) => {
  const closeDrawer = () => setMobileOpen(false);

  return (
    <>
      {mobileOpen && (
        <div
          className={`${styles.overlay} ${styles.overlayShow}`}
          onClick={closeDrawer}
        />
      )}

      <aside
        className={`${styles.mobileDrawer} ${
          mobileOpen ? styles.mobileOpen : ""
        }`}
      >

             <button
  className={styles.drawerClose}
  onClick={closeDrawer}
  aria-label="Close Menu"
>
  ✕
</button>

        
        {/* Drawer Header */}

        <div className={styles.drawerHeader}>
          <h2>Voice of Karachi</h2>
          <p>Government of Sindh</p>
        </div>

        {/* Navigation */}

        <nav className={styles.drawerNav}>
          {navLinks.map((item) =>
            item.id ? (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeDrawer}
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeDrawer}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        {/* Footer */}

        <div className={styles.drawerFooter}>
          {!loggedIn ? (
            <Link
              to="/login"
              onClick={closeDrawer}
              className={styles.drawerButton}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={closeDrawer}
                className={styles.drawerButton}
              >
                Profile
              </Link>

              <button
                className={styles.drawerLogout}
                onClick={() => {
                  closeDrawer();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          )}

        </div>

   
      </aside>
    </>
  );
};

export default MobileDrawer;