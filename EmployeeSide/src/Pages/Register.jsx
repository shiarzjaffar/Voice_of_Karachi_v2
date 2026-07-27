import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";
import styles from "./Login.module.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    department: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        fullname: formData.fullname,
        department: formData.department,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      };

      await api.post("/auth/employee/register", payload);

      alert(
        "Registration submitted successfully.\n\nPlease wait for Admin approval before logging in."
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.icon}>
          <FaUserTie />
        </div>

        <h1>Employee Registration</h1>

        <p>Create your employee account</p>

        <form onSubmit={handleSubmit}>

          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter full name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>


          <div className={styles.formGroup}>
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>

              <option>Road Maintenance</option>
              <option>Electrical Maintenance</option>
              <option>Water & Sewerage</option>
              <option>Solid Waste Management</option>
              <option>Parks & Recreation</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password</label>

            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className={styles.registerText}>
            Already have an account?{" "}
            <span
              className={styles.registerLink}
              onClick={() => navigate("/")}
            >
              Login Here
            </span>
          </div>

        </form>

      </div>
    </div>
  );
}

export default Register;