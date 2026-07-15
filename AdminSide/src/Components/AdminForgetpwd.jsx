import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import forgetpwdstyle from './AdminForgetpwd.module.css';

export const AdminForgetpwd = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  useEffect(() => {
    if (!email) {
      setEmailChecked(false);
      return;
    }

    setCheckingEmail(true);
    const timeout = setTimeout(() => {
      fetch("http://localhost:5000/api/admin/check-admin-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setEmailChecked(data.exists);
          setCheckingEmail(false);
        })
        .catch(() => {
          setEmailChecked(false);
          setCheckingEmail(false);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [email]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/admin/forgot-password/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
    
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: data.message,
        background: '#0E2A43',     // dark navy
        color: '#F4F8F9',          // light white text
        confirmButtonColor: '#5BA0BC', // sky blue button
      });
    
      localStorage.setItem("adminEmail", email);
      navigate("/verify-otp");
    
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        background: '#0E2A43',    // same navy
        color: '#C4D0D6',         // soft gray error text
        confirmButtonColor: '#5BA0BC', // consistent theme
      });
    }
  };

  return (
    <div className={forgetpwdstyle.forgetContainer}>
      <h2>Forgot Password</h2>
      <p>Enter your registered email to receive a password reset OTP.</p>
      <form className={forgetpwdstyle.forgetForm} onSubmit={handleSendOTP}>
        <input
          type="email"
          placeholder="Enter your Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {checkingEmail && <p>Checking email...</p>}
        {!checkingEmail && emailChecked && <p className={forgetpwdstyle.success}>✓ Email is registered</p>}
        {!checkingEmail && !emailChecked && email && <p className={forgetpwdstyle.error}>Email is not registered</p>}
        <button type="submit" disabled={!emailChecked}>Send OTP</button>
      </form>
    </div>
  );
};
