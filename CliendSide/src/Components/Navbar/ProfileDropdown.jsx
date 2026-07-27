import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function ProfileDropdown({
  user,
  onLogout,
  onClose,
}) {
  return (
    <div className={styles.dropdown}>
      <div className={styles.profileHeader}>
        <h4>{user?.fullname || "Citizen"}</h4>

        <p>{user?.email}</p>

        <span>{user?.role || "Citizen"}</span>
      </div>

      <Link to="/dashboard" onClick={onClose}>
        Dashboard
      </Link>

      <Link to="/profile" onClick={onClose}>
        My Profile
      </Link>

      <Link to="/update-profile" onClick={onClose}>
        Edit Profile
      </Link>

      <Link to="/change-password" onClick={onClose}>
        Change Password
      </Link>

      <button
        onClick={() => {
          onClose?.();
          onLogout?.();
        }}
      >
        Logout
      </button>
    </div>
  );
}