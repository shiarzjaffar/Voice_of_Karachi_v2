import { useEffect, useState } from "react";
import api from "../Services/api";
import styles from "./Profile.module.css";

function Profile() {
  const storedEmployee = JSON.parse(
    localStorage.getItem("employee")
  );

  const [employee, setEmployee] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [editOpen, setEditOpen] = useState(false);

  const [passwordOpen, setPasswordOpen] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [passwordSaving, setPasswordSaving] =
    useState(false);

  const [profileForm, setProfileForm] =
    useState({
      fullname: "",
      email: "",
      phone: "",
      department: "",
    });

  const [passwordForm, setPasswordForm] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/auth/Profile/${storedEmployee._id}`
      );

      setEmployee(res.data);

      setProfileForm({
        fullname: res.data.fullname || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        department: res.data.department || "",
      });

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      setSaving(true);

      await api.put(
        `/auth/profile/update/${employee._id}`,
        profileForm
      );

      await fetchProfile();

      localStorage.setItem(
        "employee",
        JSON.stringify({
          ...storedEmployee,
          fullname: profileForm.fullname,
          email: profileForm.email,
          phone: profileForm.phone,
          department: profileForm.department,
        })
      );

      setEditOpen(false);

      alert("Password changed successfully.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      return alert("Passwords do not match.");
    }

    try {
      setPasswordSaving(true);

      await api.post(
        "/auth/password/check",
        {
          userId: employee._id,
          oldPassword: passwordForm.oldPassword,
        }
      );

      await api.put(
        "/auth/password/update",
        {
          userId: employee._id,
          newPassword:
            passwordForm.newPassword,
        }
      );

      alert(
        "Password changed successfully."
      );

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordOpen(false);
    } catch (err) {
      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
      </div>
    );
  }

  const initials = employee.fullname
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={styles.page}>
      {/* Page Header */}

      <div className={styles.pageHeader}>
        <div>
          <h1>My Profile</h1>
          <p>
            View and manage your employee
            information.
          </p>
        </div>

        <div className={styles.headerButtons}>
          <button
            className={styles.secondaryButton}
            onClick={() => setPasswordOpen(true)}
          >
            Change Password
          </button>

          <button
            className={styles.primaryButton}
            onClick={() => setEditOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Card */}

      <div className={styles.profileCard}>
        <div className={styles.profileTop}>
          <div className={styles.avatar}>
            {initials}
          </div>

          <div className={styles.profileInfo}>
            <h2>{employee.fullname}</h2>

            <p>{employee.department}</p>

            <span className={styles.employeeId}>
              {employee.employeeId}
            </span>
          </div>

          <div className={styles.statusArea}>
            <span
              className={
                employee.userstatus === 1
                  ? styles.activeBadge
                  : styles.inactiveBadge
              }
            >
              {employee.userstatus === 1
                ? "Active"
                : "Inactive"}
            </span>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <label>Employee ID</label>

            <h4>{employee.employeeId}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Full Name</label>

            <h4>{employee.fullname}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Email Address</label>

            <h4>{employee.email}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Phone Number</label>

            <h4>{employee.phone}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Department</label>

            <h4>{employee.department}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Role</label>

            <h4>{employee.role}</h4>
          </div>

          <div className={styles.infoCard}>
            <label>Approval Status</label>

            <h4>
              {employee.approved
                ? "Approved"
                : "Pending Approval"}
            </h4>
          </div>

          <div className={styles.infoCard}>
            <label>Account Status</label>

            <h4>
              {employee.userstatus === 1
                ? "Active"
                : "Inactive"}
            </h4>
          </div>
        </div>
      </div>

      {/* ===========================
          EDIT PROFILE MODAL
      ============================ */}

      {editOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Profile</h2>

            <div className={styles.formGroup}>
              <label>Full Name</label>

              <input
                type="text"
                name="fullname"
                value={
                  profileForm.fullname
                }
                onChange={
                  handleProfileChange
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={
                  profileForm.email
                }
                onChange={
                  handleProfileChange
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={
                  profileForm.phone
                }
                onChange={
                  handleProfileChange
                }
              />
            </div>

            <div className={styles.formGroup}>
              <label>Department</label>

              <input
                type="text"
                name="department"
                value={
                  profileForm.department
                }
                disabled
              />
            </div>

            <div className={styles.modalButtons}>
              <button
                className={
                  styles.cancelButton
                }
                onClick={() =>
                  setEditOpen(false)
                }
              >
                Cancel
              </button>

              <button
                className={
                  styles.primaryButton
                }
                disabled={saving}
                onClick={
                  updateProfile
                }
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
            {/* ===========================
          CHANGE PASSWORD MODAL
      ============================ */}

      {passwordOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Change Password</h2>

            <div className={styles.formGroup}>
              <label>Current Password</label>

              <input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
              />
            </div>

            <div className={styles.formGroup}>
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </div>

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setPasswordOpen(false);

                  setPasswordForm({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </button>

              <button
                className={styles.primaryButton}
                disabled={passwordSaving}
                onClick={changePassword}
              >
                {passwordSaving
                  ? "Updating..."
                  : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;