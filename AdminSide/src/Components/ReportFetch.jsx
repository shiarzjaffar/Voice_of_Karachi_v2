import React, { useEffect, useState } from "react";
import PageHeader from "./admin/ui/PageHeader/PageHeader";
import DataCard from "./admin/ui/DataCard/DataCard";
import StatusBadge from "./admin/common/StatusBadge";

import {
  FileText,
  Search,
} from "lucide-react";
import axios from "axios";
import ReportFetchcss from "./ReportFetch.module.css";

export const ReportFetch = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/report/fetch");
        setReports(res.data);
        setFilteredReports(res.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // Search filter
  useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = reports.filter(
      (item) =>
        item.category?.toLowerCase().includes(lower) ||
        item.description?.toLowerCase().includes(lower) ||
        item.userId?.fullname?.toLowerCase().includes(lower)
    );
    setFilteredReports(filtered);
    setCurrentPage(1);
  }, [search, reports]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirst, indexOfLast);
  const totalReports = reports.length;

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Lightbox functions
  const openLightbox = (images, index) => {
    setLightboxImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === lightboxImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className={ReportFetchcss.loaderContainer}>
        <div className={ReportFetchcss.loader}></div>
      </div>
    );
  }


  return (
  <div className={ReportFetchcss.container}>

    <PageHeader
      title="Report Management"
      subtitle="View and manage all citizen reports"
    />

    <div className={ReportFetchcss.statsCard}>

      <div className={ReportFetchcss.statsIcon}>
        <FileText size={30} />
      </div>

      <div>
        <span>Total Reports</span>
        <h2>{totalReports}</h2>
      </div>

    </div>

    <DataCard>

      <div className={ReportFetchcss.searchWrapper}>

        <Search size={18} />

        <input
          type="text"
          className={ReportFetchcss.searchInput}
          placeholder="Search by category, description or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className={ReportFetchcss.tableWrapper}>

        <table className={ReportFetchcss.reportTable}>

          <thead>

            <tr>

              <th>User</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Submitted</th>
              <th>Closed</th>
              <th>Images</th>

            </tr>

          </thead>

        

          <tbody>


            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                  No reports found
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr key={item._id}>
                  <td>
  <div className={ReportFetchcss.userCell}>
    <strong>{item.userId?.fullname || "Unknown"}</strong>
  </div>
</td>
                  <td className={ReportFetchcss.emailCell}>
  {item.userId?.email || "N/A"}
</td>
                  <td>{item.userId?.phone || "N/A"}</td>
                  <td>
  <span className={ReportFetchcss.categoryBadge}>
    {item.category || "N/A"}
  </span>
</td>
                  <td className={ReportFetchcss.descriptionCell}>
  {item.description || "N/A"}
</td>
                  <td className={ReportFetchcss.locationCell}>
  {item.location || "N/A"}
</td>
<td>
  <StatusBadge status={item.status || "Pending"} />
</td>
                  <td className={ReportFetchcss.feedbackCell}>
  {item.feedback || "N/A"}
</td>
                  <td className={ReportFetchcss.dateCell}>
  {new Date(item.createdAt).toLocaleString()}
</td>
<td className={ReportFetchcss.dateCell}>
  {item.status === "Closed" && item.reportClosedAt
    ? new Date(item.reportClosedAt).toLocaleString()
    : "N/A"}
</td>
<td>
  {item.photos?.length > 0 ? (
    <div className={ReportFetchcss.photosContainer}>
      {item.photos.map((photo, index) => (
        <img
          key={index}
          src={`http://localhost:5000/uploads/${photo}`}
          alt={`Report ${index + 1}`}
          className={ReportFetchcss.thumbnail}
          onClick={() => openLightbox(item.photos, index)}
        />
      ))}
    </div>
  ) : (
    <span className={ReportFetchcss.noImage}>
      No Image
    </span>
  )}
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredReports.length > itemsPerPage && (
        <div className={ReportFetchcss.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            ⬅ Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next ➡
          </button>
        </div>
      )}

      </DataCard>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className={ReportFetchcss.lightboxOverlay} onClick={closeLightbox}>
          <button
            className={ReportFetchcss.lightboxClose}
            onClick={closeLightbox}
          >
            ✕
          </button>

          <button
            className={ReportFetchcss.lightboxPrev}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <img
            src={`http://localhost:5000/uploads/${lightboxImages[currentImageIndex]}`}
            className={ReportFetchcss.lightboxImage}
            onClick={(e) => e.stopPropagation()}
            alt="Full View"
          />

          <button
            className={ReportFetchcss.lightboxNext}
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