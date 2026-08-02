import React from "react";
import styles from "./DistrictComparison.module.css";

const DistrictComparison = ({
    data = [],
    totalReports = 0,
}) => {

    const maxReports = Math.max(
        ...data.map(item => item.reports),
        1
    );

    const getMedal = (index) => {
        switch (index) {
            case 0:
                return "🥇";
            case 1:
                return "🥈";
            case 2:
                return "🥉";
            default:
                return `#${index + 1}`;
        }
    };

    return (
        <section className={styles.container}>

            <div className={styles.header}>
                <h2>District Comparison</h2>

                <p>
                    Complaint distribution across Karachi administrative districts.
                </p>
            </div>

            <div className={styles.list}>

                {data.map((district, index) => {

                    const percentage =
                        totalReports === 0
                            ? 0
                            : (
                                  (district.reports / totalReports) *
                                  100
                              ).toFixed(1);

                    return (

                        <div
                            key={district.district}
                            className={styles.card}
                        >

                            <div className={styles.topRow}>

                                <span className={styles.rank}>
                                    {getMedal(index)}
                                </span>

                                <div className={styles.info}>

                                    <h3>{district.district}</h3>

                                    <span>
                                        {district.reports} Complaints • {percentage}%
                                    </span>

                                </div>

                                <strong className={styles.count}>
                                    {district.reports}
                                </strong>

                            </div>

                            <div className={styles.progress}>

                                <div
                                    className={styles.progressFill}
                                    style={{
                                        width: `${
                                            (district.reports / maxReports) *
                                            100
                                        }%`,
                                    }}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>
    );
};

export default DistrictComparison;