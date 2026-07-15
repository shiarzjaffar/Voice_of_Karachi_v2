import React, { useState, useEffect } from "react";
import adminloginstyles from "./AdminLogin.module.css";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));

    if (name === "email") {
      setError("");
      setEmailChecked(false);
    }
  };

  // 📌 Check if email entered has valid domain end (.com, .pk, .org etc)
  const domainCompleted = (email) => {
    return /\.[a-zA-Z]{2,}$/.test(email);
  };

  const checkEmailExists = async () => {
    if (!formData.email) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/check-admin-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.toLowerCase(),
          }),
        }
      );

      const data = await response.json();

      if (data.exists) {
        setError("");
        setEmailChecked(true);
      } else {
        setError("Email is not registered");
        setEmailChecked(false);
      }
    } catch {
      setError("Error checking email");
      setEmailChecked(false);
    }
  };

  // ✅ Run email check ONLY when domain is complete (.com / .pk / .org)
  useEffect(() => {
    if (domainCompleted(formData.email)) {
      checkEmailExists();
    } else {
      setEmailChecked(false);
    }
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          email: formData.email.toLowerCase(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      setSuccess(data.message);
      setTimeout(() => navigate("/user-fetch"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={adminloginstyles.loginAdmin}>
      <h1>Admin Login</h1>
      <p>Sign in to access the admin panel</p>

      <form
        className={adminloginstyles.loginForm}
        onSubmit={handleSubmit}
      >
        {/* Email Field */}
        <div className={adminloginstyles.inputGroup}>
          <FaUser className={adminloginstyles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
            style={{ textTransform: "lowercase" }}
          />
        </div>

        {error === "Email is not registered" && (
          <p className={adminloginstyles.emailError}>{error}</p>
        )}

        {emailChecked && !error && (
          <p className={adminloginstyles.emailValid}>✓ Email is registered</p>
        )}

        {/* Password Field */}
        <div className={adminloginstyles.inputGroup}>
          <FaLock className={adminloginstyles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <button
            type="button"
            className={adminloginstyles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Errors & Success */}
        {error && error !== "Email is not registered" && (
          <p className={adminloginstyles.errorText}>{error}</p>
        )}

        {success && (
          <p className={adminloginstyles.successText}>{success}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={adminloginstyles.submitButton}
          disabled={
            loading ||
            !emailChecked ||
            error === "Email is not registered" ||
            !formData.email ||
            !formData.password
          }
        >
          {loading ? "Logging in..." : <>
            <FaSignInAlt /> Login
          </>}
        </button>
        {/* Forgot Password */}
        <div className={adminloginstyles.forgotWrapper}>
          <Link to="/forget-password" className={adminloginstyles.forgotLink}>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};