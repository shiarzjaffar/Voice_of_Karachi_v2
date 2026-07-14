import React, { useState, useEffect } from "react";
import ReportSubmitcss from "./ReportSubmit.module.css";
import {
  FaFileUpload,
  FaMapMarkerAlt,
  FaClipboardList,
  FaTags,
  FaPaperPlane,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import IssueInformation from "./ReportSubmit/IssueInformation";
import LocationInformation from "./ReportSubmit/LocationInformation";
import { reverseGeocode } from "../utils/geocoding";
import ComplaintDetails from "./ReportSubmit/ComplaintDetails";
import EvidenceUpload from "./ReportSubmit/EvidenceUpload";
import ReviewSubmit from "./ReportSubmit/ReviewSubmit";

const CATEGORY_DETAILS = {
  "Solid Waste": {
    department: "Solid Waste Management",
    response: "24–48 Hours",
  },
  "Roads & Infrastructure": {
    department: "Road Maintenance Department",
    response: "3–5 Working Days",
  },
  "Street Lights": {
    department: "Electrical Maintenance",
    response: "48–72 Hours",
  },
  "Water Supply": {
    department: "Water Board",
    response: "24–72 Hours",
  },
  "Sewerage & Drainage": {
    department: "Sewerage Department",
    response: "2–4 Working Days",
  },
  "Parks & Green Areas": {
    department: "Parks Department",
    response: "5–7 Working Days",
  },
  Encroachments: {
    department: "Anti-Encroachment Cell",
    response: "7–10 Working Days",
  },
  "Other Civic Issue": {
    department: "Municipal Office",
    response: "To Be Assigned",
  },
};


export const ReportSubmit = () => {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [user, setUser] = useState(null);
 const [formData, setFormData] = useState({
  title: "",
  category: "",
  description: "",
  photos: [],
  location: "",
  area: "",
  latitude: null,
  longitude: null,
});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

const swalTheme = {
  background: "#FFFFFF",
  color: "#111827",
  confirmButtonColor: "#006A4E",
};


  const selectedCategory = CATEGORY_DETAILS[formData.category];

const assignedDepartment =
  selectedCategory?.department || "Will be assigned automatically";

const estimatedResponse =
  selectedCategory?.response || "--";

  // 📸 Handle multiple file selection with max 10 images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Limit Exceeded",
        text: "You can upload a maximum of 10 images.",
        ...swalTheme,
      });
      return;
    }

    setFormData({
      ...formData,
      photos: files,
    });
  };

  // ✅ Check user session from backend
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-session", {
          withCredentials: true,
        });
        if (response.data.loggedIn) {
          setUser({ _id: response.data.userId });
        } else {
          Swal.fire({
            icon: "warning",
            title: "⚠️ Login First",
            text: "You need to login to submit a report.",
            ...swalTheme,
          });
          navigate("/login");
        }
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "⚠️ Error",
          text: "Could not verify session. Please login again.",
          ...swalTheme,
        });
        navigate("/login");
      }
    };

    fetchUserSession();
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => setShake(false), 400);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      return Swal.fire({
        icon: "error",
        title: "❌ Geolocation Not Supported",
        text: "Your browser does not support geolocation.",
        ...swalTheme,
      });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
  const { latitude, longitude } = position.coords;

  reverseGeocode(latitude, longitude).then((result) => {
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
      location: result.address,
      area: result.area,
    }));
  });
},
      (error) => {
        Swal.fire({
          icon: "error",
          title: "❌ Unable to Get Location",
          text: error.message,
          ...swalTheme,
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      return Swal.fire({
        icon: "warning",
        title: "⚠️ Login First",
        text: "You need to login before submitting a report.",
        ...swalTheme,
      });
    }

    // ❗ Extra safety check (someone might bypass file selector)
    if (formData.photos.length > 10) {
      return Swal.fire({
        icon: "warning",
        title: "⚠️ Too Many Images",
        text: "Maximum 10 images can be uploaded.",
        ...swalTheme,
      });
    }

    if (!formData.title || !formData.category || !formData.description || !formData.location) {
      triggerShake();
      return Swal.fire({
        icon: "warning",
        title: "⚠️ Missing Fields",
        text: "Please fill all required fields.",
        ...swalTheme,
      });
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("userId", user._id);
      fd.append("title", formData.title);
      fd.append("category", formData.category);
      fd.append("description", formData.description);
      fd.append("location", formData.location);
      fd.append("latitude", formData.latitude);
      fd.append("longitude", formData.longitude);

      // Append multiple photos
      formData.photos.forEach((photo) => {
        fd.append("photos", photo);
      });

      const res = await axios.post("http://localhost:5000/api/report/create", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "🎉 Report Submitted!",
        text: res.data.msg || "Your report has been successfully submitted.",
        ...swalTheme,
      });

      setFormData({
  title: "",
  category: "",
  description: "",
  photos: [],
  location: "",
  latitude: null,
  longitude: null,
});
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "❌ Submission Failed",
        text: error.response?.data?.msg || "Something went wrong. Please try again.",
        ...swalTheme,
      });
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className={ReportSubmitcss.page}>

    {/* Hero */}
    <div className={ReportSubmitcss.hero}>
      <span className={ReportSubmitcss.breadcrumb}>
        Dashboard / Report Complaint
      </span>

      <h1>Report a Civic Issue</h1>

      <p>
        Help improve your community by reporting civic issues.
        Your complaint will be forwarded to the appropriate department
        for review and action.
      </p>
    </div>

    <form
      className={`${ReportSubmitcss.reportForm} ${
        shake ? ReportSubmitcss.shake : ""
      }`}
      onSubmit={handleSubmit}
    >

      {/* =========================
          Issue Information
      ========================== */}

      <IssueInformation
    formData={formData}
    setFormData={setFormData}
    showOptions={showOptions}
    setShowOptions={setShowOptions}
    assignedDepartment={assignedDepartment}
    estimatedResponse={estimatedResponse}
    categoryDetails={CATEGORY_DETAILS}
/>

<LocationInformation
  formData={formData}
  setFormData={setFormData}
  getCurrentLocation={getCurrentLocation}
/>

<ComplaintDetails
    formData={formData}
    setFormData={setFormData}
/>

<EvidenceUpload
    formData={formData}
    setFormData={setFormData}
/>

<ReviewSubmit
    formData={formData}
    assignedDepartment={assignedDepartment}
    estimatedResponse={estimatedResponse}
    loading={loading}
/>

    </form>

  </div>
);
};