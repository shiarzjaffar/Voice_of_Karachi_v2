import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, FileText, User } from "lucide-react";
import { motion } from "framer-motion";
import Sidebarcss from "./Sidebar.module.css";
import Swal from "sweetalert2";
import logo from "/logo.png";
import { useNGOSession } from "../hook/useNGOSession";

export const Sidebar = () => {

  useNGOSession();

  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen && window.innerWidth <= 768 ? "hidden" : "auto";
  }, [isOpen]);

  const Profile =() => {
    navigate("/ngo/profile");
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ngo/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");
    
      Swal.fire({
        title: "Logged out successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#0E2A43",
        color: "#F4F8F9",
        iconColor: "#5BA0BC",
      }).then(() => navigate("/ngo-login"));
    
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: err.message,
        background: "#0E2A43",
        color: "#F4F8F9",
        confirmButtonColor: "#5BA0BC",
      });
    }
  };

  return (
    <div className={Sidebarcss.sidebarContainer}>
      {isOpen && <div className={`${Sidebarcss.overlay} ${Sidebarcss.open}`} onClick={() => setIsOpen(false)} />}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={Sidebarcss.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </motion.button>

      <motion.div
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ duration: 0.5 }}
        className={`${Sidebarcss.sidebar} ${isOpen ? "" : Sidebarcss.closed}`}
      >
        <div className={Sidebarcss.logoContainer}>
          <img src={logo} alt="Logo" className={Sidebarcss.logoImage} />
          <span className={Sidebarcss.logoText}>Urban Fix</span>
        </div>

        <h2 className={Sidebarcss.sidebarTitle}>NGO Panel</h2>
        <ul className={Sidebarcss.sidebarMenu}>

          <Dropdown
            open={dropdownOpen1}
            toggle={() => setDropdownOpen1(!dropdownOpen1)}
            icon={<FileText />}
            label="Reports"
            items={[
              { to: "/ngo/dashboard", label: "Fetch Reports" },
              { to: "/ngo/report-closed", label: "Closed Reports" },
            ]}
          />

          <li
            className={Sidebarcss.sidebarItem}
            onClick={Profile}
            style={{ cursor: "pointer", color: "white", margin: "30px 0" }}
          >
            <User size={24} />
            <span className={Sidebarcss.sidebarLabel}>Profile</span>
          </li>
          <li
            className={Sidebarcss.sidebarItem}
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "red" }}
          >
            <LogOut size={24} />
            <span className={Sidebarcss.sidebarLabel}>Logout</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

const Dropdown = ({ open, toggle, icon, label, items }) => {
  return (
    <li className={Sidebarcss.dropdown} onClick={toggle}>
      <div className={Sidebarcss.dropdownHeader}>
        {icon}
        <span>{label}</span>
        <ChevronDown size={18} className={open ? Sidebarcss.rotate : ""} />
      </div>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={Sidebarcss.dropdownMenu}
        >
          {items.map(({ to, label }, i) => (
            <li key={i}>
              <Link to={to} className={Sidebarcss.sidebarLink}>
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>
      )}
    </li>
  );
};