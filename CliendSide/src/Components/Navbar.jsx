import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "/logo.png";

export const Navbar = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScroll(current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

const navItems = [
  { title: "Home", id: "home" },
  { title: "Departments", id: "departments" },
  { title: "About", id: "about" },
  { title: "Report Issue", path: "/report-submit" },
  { title: "Track Complaint", path: "/report-tracking" },
  { title: "Login", path: "/login" },
];

  return (
    <nav
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

  <h1 className={styles.logoTitle}>
    Voice of Karachi
  </h1>

  <span className={styles.logoSub}>
    Government of Sindh 
  </span>

  <span className={styles.logoTag}>
    Digital Civic Engagement Platform
  </span>

</div>

      </Link>

      {/* Mobile */}

      <div
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Navigation */}

      <ul
        className={`${styles.navLinks} ${
          isOpen ? styles.active : ""
        }`}
      >
{navItems.map((item) => (

  <li key={item.title}>

    {item.id ? (

      <a
        href={`#${item.id}`}
        className={styles.navLink}
        onClick={() => setIsOpen(false)}
      >
        {item.title}
      </a>

    ) : (

      <Link
        to={item.path}
        className={`${styles.navLink} ${
          location.pathname === item.path
            ? styles.activeLink
            : ""
        }`}
        onClick={() => setIsOpen(false)}
      >
        {item.title}
      </Link>

    )}

  </li>

))}
      </ul>
    </nav>
  );
};

export default Navbar;