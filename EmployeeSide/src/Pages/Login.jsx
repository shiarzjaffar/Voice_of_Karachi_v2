import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";
import styles from "./Login.module.css";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/employee/login", formData);

      localStorage.setItem(
        "employee",
        JSON.stringify(res.data.user)
      );

navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to login. Please try again."
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

        <h1>Employee Portal</h1>

        <p>
          Sign in to access your dashboard
        </p>

        <form onSubmit={handleSubmit}>

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
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
            {loading ? "Signing In..." : "Login"}
          </button>

          <div className={styles.registerText}>
  Don't have an employee account?{" "}

  <span
    onClick={() => navigate("/register")}
    className={styles.registerLink}
  >
    Register Here
  </span>

</div>

        </form>

      </div>
    </div>
  );
}
export default Login;