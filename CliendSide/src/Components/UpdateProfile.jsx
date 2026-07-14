import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UpdateProfilecss from "./UpdateProfile.module.css";
import { FaUser, FaEnvelope, FaPhone, FaRegUser } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullname: "", email: "", phone: "" });
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [phoneStatus, setPhoneStatus] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  const emailTimer = useRef(null);
  const phoneTimer = useRef(null);

  useEffect(() => {
    setAnimate(true);
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/check-session", { withCredentials: true });
        if (res.data.loggedIn) {
          setUserId(res.data.userId);
          fetchUser(res.data.userId);
        } else {
          alert("Login first!");
          navigate("/login");
        }
      } catch {
        alert("Error checking session");
        navigate("/login");
      }
    };

    const fetchUser = async (userId) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/Profile/${userId}`);
        setFormData(res.data);
      } catch {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPhone = (phone) => /^\d{11}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "email" ? value.toLowerCase() : value;

    if (name === "phone" && /[^0-9]/.test(value)) return;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "email") handleEmailCheck(newValue);
    if (name === "phone") handlePhoneCheck(newValue);
  };

  const handleEmailCheck = (email) => {
    clearTimeout(emailTimer.current);
    if (!email || !isValidEmail(email)) return setEmailStatus("");
    emailTimer.current = setTimeout(() => {
      axios
        .post("http://localhost:5000/api/auth/check-email", { email })
        .then((res) => {
          if (res.data.exists && res.data.userId !== userId) setEmailStatus("Email Already Taken");
          else setEmailStatus("");
        })
        .catch(() => setEmailStatus(""));
    }, 400);
  };

  const handlePhoneCheck = (phone) => {
    clearTimeout(phoneTimer.current);
    if (!phone || !isValidPhone(phone)) return setPhoneStatus("");
    phoneTimer.current = setTimeout(() => {
      axios
        .post("http://localhost:5000/api/auth/check-phone", { phone })
        .then((res) => {
          if (res.data.exists && res.data.userId !== userId) setPhoneStatus("Phone Already Taken");
          else setPhoneStatus("");
        })
        .catch(() => setPhoneStatus(""));
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmed = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    if (!trimmed.fullname || !trimmed.email || !trimmed.phone || !trimmed.password) {
      setError("All fields are required!");
      return triggerShake();
    }
    if (!isValidEmail(trimmed.email)) {
      setError("Invalid email address.");
      return triggerShake();
    }
    if (!isValidPhone(trimmed.phone)) {
      setError("Phone number must be 11 digits.");
      return triggerShake();
    }
    if (emailStatus || phoneStatus) {
      setError("Resolve the email or phone issues.");
      return triggerShake();
    }

    try {
      setLoading(true);
      const res = await axios.put(`http://localhost:5000/api/auth/profile/update/${userId}`, trimmed);

      /** ⭐ UPDATED SWEET ALERT WITH YOUR THEME ⭐ */
      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: res.data.message,
        background: "rgba(15, 29, 45, 0.85)",
        color: "#FFFFFF",
        confirmButtonColor: "#E87722",
        backdrop: `
          rgba(0,0,0,0.6)
          left top
          no-repeat
        `,
        customClass: {
          popup: "swal-custom-popup",
          confirmButton: 'no-cursor-button',
          cancelButton: 'no-cursor-button'
        },
        timer: 2000,
      });

      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (loading) return <p>⏳ Loading profile...</p>;

  return (
    <div className={`${UpdateProfilecss.updateContainer} ${animate ? UpdateProfilecss.fadeIn : ""}`}>
      <h1>Update Profile</h1>
      <p>Keep your information up to date!</p>

      <form className={`${UpdateProfilecss.updateForm} ${shake ? UpdateProfilecss.shake : ""}`} onSubmit={handleSubmit}>
        <div className={UpdateProfilecss.inputGroup}>
          <FaUser className={UpdateProfilecss.icon} />
          <input type="text" name="fullname" placeholder="Your Name" value={formData.fullname} onChange={handleChange} autoComplete="off" required />
        </div>

        <div className={UpdateProfilecss.inputGroup}>
          <FaPhone className={`${UpdateProfilecss.icon} ${UpdateProfilecss.phone}`} />
          <input type="text" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} autoComplete="off" maxLength="11" required />
        </div>
        {phoneStatus && <p className={UpdateProfilecss.warningText}>{phoneStatus}</p>}

        <div className={UpdateProfilecss.inputGroup}>
          <FaEnvelope className={UpdateProfilecss.icon} />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} autoComplete="off" required />
        </div>
        {emailStatus && <p className={UpdateProfilecss.warningText}>{emailStatus}</p>}

        {error && <p className={UpdateProfilecss.errorText}>{error}</p>}

        <button type="submit" className={UpdateProfilecss.submitButton} disabled={loading}>
          <FaRegUser /> {loading ? "⏳ Processing..." : "Update"}
        </button>
      </form>

      <p className={UpdateProfilecss.backButton} onClick={() => navigate("/profile")}>
        ← Back to Profile
      </p>
    </div>
  );
};