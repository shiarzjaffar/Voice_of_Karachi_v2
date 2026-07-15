import React, { useEffect, useState } from "react";
import AdminProfilecss from "./AdminProfile.module.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaPhoneAlt,
  FaIdBadge,
} from "react-icons/fa";

export const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/profile/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized");
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setAdmin(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          Swal.fire({
            title: "Login Required",
            text: "Please login first to view the admin profile.",
            icon: "warning",
            background: "#0E2A43",
            color: "#F4F8F9",
            confirmButtonText: "Go to Login",
            confirmButtonColor: "#5BA0BC",
          }).then(() => {
            navigate("/");
          });
        } else {
          setError("Could not load profile");
        }
        setLoading(false);
      });
  }, [navigate]);

  return (
    <motion.div
      className={AdminProfilecss.profileContainer}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className={AdminProfilecss.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Admin Profile
      </motion.h2>

      {loading && <p className={AdminProfilecss.loading}>Loading profile...</p>}
      {error && <p className={AdminProfilecss.error}>{error}</p>}

      {admin && (
        <motion.div
          className={AdminProfilecss.card}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {admin.profileImage && (
            <img
              src={admin.profileImage}
              alt="Admin"
              className={AdminProfilecss.avatar}
            />
          )}

          <div className={AdminProfilecss.infoRow}>
            <FaUserShield className={AdminProfilecss.icon} />
            <span>{admin.fullname}</span>
          </div>
          <div className={AdminProfilecss.infoRow}>
            <FaEnvelope className={AdminProfilecss.icon} />
            <span>{admin.email}</span>
          </div>
          <div className={AdminProfilecss.infoRow}>
            <FaPhoneAlt className={AdminProfilecss.icon} />
            <span>{admin.phone}</span>
          </div>
          <div className={AdminProfilecss.infoRow}>
            <FaIdBadge className={AdminProfilecss.icon} />
            <span>Admin</span>
          </div>

          <div className={AdminProfilecss.updatecontainer}>
              <div className={AdminProfilecss.updatecontainer}>
                <button
                  className={AdminProfilecss.updateBtn}
                  onClick={() => navigate("/profile-update")}
                >
                  Update Profile
                </button>

                <button
                  className={AdminProfilecss.updateBtn}
                  onClick={() => navigate("/change-password")} // You can set your route here
                >
                  Change Password
                </button>
              </div>
            </div>
            
        </motion.div>
      )}
    </motion.div>
  );
};