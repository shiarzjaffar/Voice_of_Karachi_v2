import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import { AdminLogin } from "./Components/AdminLogin";
import { Sidebar } from "./Components/Sidebar";
import { Footer } from "./Components/Footer";
import { UserFetch } from "./Components/UserFetch";
import { UserDelete } from "./Components/UserDelete";
import { UserActiveDeactive } from "./Components/UserActiveDeactive";
import { ViewMessage } from "./Components/ViewMessage";
import { DeleteMessage } from "./Components/DeleteMessage";
import { AdminDashboard } from "./Components/AdminDashboard";
import { AdminProfile } from "./Components/AdminProfile";
import { AdminUpdate } from "./Components/AdminUpdate";
import { AdminChangePassword } from "./Components/AdminChangePassword";
import { AdminForgetpwd } from "./Components/AdminForgetpwd";
import { AdminVerifyOTP } from "./Components/AdminVerifyOTP";
import { AdminResetPassword } from "./Components/AdminResetPassword";
import { ReportFetch } from "./Components/ReportFetch";
import { ReportClosed } from "./Components/ReportClosed";
import { ReportStatus } from "./Components/ReportStatus";

function App() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // Show loader on initial page load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Hide Sidebar + Footer on special pages
  const hideLayout =
    location.pathname === "/" ||
    location.pathname === "/profile-update" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/forget-password";

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
      {!hideLayout && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/user-fetch" element={<UserFetch />} />
        <Route path="/user-delete" element={<UserDelete />} />
        <Route path="/user-activedeactive" element={<UserActiveDeactive />} />
        <Route path="/View-Message" element={<ViewMessage />} />
        <Route path="/Delete-Message" element={<DeleteMessage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/profile-update" element={<AdminUpdate />} />
        <Route path="/change-password" element={<AdminChangePassword />} />
        <Route path="/forget-password" element={<AdminForgetpwd />} />
        <Route path="/verify-otp" element={<AdminVerifyOTP />} />
        <Route path="/reset-password" element={<AdminResetPassword />} />
        <Route path="/report-fetch" element={<ReportFetch />} />
        <Route path="/report-closed" element={<ReportClosed />} />
        <Route path="/report-update" element={<ReportStatus />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;