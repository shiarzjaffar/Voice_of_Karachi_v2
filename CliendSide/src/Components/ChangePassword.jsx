import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangePasswordcss from "./ChangePassword.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 👁️ Show/Hide Toggles
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // 🎨 UrbanFix SweetAlert Theme
const swalTheme = {
  background: "#FFFFFF",
  color: "#111827",
  confirmButtonColor: "#006A4E",
};

  // 🔐 Check user session
  const checkSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-session",
        { withCredentials: true }
      );

      if (response.data.loggedIn) {
        setUserId(response.data.userId);
      } else {
        await Swal.fire({
          icon: "error",
          title: "🚫 Not Logged In",
          text: "Please login first! 🔐",
          ...swalTheme,
        });
        navigate("/login");
      }
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "⚠️ Error",
        text: "Error checking session.",
        ...swalTheme,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // ✨ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match!",
        ...swalTheme,
      });
    }

    try {
      // 1️⃣ Verify old password
      const checkResponse = await fetch("http://localhost:5000/api/auth/password/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, oldPassword }),
      });

      const checkData = await checkResponse.json();

      if (!checkResponse.ok) {
        return Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: checkData.error,
          ...swalTheme,
        });
      }

      // 2️⃣ Update password
      const updateResponse = await fetch("http://localhost:5000/api/auth/password/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newPassword }),
      });

      const updateData = await updateResponse.json();

      if (!updateResponse.ok) {
        return Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: updateData.error,
          ...swalTheme,
        });
      }

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
        ...swalTheme,
      });

      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Try again later.",
        ...swalTheme,
      });
    }
  };

  return (
    <div className={ChangePasswordcss.container}>
      <h2 className={ChangePasswordcss.title}>Change Password</h2>

      <form className={ChangePasswordcss.form} onSubmit={handleSubmit}>
        
        {/* Old Password */}
        <div className={ChangePasswordcss.inputGroup}>
          <label>Old Password</label>
          <div className={ChangePasswordcss.passwordWrapper}>
            <input
              type={showOld ? "text" : "password"}
              className={ChangePasswordcss.input}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <span
              className={ChangePasswordcss.eyeIcon}
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div className={ChangePasswordcss.inputGroup}>
          <label>New Password</label>
          <div className={ChangePasswordcss.passwordWrapper}>
            <input
              type={showNew ? "text" : "password"}
              className={ChangePasswordcss.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className={ChangePasswordcss.eyeIcon}
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className={ChangePasswordcss.inputGroup}>
          <label>Confirm Password</label>
          <div className={ChangePasswordcss.passwordWrapper}>
            <input
              type={showConfirm ? "text" : "password"}
              className={ChangePasswordcss.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className={ChangePasswordcss.eyeIcon}
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className={ChangePasswordcss.btn}>
          Update Password
        </button>

        <p className={ChangePasswordcss.backLink} onClick={() => navigate("/profile")}>
          ← Go Back
        </p>
      </form>
    </div>
  );
};