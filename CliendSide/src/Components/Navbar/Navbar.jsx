import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import MobileDrawer from "./MobileDrawer";
import ProfileDropdown from "./ProfileDropdown";

import { useAuth } from "../../context/AuthContext";

import styles from "./Navbar.module.css";
import logo from "/logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
  user,
  loggedIn,
  loading,
  logout,
} = useAuth();

const handleLogout = async () => {
  await logout();

  setProfileOpen(false);
  setMobileOpen(false);

  navigate("/login");
};

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const profileRef = useRef(null);



  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);


  const guestLinks = [
    { title: "Home", id: "home" },
    { title: "Transparency", path: "/transparency" },
    { title: "Departments", id: "departments" },
    { title: "About", id: "about" },
    { title: "NGO", path: "/ngo" },
  ];

  const userLinks = [
    { title: "Home", id: "home" },
    { title: "Dashboard", path: "/dashboard" },
    { title: "Report Issue", path: "/report-submit" },
    { title: "My Complaints", path: "/report-tracking" },
    { title: "Transparency", path: "/transparency" },
    { title: "NGO", path: "/ngo" },
  ];

  const navLinks = loggedIn ? userLinks : guestLinks;

  return (
    <header
      className={`${styles.navbar} ${
        showNavbar ? styles.show : styles.hide
      }`}
    >
      {/* Logo */}

      <Link to="/" className={styles.logoContainer}>
        <img
          src={logo}
          alt="Voice of Karachi"
          className={styles.logoImage}
        />

        <div className={styles.logoText}>
          <h2 className={styles.logoTitle}>
            Voice of Karachi
          </h2>

          <span className={styles.logoSub}>
            Government of Sindh
          </span>

          <span className={styles.logoTag}>
            Digital Civic Engagement Platform
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}

      <nav className={styles.desktopNav}>
        {navLinks.map((item) =>
          item.id ? (
            <a
              key={item.title}
              href={`#${item.id}`}
              className={styles.navLink}
            >
              {item.title}
            </a>
          ) : (
            <Link
              key={item.title}
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path
                  ? styles.activeLink
                  : ""
              }`}
            >
              {item.title}
            </Link>
          )
        )}
      </nav>

      {/* Right Side */}

      <div className={styles.rightSection}>
        {loading ? null : !loggedIn ? (
          <Link
            to="/login"
            className={styles.loginButton}
          >
            Login
          </Link>
        ) : (
          <>
            <button className={styles.notificationBtn}>
              🔔
            </button>

            <div
              className={styles.profileWrapper}
              ref={profileRef}
            >
              <button
                className={styles.profileButton}
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >
                👤
              </button>

              {profileOpen && (
<ProfileDropdown
    user={user}
    onLogout={handleLogout}
    onClose={() => setProfileOpen(false)}
/>
              )}
            </div>
          </>
        )}

<button
  className={styles.mobileButton}
  onClick={() => setMobileOpen((prev) => !prev)}
  aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
>
  {mobileOpen ? "✕" : "☰"}
</button>
      </div>

      {/* Mobile Drawer */}

    <MobileDrawer
  mobileOpen={mobileOpen}
  setMobileOpen={setMobileOpen}
  loggedIn={loggedIn}
  navLinks={navLinks}
  handleLogout={handleLogout}
/>

    </header>
  );
};

export default Navbar;