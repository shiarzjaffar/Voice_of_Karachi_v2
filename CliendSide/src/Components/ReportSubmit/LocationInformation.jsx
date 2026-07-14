import React, { useState, useEffect } from "react";
import styles from "./LocationInformation.module.css";
import MapPicker from "./MapPicker";
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";
import { reverseGeocode } from "../../utils/geocoding";
import { searchLocation } from "../../utils/locationSearch";


const LocationInformation = ({

    
    
  formData,
  setFormData,
  getCurrentLocation,
  
}) => {

const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const [loadingSearch, setLoadingSearch] = useState(false);


useEffect(() => {
  const timer = setTimeout(async () => {
    if (search.trim().length < 3) {
      setResults([]);
      return;
    }

    setLoadingSearch(true);

    const data = await searchLocation(search);

    setResults(data);

    setLoadingSearch(false);
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

  return (
  <div className={styles.card}>

    {/* ============================
        Header
    ============================ */}

    <div className={styles.cardHeader}>
      <h2>📍 Location Information</h2>

      <p>
        Select the exact location where the issue exists.
      </p>
    </div>

    {/* ============================
        Search Section
    ============================ */}

    <div className={styles.section}>

      <label className={styles.sectionLabel}>
        Search by Address, Area or Landmark
      </label>

      <div className={styles.searchBox}>

        <input
          type="text"
          value={search}
          className={styles.searchInput}
          placeholder="Search location..."
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {results.length > 0 && (

        <div className={styles.searchResults}>

          {results.map((place) => (

            <div
              key={place.place_id}
              className={styles.searchItem}
            >

              <div className={styles.searchTitle}>
                📍 {place.display_name.split(",")[0]}
              </div>

              <div className={styles.searchSubtitle}>
                {place.display_name}
              </div>

            </div>

          ))}

        </div>

      )}

    </div>

    {/* ============================
        Divider
    ============================ */}

    <div className={styles.divider}>
      <span>OR</span>
    </div>

    {/* ============================
        GPS Card
    ============================ */}

    <div
      className={styles.gpsCard}
      onClick={getCurrentLocation}
    >

      <div className={styles.gpsIcon}>
        📡
      </div>

      <div>

        <h3>Detect My Current Location</h3>

        <p>
          Use your device GPS to automatically
          detect the exact location.
        </p>

      </div>

    </div>

    {/* ============================
        Map
    ============================ */}

    <div className={styles.mapSection}>

      <h3>
        🗺 Interactive Map
      </h3>

      <MapPicker
        position={
          formData.latitude !== null &&
          formData.longitude !== null
            ? {
                lat: formData.latitude,
                lng: formData.longitude,
              }
            : null
        }
        onLocationSelect={async (latlng) => {

          const result = await reverseGeocode(
            latlng.lat,
            latlng.lng
          );

          setFormData((prev) => ({
            ...prev,
            latitude: latlng.lat,
            longitude: latlng.lng,
            location: result.address,
            area: result.area,
          }));

        }}
      />

    </div>

    {/* ============================
        Selected Location
    ============================ */}

    {formData.location && (

      <div className={styles.locationCard}>

        <h3>
          ✅ Selected Location
        </h3>

        <div className={styles.locationItem}>

          <strong>📍 Address</strong>

          <span>
            {formData.location}
          </span>

        </div>

        <div className={styles.locationItem}>

          <strong>🏙 Area</strong>

          <span>
            {formData.area || "-"}
          </span>

        </div>

        <div className={styles.locationItem}>

          <strong>🌍 Coordinates</strong>

          <span>

            {formData.latitude?.toFixed(5)}

            {" , "}

            {formData.longitude?.toFixed(5)}

          </span>

        </div>

      </div>

    )}

  </div>
);
};

export default LocationInformation;