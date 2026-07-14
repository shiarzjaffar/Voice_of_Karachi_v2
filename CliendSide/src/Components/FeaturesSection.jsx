import React from "react";
import { FaMapMarkedAlt, FaChartLine, FaUsers, FaTools } from "react-icons/fa";
import FeaturesSectioncss from "./FeaturesSection.module.css";

export const FeaturesSection = () => {
  return (
    <section className={`${FeaturesSectioncss.features} ${FeaturesSectioncss.fadeInUp}`}>
      <div className={FeaturesSectioncss.featureCard}>
        <FaMapMarkedAlt className={FeaturesSectioncss.icon} />
        <h3>📍 Report Issues</h3>
        <p>Report street, building, or community issues instantly.</p>
      </div>

      <div className={FeaturesSectioncss.featureCard}>
        <FaChartLine className={FeaturesSectioncss.icon} />
        <h3>📊 Track Reports</h3>
        <p>Track the status of your reports in real time.</p>
      </div>

      <div className={FeaturesSectioncss.featureCard}>
        <FaUsers className={FeaturesSectioncss.icon} />
        <h3>🤝 Community Support</h3>
        <p>Connect with support teams and improve your neighborhood.</p>
      </div>

      <div className={FeaturesSectioncss.featureCard}>
        <FaTools className={FeaturesSectioncss.icon} />
        <h3>🛠 Maintenance Services</h3>
        <p>Get quick response from professional maintenance teams.</p>
      </div>
    </section>
  );
};