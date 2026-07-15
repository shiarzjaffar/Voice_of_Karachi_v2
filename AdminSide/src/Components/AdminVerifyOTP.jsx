import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import forgetpwdstyle from './AdminForgetpwd.module.css';

export const AdminVerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const email = localStorage.getItem("adminEmail");

  const verifyOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/forgot-password/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
    
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
    
      Swal.fire({
        icon: 'success',
        title: 'Verified',
        text: 'OTP verified successfully.',
        background: '#0E2A43', // dark-navy-blue
        color: '#F4F8F9',      // white-light
      });
    
      navigate("/reset-password");
    
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: err.message,
        background: '#0E2A43', // dark-navy-blue
        color: '#5BA0BC',      // bright-sky-blue
      });
    }
  };

  return (
    <div className={forgetpwdstyle.forgetContainer}>
      <h2>Verify OTP</h2>
      <p>Enter the OTP sent to your email</p>
      <form className={forgetpwdstyle.forgetForm} onSubmit={verifyOTP}>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
};
