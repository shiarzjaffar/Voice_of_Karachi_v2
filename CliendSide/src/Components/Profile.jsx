import React, { useState, useEffect } from "react";
import profilecss from "./Profile.module.css";
import { 
  FaPhone, 
  FaEnvelope,
  FaUser, 
  FaSignOutAlt, 
  FaEdit, 
  FaTrash, 
  FaKey
} from "react-icons/fa";
import profileImage from '/logo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


const swalTheme = {
  background: "#FFFFFF",
  color: "#111827",
  confirmButtonColor: "#006A4E",
};

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-session", { withCredentials: true });
        if (response.data.loggedIn) {
          const userId = response.data.userId;
          fetchUser(userId);
        } else {
          await Swal.fire({
            icon: "error",
            title: "🚫 Not Logged In",
            text: "Please login first! 🔐",
            ...swalTheme,
          });
          setLoading(false);
          navigate("/login");
        }
      } catch (err) {
        await Swal.fire({
          icon: "error",
          title: "⚠️ Error",
          text: "Error checking session.",
          ...swalTheme,
        });
        setLoading(false);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/Profile/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("❌ Error fetching user data.");
        await Swal.fire({
          icon: "error",
          title: "⚠️ Error",
          text: "Error fetching user data.",
          ...swalTheme,
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      await Swal.fire({
        icon: "success",
        title: "👋 Logged Out",
        text: "Logged out successfully!",
        ...swalTheme
      });
      navigate("/login");
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "⚠️ Error",
        text: "Error logging out.",
        ...swalTheme
      });
    }
  };

  const handleDelete = async () => {
    const userId = user?._id;
    if (!userId) {
      await Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: "User not found!",
        ...swalTheme,
      });
      return;
    }

    const result = await Swal.fire({
      title: "⚠️ Are you sure?",
      text: "Your account will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      ...swalTheme,
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/profile/delete/${userId}`);
      await Swal.fire({
        icon: "success",
        title: "✅ Deleted!",
        text: response.data.message,
        ...swalTheme,
      });
      navigate("/signup");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "⚠️ Error",
        text: "Error deleting account.",
        ...swalTheme,
      });
    }
  };

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  const ChangePassword = () => {
    navigate("/change-password");
  };

  if (loading) return <p>⏳ Loading profile...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className={profilecss.profileContainer}>
      <h1 className={profilecss.profileHeading}>My Profile</h1>

      <div className={profilecss.profileCard}>
        <img src={profileImage} alt="Profile" className={profilecss.profileImage} />
        <p className={profilecss.profileRole}>Role: {user?.role}</p>

        <div className={profilecss.profileDetail}>
          <p><strong><FaUser /> </strong> {user?.fullname}</p>
          <p><strong><FaPhone className={profilecss.phone} /> </strong> {user?.phone}</p>
          <p><strong><FaEnvelope /> </strong> {user?.email}</p>
        </div>

        {/* ====== ICON BUTTONS (New) ====== */}
        <div className={profilecss.iconButtonRow}>
          <button className={profilecss.iconButton} data-tip="Update Profile" onClick={handleUpdate}>
            <FaEdit />
          </button>
          
          <button className={profilecss.iconButton} data-tip="Delete Profile" onClick={handleDelete}>
            <FaTrash />
          </button>
          
          <button className={profilecss.iconButton} data-tip="Logout" onClick={logout}>
            <FaSignOutAlt />
          </button>
          
          <button className={profilecss.iconButton} data-tip="Change Password" onClick={ChangePassword}>
            <FaKey />
          </button>
        </div>

      </div>
    </div>
  );
};