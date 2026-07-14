import React, { useState, useEffect } from "react";
import loginstylecss from "./Login.module.css";
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);

  // 🎨 UrbanFix Brand SweetAlert Theme
const swalTheme = {
  background: "#FFFFFF",
  color: "#111827",

  confirmButtonColor: "#006A4E",
  cancelButtonColor: "#DC2626",

  iconColor: "#006A4E",

  customClass: {
    popup: "animate__animated animate__fadeInDown",
  },
};

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
          withCredentials: true,
        });
        if (response.data.loggedIn) navigate("/dashboard");
      } catch (err) {
        console.error("Error checking authentication:", err);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: name === "email" ? value.toLowerCase() : value });
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const checkEmailExistence = async (email) => {
    if (isValidEmail(email)) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/check-email", { email });
        if (response.data.exists) {
          setEmailStatus("");
          setEmailChecked(true);
        } else {
          setEmailStatus("Email not registered.");
          setEmailChecked(false);
        }
      } catch (err) {
        console.error("Error checking email:", err);
        setEmailStatus("⚠️ An error occurred while checking email.");
        setEmailChecked(false);
      }
    } else {
      setEmailStatus("");
      setEmailChecked(false);
    }
  };

  useEffect(() => {
    if (formData.email) {
      checkEmailExistence(formData.email);
    } else {
      setEmailStatus("");
      setEmailChecked(false);
    }
  }, [formData.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("⚠️ All fields are required!");
      triggerShake();
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("📧 Please enter a valid email address.");
      triggerShake();
      return;
    }

    if (formData.password.length < 8) {
      setError("🔒 Password must be at least 8 characters long.");
      triggerShake();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });

      const { message } = response.data;
      setFormData({ email: "", password: "" });
      setError("");

      await Swal.fire({
        icon: "success",
        title: "🎉 Success!",
        text: message || "Logged in successfully!",
        confirmButtonText: "Continue",
        ...swalTheme,
        timer: 2000
      });

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.error === "Email not found!") {
        setError("📭 Email not registered.");
        setEmailChecked(false);
      } else {
        setError(err.response?.data?.error || "⚠️ An unexpected error occurred.");
      }

      triggerShake();

      await Swal.fire({
        icon: "error",
        title: "❌ Login Failed",
        text: err.response?.data?.error || "Something went wrong. Please try again.",
        ...swalTheme,
      });

      setFormData({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={loginstylecss.loginContainer}>
      <h1 className={loginstylecss.title}>VOICE OF KARACHI</h1>

<p className={loginstylecss.subtitle}>
  Access your citizen account to report civic issues and
  track complaint progress.
</p>

      <form
        className={`${loginstylecss.loginForm} ${shake ? loginstylecss.shake : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={loginstylecss.inputGroup}>
          <FaEnvelope className={loginstylecss.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        {emailStatus && (
          <p className={loginstylecss.warningText} aria-live="assertive">
            {emailStatus}
          </p>
        )}
        {emailChecked && !emailStatus && (
          <p className={loginstylecss.successText}>Email is registered</p>
        )}

        <div className={loginstylecss.inputGroup}>
          <FaLock className={loginstylecss.icon} />
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
            className={loginstylecss.toggleButton}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && (
          <p className={loginstylecss.errorText} aria-live="assertive">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={loginstylecss.submitButton}
          disabled={loading || !emailChecked}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className={loginstylecss.forgotPasswordContainer}>
          <a href="/forgot-password" className={loginstylecss.forgotPasswordLink}>
            Forgot Password?
          </a>
        </div>
        <div className={loginstylecss.signupLink}>
  Don't have an account?
  <a href="/signup"> Create Account</a>
</div>


      </form>
    </div>
  );
};