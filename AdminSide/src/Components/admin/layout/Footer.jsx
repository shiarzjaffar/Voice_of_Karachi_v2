import { Link } from "react-router-dom";
import {
  MapPinned,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.brand}>
          <MapPinned size={20} />

          <div>
            <h4>Voice of Karachi</h4>
            <p>Government Complaint Management Portal</p>
          </div>
        </div>

        <div className={styles.links}>
          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/report-fetch">
            Reports
          </Link>

          <Link to="/profile">
            Profile
          </Link>
        </div>

        <div className={styles.right}>
          <div className={styles.secure}>
            <ShieldCheck size={16} />
            <span>Secure Admin Portal</span>
          </div>

          <p>
            © {new Date().getFullYear()} Voice of Karachi.
            All rights reserved.
          </p>
        </div>

      </div>

      <div className={styles.bottom}>
        <HeartHandshake size={15} />
        <span>
          Building a cleaner, smarter and more connected Karachi.
        </span>
      </div>
    </footer>
  );
}