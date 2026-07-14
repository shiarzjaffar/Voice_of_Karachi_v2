import React, { useState, useEffect } from "react";
import contactstylecss from "./Contact.module.css";
import { FaUser, FaEnvelope, FaPhone, FaComment, FaPlaneDeparture } from "react-icons/fa";
import Swal from "sweetalert2";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🎨 UrbanFix Brand SweetAlert Theme
const swalTheme = {
  background: "#FFFFFF",
  color: "#111827",
  confirmButtonColor: "#006A4E",
};

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue.length <= 11) setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError("⚠️ Name, Email, and Message are required!");
      triggerShake();
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" });
        await Swal.fire({
          icon: "success",
          title: "🎉 Success!",
          text: data.message || "Message sent successfully!",
          ...swalTheme,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } else {
        setError("❌ " + (data.message || "Error sending message. Please try again."));
        triggerShake();
        await Swal.fire({
          icon: "error",
          title: "❌ Failed!",
          text: data.message || "Error sending message. Please try again.",
          ...swalTheme,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Error sending message. Please try again.");
      triggerShake();
      await Swal.fire({
        icon: "error",
        title: "❌ Failed!",
        text: "Error sending message. Please try again.",
        ...swalTheme,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  return (
    <div className={`${contactstylecss.contactContainer} ${animate ? contactstylecss.fadeIn : ""}`}>
      <h1 className={contactstylecss.title}>Contact Us</h1>
      <p className={contactstylecss.subtitle}>We’d love to hear from you. Reach out anytime!</p>

      <div className={`${contactstylecss.contactFormContainer} ${shake ? contactstylecss.shake : ""}`}>
        {error && <p className={contactstylecss.errorText}>{error}</p>}

        <form className={contactstylecss.contactForm} onSubmit={handleSubmit}>
          <div className={contactstylecss.inputGroup}>
            <FaUser className={contactstylecss.icon} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={contactstylecss.input}
              autoComplete="off"
              required
            />
          </div>

          <div className={contactstylecss.inputGroup}>
            <FaEnvelope className={contactstylecss.icon} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={contactstylecss.input}
              autoComplete="off"
              required
            />
          </div>

          <div className={contactstylecss.inputGroup}>
            <FaPhone className={`${contactstylecss.icon} ${contactstylecss.phone}`} />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className={contactstylecss.input}
              autoComplete="off"
              maxLength="11"
            />
          </div>

          <div className={contactstylecss.inputGroup}>
            <FaComment className={contactstylecss.icon} />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className={contactstylecss.input}
              autoComplete="off"
              required
            />
          </div>

          <button type="submit" className={contactstylecss.submitButton} disabled={loading}>
            {loading ? "⏳ Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};