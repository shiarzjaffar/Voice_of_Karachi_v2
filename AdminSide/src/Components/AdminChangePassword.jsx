import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import adminchangepasswordstyles from "./AdminChangePassword.module.css";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        background: "#0E2A43",
        color: "#F4F8F9",
      });
    }
  
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/change-password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
    
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: res.data.message,
        background: "#0E2A43",
        color: "#F4F8F9",
        timer: 2000,
        showConfirmButton: false,
      });
    
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    
      setTimeout(() => {
        navigate("/profile");
      }, 2200);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Password change failed",
        background: "#0E2A43",
        color: "#F4F8F9",
      });
    }
  };

  return (
    <motion.div
      className={adminchangepasswordstyles.adminChangePassword__container}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className={adminchangepasswordstyles.adminChangePassword__title}>
        <FaLock className={adminchangepasswordstyles.adminChangePassword__icon} /> Change Password
      </h1>
      <p className={adminchangepasswordstyles.adminChangePassword__subtitle}>
        Please enter your current and new password below.
      </p>

      <form
        onSubmit={handleSubmit}
        className={adminchangepasswordstyles.adminChangePassword__form}
      >
        {/* Old Password */}
        <div className={adminchangepasswordstyles.adminChangePassword__inputGroup}>
          <input
            type={showPasswords.old ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={adminchangepasswordstyles.adminChangePassword__toggleButton}
            onClick={() => toggleShowPassword("old")}
          >
            {showPasswords.old ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* New Password */}
        <div className={adminchangepasswordstyles.adminChangePassword__inputGroup}>
          <input
            type={showPasswords.new ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={adminchangepasswordstyles.adminChangePassword__toggleButton}
            onClick={() => toggleShowPassword("new")}
          >
            {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className={adminchangepasswordstyles.adminChangePassword__inputGroup}>
          <input
            type={showPasswords.confirm ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className={adminchangepasswordstyles.adminChangePassword__toggleButton}
            onClick={() => toggleShowPassword("confirm")}
          >
            {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          className={adminchangepasswordstyles.adminChangePassword__submitButton}
        >
          Update Password
        </button>
      </form>
    </motion.div>
  );
};
