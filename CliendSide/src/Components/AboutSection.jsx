import React from "react";
import AboutSectioncss from "./AboutSection.module.css";

export const AboutSection = () => {
  return (
    <section className={AboutSectioncss.about}>

      <div className={AboutSectioncss.heading}>
        <span className={AboutSectioncss.badge}>
          🇵🇰 ABOUT VOICE OF KARACHI
        </span>

        <h2>
          Empowering Citizens.
          <br />
          Improving Karachi.
        </h2>

        <p>
          Voice of Karachi is a digital civic engagement platform that
          enables citizens to report public issues directly to the relevant
          government departments. Our mission is to improve transparency,
          accountability and service delivery through technology.
        </p>
      </div>

      <div className={AboutSectioncss.steps}>

        <div className={AboutSectioncss.card}>
          <div className={AboutSectioncss.icon}>📍</div>
          <h3>Report Issue</h3>
          <p>
            Submit complaints with photos,
            location and details.
          </p>
        </div>

        <div className={AboutSectioncss.card}>
          <div className={AboutSectioncss.icon}>🏛</div>
          <h3>Department Review</h3>
          <p>
            Complaints are assigned to
            the relevant department.
          </p>
        </div>

        <div className={AboutSectioncss.card}>
          <div className={AboutSectioncss.icon}>🛠</div>
          <h3>Issue Resolution</h3>
          <p>
            Departments update progress
            until the issue is resolved.
          </p>
        </div>

        <div className={AboutSectioncss.card}>
          <div className={AboutSectioncss.icon}>✅</div>
          <h3>Citizen Feedback</h3>
          <p>
            Citizens verify the work
            and close the complaint.
          </p>
        </div>

      </div>

    </section>
  );
};