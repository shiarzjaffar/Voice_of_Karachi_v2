import React from "react";
import Servicescss from "./Services.module.css";
import { FaRoad, FaDumpster, FaTools, FaRecycle, FaBroom, FaCity } from "react-icons/fa";

export const Services = () => {
  return (
    <div className={Servicescss.servicesContainer}>

      <h1 className={Servicescss.pageTitle}>Our Services</h1>

      <div className={Servicescss.servicesGrid}>

        <div className={Servicescss.card}>
          <FaRoad className={Servicescss.icon} />
          <h3>Road Maintenance</h3>
          <p>We ensure smooth, safe, and well-maintained streets for your city.</p>
        </div>

        <div className={Servicescss.card}>
          <FaDumpster className={Servicescss.icon} />
          <h3>Garbage Management</h3>
          <p>Efficient waste collection and disposal for cleaner communities.</p>
        </div>

        <div className={Servicescss.card}>
          <FaTools className={Servicescss.icon} />
          <h3>Repair & Fixing</h3>
          <p>Streetlights, sidewalks, potholes—UrbanFix takes care of it all.</p>
        </div>

        <div className={Servicescss.card}>
          <FaRecycle className={Servicescss.icon} />
          <h3>Recycling Services</h3>
          <p>Promoting sustainability with professional recycling solutions.</p>
        </div>

        <div className={Servicescss.card}>
          <FaBroom className={Servicescss.icon} />
          <h3>Street Cleaning</h3>
          <p>Daily and weekly cleaning operations to keep areas fresh and hygienic.</p>
        </div>

        <div className={Servicescss.card}>
          <FaCity className={Servicescss.icon} />
          <h3>Public Area Management</h3>
          <p>Park maintenance, block cleaning, and community area upkeep.</p>
        </div>

      </div>
    </div>
  );
};