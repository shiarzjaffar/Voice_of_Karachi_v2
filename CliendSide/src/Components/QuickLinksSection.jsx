import React from "react";
import { Link } from "react-router-dom";
import QuickLinksSectioncss from "./QuickLinksSection.module.css";

export const QuickLinksSection = () => {
  return (
    <section className={QuickLinksSectioncss.featuredExpos}>
      <h2>Quick Links</h2>

      <div className={QuickLinksSectioncss.expoPreviewGrid}>
        <Link to="/about-us" className={QuickLinksSectioncss.expoPreviewCard}>
          <h3>About Us</h3>
          <p>Learn what Urban Fix stands for.</p>
        </Link>

        <Link to="/report-tracking" className={QuickLinksSectioncss.expoPreviewCard}>
          <h3>Tracking Reports</h3>
          <p>Monitor all your community issues.</p>
        </Link>

        <Link to="/services" className={QuickLinksSectioncss.expoPreviewCard}>
          <h3>Services</h3>
          <p>View all available Urban Fix features.</p>
        </Link>

        <Link to="/help-center" className={QuickLinksSectioncss.expoPreviewCard}>
          <h3>Help Center</h3>
          <p>Get help & support anytime.</p>
        </Link>
      </div>
    </section>
  );
}; 