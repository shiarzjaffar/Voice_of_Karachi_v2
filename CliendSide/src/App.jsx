import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import "./app.css";
import ReportTracking from "./Components/ReportTracking";
import ReportTimeline from "./Components/ReportTimeline/ReportTimeline";

// Lazy-loaded Components
const Home = lazy(() => import("./Components/Home").then(m => ({ default: m.Home })));
const Contact = lazy(() => import("./Components/Contact").then(m => ({ default: m.Contact })));
const SignUp = lazy(() => import("./Components/SignUp").then(m => ({ default: m.SignUp })));
const Login = lazy(() => import("./Components/Login").then(m => ({ default: m.Login })));
const Profile = lazy(() => import("./Components/Profile").then(m => ({ default: m.Profile })));
const UpdateProfile = lazy(() => import("./Components/UpdateProfile").then(m => ({ default: m.UpdateProfile })));
const ForgotPassword = lazy(() => import("./Components/ForgetPassword").then(m => ({ default: m.ForgetPassword })));
const ReportSubmit = lazy(() => import("./Components/ReportSubmit").then(m => ({ default: m.ReportSubmit })));
const ReportFetch = lazy(() => import("./Components/ReportFetch").then(m => ({ default: m.ReportFetch })));
const ChangePassword = lazy(() => import("./Components/ChangePassword").then(m => ({ default: m.ChangePassword })));
const Aboutus = lazy(() => import("./Components/Aboutus").then(m => ({ default: m.Aboutus })));
const Services = lazy(() => import("./Components/Services").then(m => ({ default: m.Services })));
const HelpCenter = lazy(() => import("./Components/HelpCenter").then(m => ({ default: m.HelpCenter })));
const Dashboard = lazy(() =>
  import("./Components/Dashboard/Dashboard")
);

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

const App = () => {
  const location = useLocation();

  // Hide Navbar only on password recovery pages
  const hideNavbarRoutes = [
    "/forgot-password",
    "/change-password",
  ];

  // Hide Footer on authentication pages
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/change-password",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/report-submit" element={<ReportSubmit />} />
          <Route path="/report-tracking" element={<ReportFetch />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report-tracking" element={<ReportTracking />} />
          <Route path="/report-tracking/:id" element={<ReportTimeline />} />
        </Routes>
      </Suspense>

      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default App;



