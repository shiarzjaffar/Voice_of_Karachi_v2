import React, { useState, useEffect } from "react";
import AdminUpdatecss from "./AdminUpdate.module.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUserShield,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AdminUpdate = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // 🔁 Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile/me", {
          withCredentials: true,
        });
        const { fullname, email, phone } = res.data;
        setAdmin({ fullname, email, phone });
        setOriginalEmail(email);
        setOriginalPhone(phone);
      } catch (err) {
        console.error("Failed to fetch profile", err);
        Swal.fire({
          icon: "error",
          title: "Session expired",
          text: "Please log in again.",
          background: "#001f1f",
          color: "#00ffcc",
        }).then(() => {
          navigate("/"); // Redirect to login
        });
      }
    };
    fetchProfile();
  }, []);

  // 🔁 Handle input change with validation
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });

    if (name === "email" && value && value !== originalEmail) {
      try {
        const res = await axios.post("http://localhost:5000/api/admin/check-admin-email", {
          email: value,
        });
        setEmailError(res.data.exists ? "Email already exists" : "");
      } catch (err) {
        console.error("Email check failed", err);
      }
    }

    if (name === "phone" && value && value !== originalPhone) {
      try {
        const res = await axios.post("http://localhost:5000/api/admin/check-admin-phone", {
          phone: value,
        });
        setPhoneError(res.data.exists ? "Phone already exists" : "");
      } catch (err) {
        console.error("Phone check failed", err);
      }
    }
  };

  // 🔐 Submit update
  // Inside handleSubmit()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (emailError || phoneError) {
      Swal.fire({
        icon: "error",
        title: "Fix validation errors first",
        background: "#0E2A43",  // dark-navy-blue
        color: "#5BA0BC",       // bright-sky-blue
      });
      return;
    }
  
    try {
      await axios.put(
        "http://localhost:5000/api/admin/update-profile",
        admin,
        { withCredentials: true }
      );
    
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Admin profile updated successfully.",
        background: "#0E2A43",  // dark-navy-blue
        color: "#F4F8F9",       // white-light
      }).then(() => {
        navigate("/profile");
      });
    
    } catch (err) {
      console.error("Update failed", err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Please try again later.",
        background: "#0E2A43",  // dark-navy-blue
        color: "#5BA0BC",       // bright-sky-blue
      });
    }
  };

  return (
    <motion.div
      className={AdminUpdatecss.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={AdminUpdatecss.title}>Update Admin Profile</h2>
      <form onSubmit={handleSubmit} className={AdminUpdatecss.form}>
        <div className={AdminUpdatecss.inputGroup}>
          <FaUserShield className={AdminUpdatecss.icon} />
          <input
            type="text"
            name="fullname"
            placeholder="Admin Name"
            value={admin.fullname}
            onChange={handleChange}
            required
          />
        </div>

        <div className={AdminUpdatecss.inputGroup}>
          <FaEnvelope className={AdminUpdatecss.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>
        {emailError && <p className={AdminUpdatecss.errorText}>{emailError}</p>}

        <div className={AdminUpdatecss.inputGroup}>
          <FaPhoneAlt className={AdminUpdatecss.icon} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={admin.phone}
            onChange={handleChange}
            maxLength={11}
            required
          />
        </div>
        {phoneError && <p className={AdminUpdatecss.errorText}>{phoneError}</p>}

        <button type="submit" className={AdminUpdatecss.submitBtn}>
          Update
        </button>
      </form>
    </motion.div>
  );
};
