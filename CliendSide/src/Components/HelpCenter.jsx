import React from "react";
import HelpCentercss from "./HelpCenter.module.css";
import { Link } from "react-router-dom";

export const HelpCenter = () => {
  return (
    <div className={HelpCentercss.helpContainer}>
      <h1 className={HelpCentercss.title}>Help Center</h1>
      <p className={HelpCentercss.subText}>
        We're here to assist you. Browse through common help topics or reach out to our support team.
      </p>

      <div className={HelpCentercss.grid}>
        <div className={HelpCentercss.card}>
          <h2 className={HelpCentercss.cardTitle}>Account Issues</h2>
          <ul className={HelpCentercss.list}>
            <li>Reset your password</li>
            <li>Update profile details</li>
            <li>Fix login or verification problems</li>
          </ul>
        </div>

        <div className={HelpCentercss.card}>
          <h2 className={HelpCentercss.cardTitle}>Orders & Services</h2>
          <ul className={HelpCentercss.list}>
            <li>Track your order progress</li>
            <li>Modify or cancel an order</li>
            <li>Service booking assistance</li>
          </ul>
        </div>

        <div className={HelpCentercss.card}>
          <h2 className={HelpCentercss.cardTitle}>Billing & Payments</h2>
          <ul className={HelpCentercss.list}>
            <li>Understand payment methods</li>
            <li>Refund & invoice support</li>
            <li>Fix payment failures</li>
          </ul>
        </div>

        <div className={HelpCentercss.card}>
          <h2 className={HelpCentercss.cardTitle}>Technical Support</h2>
          <ul className={HelpCentercss.list}>
            <li>Report bugs or errors</li>
            <li>Website & app troubleshooting</li>
            <li>Connectivity issues</li>
          </ul>
        </div>
      </div>

      <div className={HelpCentercss.contactSection}>
        <h2 className={HelpCentercss.contactTitle}>Need More Help?</h2>
        <p className={HelpCentercss.contactText}>
          Contact our support team anytime — we're available 24/7 to assist you.
        </p>
        <Link to="/contact" className={HelpCentercss.contactButton}>Contact Support</Link>
      </div>
    </div>
  );
};