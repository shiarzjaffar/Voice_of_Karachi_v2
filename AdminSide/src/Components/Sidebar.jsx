import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Menu, X, ChevronDown, LogOut, FileText, Users, User, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Sidebarcss from "./Sidebar.module.css";
import { FaRegBuilding } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "/logo.png";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [dropdownOpen4, setDropdownOpen4] = useState(false);
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
    navigate("/profile");
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed");

      Swal.fire({
        title: "Logged out successfully!",
        icon: "success",
        timer: 2000,
        background: "linear-gradient(135deg, #001f1f, #004d4d)",
        color: "white",
        showConfirmButton: false,
      }).then(() => navigate("/"));
    } catch (err) {
      Swal.fire({ icon: "error", title: "Logout failed", text: err.message });
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

        <h2 className={Sidebarcss.sidebarTitle}>Admin Panel</h2>
        <ul className={Sidebarcss.sidebarMenu}>
          <div className={Sidebarcss.dashboardButtonWrapper}>
            <button className={Sidebarcss.dashboardButton} onClick={() => navigate("/dashboard")}>
              <Home size={18} style={{ marginRight: "8px" }} />
              Go to Dashboard
            </button>
          </div>

          <Dropdown
            open={dropdownOpen1}
            toggle={() => setDropdownOpen1(!dropdownOpen1)}
            icon={<Users />}
            label="Users"
            items={[
              { to: "/user-fetch", label: "Fetch Users" },
              { to: "/user-delete", label: "Delete Users" },
              { to: "/user-activedeactive", label: "Active/Deactivate Users" },
            ]}
          />

          <Dropdown
            open={dropdownOpen2}
            toggle={() => setDropdownOpen2(!dropdownOpen2)}
            icon={<FileText />}
            label="Reports"
            items={[
              { to: "/report-fetch", label: "Fetch Reports" },
              { to: "/report-closed", label: "Closed Reports" },
              { to: "/report-update", label: "Status Update Reports" },
            ]}
          />

          <Dropdown
            open={dropdownOpen3}
            toggle={() => setDropdownOpen3(!dropdownOpen3)}
            icon={<MessageSquare />}
            label="Contact"
            items={[
              { to: "/View-Message", label: "View Messages" },
              { to: "/Delete-Message", label: "Delete Messages" },
            ]}
          />
          <li
            className={Sidebarcss.sidebarItem}
            onClick={Profile}
            style={{ cursor: "pointer", color: "white", margin: "30px 0" }}
          >
            <User size={24} />
            <span className={Sidebarcss.sidebarLabel}>Admin Profile</span>
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

const SidebarItem = ({ to, icon, label }) => (
  <li className={Sidebarcss.sidebarItem}>
    <Link to={to} className={Sidebarcss.sidebarLink}>
      {icon && <span className={Sidebarcss.icon}>{icon}</span>}
      <span className={Sidebarcss.sidebarLabel}>{label}</span>
    </Link>
  </li>
);

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