
import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { AdminLayout } from "./Components/admin/layout/AdminLayout";
import { AdminLogin } from "./Components/AdminLogin";
import Users from "./pages/users/Users";

import Dashboard from "./pages/dashboard/Dashboard";
import { AdminProfile } from "./Components/AdminProfile";
import { AdminUpdate } from "./Components/AdminUpdate";
import { AdminChangePassword } from "./Components/AdminChangePassword";
import { AdminForgetpwd } from "./Components/AdminForgetpwd";
import { AdminVerifyOTP } from "./Components/AdminVerifyOTP";
import { AdminResetPassword } from "./Components/AdminResetPassword";
import { ReportFetch } from "./Components/ReportFetch";
import { ReportClosed } from "./Components/ReportClosed";
import { ReportStatus } from "./Components/ReportStatus";
import Reports from "./pages/reports/Reports";
import Employees from "./pages/Employees/Employees";


function App() {
  const [loading, setLoading] = useState(true);

  // Show loader on initial page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);



  // Loader HTML
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>

<Routes>

  {/* Login */}
  <Route path="/" element={<AdminLogin />} />

  <Route path="/profile-update" element={<AdminUpdate />} />
  <Route path="/forget-password" element={<AdminForgetpwd />} />
  <Route path="/verify-otp" element={<AdminVerifyOTP />} />
  <Route path="/reset-password" element={<AdminResetPassword />} />

  {/* Admin Layout */}
    <Route element={<AdminLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/users" element={<Users />} />
    <Route path="/employees" element={<Employees />} />
    <Route path="/reports" element={<Reports />} />

    <Route path="/profile" element={<AdminProfile />} />
    <Route path="/change-password" element={<AdminChangePassword />} />

<Route path="/user-fetch" element={<Navigate to="/users" replace />} />

<Route path="/user-delete" element={<Navigate to="/users" replace />} />

<Route path="/user-activedeactive" element={<Navigate to="/users" replace />} />


    <Route path="/report-fetch" element={<ReportFetch />} />
    <Route path="/report-closed" element={<ReportClosed />} />
    <Route path="/report-update" element={<ReportStatus />} />
    

    

  </Route>

</Routes>

    </>
  );
}

export default App;