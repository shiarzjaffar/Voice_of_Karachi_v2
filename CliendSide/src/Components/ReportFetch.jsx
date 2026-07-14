import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReportFetchcss from "./ReportFetch.module.css";

const swalTheme = {
  background: "#006A4E",
  color: "#fff",
};

export const ReportFetch = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [addressMap, setAddressMap] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const openPreview = (images, index) => {
    setPreviewImages(images);
    setCurrentIndex(index);
  };

  const closePreview = () => {
    setPreviewImages([]);
    setCurrentIndex(0);
  };

  const navigate = useNavigate();
  const handleViewDetails = (report) => {
  navigate(`/report-tracking/${report._id}`);
};

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check-session",
          { withCredentials: true }
        );

        if (response.data.loggedIn) {
          setUser({ _id: response.data.userId });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "You need to login to view your reports.",
            ...swalTheme,
            timer: 3000,
            showConfirmButton: false,
          });
          navigate("/login");
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Session Error",
          text: "Please login again.",
          ...swalTheme,
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    };

    fetchUserSession();
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewImages.length) return;

      if (e.key === "Escape") closePreview();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImages, currentIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === previewImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? previewImages.length - 1 : prev - 1
    );
  };

  let touchStartX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) nextImage();
    if (diff < -50) prevImage();
  };

  useEffect(() => {
    if (!user?._id) return;

    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/report/user/${user._id}`,
          { withCredentials: true }
        );
        setReports(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user?._id]);

  const getAddressFromCoords = async (lat, lng) => {
    const key = `${lat},${lng}`;
    if (addressMap[key]) return addressMap[key];

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat,
            lon: lng,
            format: "json",
          },
        }
      );

      const address = res.data.display_name || "Address not found";
      setAddressMap(prev => ({ ...prev, [key]: address }));
      return address;
    } catch {
      return "Unable to fetch address";
    }
  };

  const resolveLocation = (report) => {
    if (!report.location) return "Location not available";

    // Object: { lat, lng }
    if (typeof report.location === "object") {
      const { lat, lng } = report.location;
      getAddressFromCoords(lat, lng);
      return addressMap[`${lat},${lng}`] || "Fetching address...";
    }

    // String: "lat,lng"
    if (typeof report.location === "string" && report.location.includes(",")) {
      const [lat, lng] = report.location.split(",").map(v => v.trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        getAddressFromCoords(lat, lng);
        return addressMap[`${lat},${lng}`] || "Fetching address...";
      }
    }
    return report.location;
  };

  const totalReports = reports.length;


const pendingReports = reports.filter(
  (r) => r.status === "Pending"
).length;

const filteredReports = reports.filter((report) => {

  const matchesSearch =
    report.title.toLowerCase().includes(search.toLowerCase()) ||
    report.category.toLowerCase().includes(search.toLowerCase()) ||
    report._id.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    report.status === statusFilter;

  return matchesSearch && matchesStatus;

});

const assignedReports = reports.filter(
  (r) => r.status === "Assigned"
).length;

const progressReports = reports.filter(
  (r) =>
    r.status === "In Progress" ||
    r.status === "Under Review"
).length;

const resolvedReports = reports.filter(
  (r) =>
    r.status === "Resolved" ||
    r.status === "Closed"
).length;

  if (loading) {
    return <div className={ReportFetchcss.loader}>Loading reports…</div>;
  }

  return (
    <div className={ReportFetchcss.page}>
      <div className={ReportFetchcss.hero}>

    <span className={ReportFetchcss.breadcrumb}>
        Dashboard / Report Tracking
    </span>

    <h1>
        Report Tracking
    </h1>

    <p>
        Track the progress of your submitted complaints, monitor department updates, and stay informed throughout the resolution process.
    </p>

</div>

<div className={ReportFetchcss.statsGrid}>

  <div className={ReportFetchcss.statCard}>
    <h2>{totalReports}</h2>
    <p>Total Reports</p>
  </div>

  <div className={ReportFetchcss.statCard}>
    <h2>{pendingReports}</h2>
    <p>Pending</p>
  </div>

  <div className={ReportFetchcss.statCard}>
    <h2>{assignedReports}</h2>
    <p>Assigned</p>
  </div>

  <div className={ReportFetchcss.statCard}>
    <h2>{progressReports}</h2>
    <p>In Progress</p>
  </div>

  <div className={ReportFetchcss.statCard}>
    <h2>{resolvedReports}</h2>
    <p>Resolved</p>
  </div>

</div>

<div className={ReportFetchcss.searchCard}>

  <input
    type="text"
    className={ReportFetchcss.searchInput}
    placeholder="Search by title, category or tracking ID..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

</div>

<div className={ReportFetchcss.filterBar}>

  {[
    "All",
    "Pending",
    "Assigned",
    "In Progress",
    "Resolved",
    "Closed",
  ].map((status) => (

    <button
      key={status}
      type="button"
      className={`${ReportFetchcss.filterButton} ${
        statusFilter === status
          ? ReportFetchcss.activeFilter
          : ""
      }`}
      onClick={() => setStatusFilter(status)}
    >
      {status}
    </button>

  ))}

</div>

      {reports.length === 0 ? (
<div className={ReportFetchcss.emptyState}>

  <h2>No Reports Found</h2>

  <p>
    We couldn't find any complaints matching your search or filter.
  </p>

</div>
      ) : (
       <div className={ReportFetchcss.reportGrid}>

  {filteredReports.map((report) => (

    <div
      key={report._id}
      className={ReportFetchcss.reportCard}
    >

      <div className={ReportFetchcss.reportHeader}>

        <div>

          <h2 className={ReportFetchcss.reportTitle}>
            {report.title}
          </h2>

          <div className={ReportFetchcss.reportId}>
            #{report._id.slice(-8).toUpperCase()}
          </div>

        </div>

        <span
          className={`${ReportFetchcss.statusBadge}
          ${
            report.status === "Pending"
              ? ReportFetchcss.pending
              : report.status === "Assigned"
              ? ReportFetchcss.assigned
              : report.status === "In Progress"
              ? ReportFetchcss.inProgress
              : report.status === "Resolved"
              ? ReportFetchcss.resolved
              : ReportFetchcss.closed
          }`}
        >
          {report.status}
        </span>

      </div>

      <div className={ReportFetchcss.reportBody}>

        <div className={ReportFetchcss.infoRow}>
          <span className={ReportFetchcss.infoLabel}>Category</span>
          <span className={ReportFetchcss.infoValue}>
            {report.category}
          </span>
        </div>

        <div className={ReportFetchcss.infoRow}>
          <span className={ReportFetchcss.infoLabel}>Location</span>
          <span className={ReportFetchcss.infoValue}>
            {resolveLocation(report)}
          </span>
        </div>

        <div className={ReportFetchcss.infoRow}>
          <span className={ReportFetchcss.infoLabel}>Submitted</span>
          <span className={ReportFetchcss.infoValue}>
            {new Date(report.reportSubmittedAt).toLocaleDateString()}
          </span>
        </div>

        {report.feedback && (

          <div className={ReportFetchcss.feedbackCard}>

            <div className={ReportFetchcss.feedbackTitle}>
              Department Feedback
            </div>

            <div className={ReportFetchcss.feedbackText}>
              {report.feedback}
            </div>

          </div>

        )}

        {report.photos?.length > 0 && (

          <div className={ReportFetchcss.imageGrid}>

            {report.photos.map((photo, index) => (

              <div
                key={index}
                className={ReportFetchcss.imageItem}
              >

                <img
                  src={`http://localhost:5000/uploads/${photo}`}
                  alt=""
                  onClick={() =>
                    openPreview(
                      report.photos.map(
                        (p) =>
                          `http://localhost:5000/uploads/${p}`
                      ),
                      index
                    )
                  }
                />

              </div>

            ))}

          </div>

        )}

        <button
          className={ReportFetchcss.actionButton}
          onClick={() => handleViewDetails(report)}
        >
          View Timeline
        </button>

      </div>

    </div>

  ))}

</div>
      )}
      {previewImages.length > 0 && (
        <div
          className={ReportFetchcss.previewOverlay}
          onClick={closePreview}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className={ReportFetchcss.prevBtn}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          
          <img
            src={previewImages[currentIndex]}
            alt="Preview"
            className={ReportFetchcss.previewImage}
            onClick={(e) => e.stopPropagation()}
          />
      
          <button
            className={ReportFetchcss.nextBtn}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};