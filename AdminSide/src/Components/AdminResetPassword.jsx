import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import forgetpwdstyle from './AdminForgetpwd.module.css';

export const AdminResetPassword = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail");
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirm) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'Make sure both passwords match.',
        background: '#0E2A43',   // dark navy
        color: '#C4D0D6',        // soft gray warning text
        confirmButtonColor: '#5BA0BC', // sky blue button
      });
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/admin/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
    
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    
      Swal.fire({
        icon: 'success',
        title: 'Password Reset',
        text: 'You can now log in with your new password.',
        background: '#0E2A43',   // navy
        color: '#F4F8F9',        // white text
        confirmButtonColor: '#5BA0BC', // sky blue
      });
    
      localStorage.removeItem("adminEmail");
      navigate("/");
    
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: err.message,
        background: '#0E2A43',   // navy
        color: '#C4D0D6',        // soft gray error text
        confirmButtonColor: '#5BA0BC',
      });
    }
  };

  return (
    <div className={forgetpwdstyle.forgetContainer}>
      <h2>Reset Password</h2>
      <form className={forgetpwdstyle.forgetForm} onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};
