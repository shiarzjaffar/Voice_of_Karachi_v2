import React from "react";
import styles from "./RecentReports.module.css";

const RecentReports = ({
    reports = [],
}) => {

    const getStatusClass = (status) => {

        switch (status) {

            case "Pending":
                return styles.pending;

            case "In Progress":
                return styles.inProgress;

            case "Closed":
                return styles.resolved;

            default:
                return "";

        }

    };

    return (

        <section className={styles.container}>

            <div className={styles.header}>

                <h2>Recent Public Reports</h2>

                <p>
                    Latest complaints submitted by citizens across Karachi.
                </p>

            </div>

            <div className={styles.timeline}>

                {reports.map((report) => (

                    <article
                        key={report._id}
                        className={styles.card}
                    >

                        <div className={styles.timelineDot} />

                        <div className={styles.content}>

                            <h3>{report.title}</h3>

                            <div className={styles.meta}>

                                <span>{report.category}</span>

                                <span>{report.location}</span>

                            </div>

                            <div className={styles.footer}>

                                <span
                                    className={`${styles.badge} ${getStatusClass(report.status)}`}
                                >
                                    {report.status}
                                </span>

                                <small>
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </small>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

};

export default RecentReports;