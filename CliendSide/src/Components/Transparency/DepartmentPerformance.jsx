import React from "react";
import {
    FiTool,
    FiChevronRight,
    FiTrendingUp,
} from "react-icons/fi";

import styles from "./DepartmentPerformance.module.css";

const DepartmentPerformance = ({
    departments = [],
    selectedDepartment,
    onDepartmentHover = () => {},
    onDepartmentLeave = () => {},
}) => {

    return (
        <section className={styles.container}>

            <div className={styles.header}>
                <div>
                    <h2>Department Performance</h2>

                    <p>
                        Complaint distribution across government departments.
                    </p>
                </div>
            </div>

            <div className={styles.list}>

                {departments.map((department, index) => {

                    const isActive =
                        selectedDepartment?.department ===
                        department.department;

                    return (

                        <div
                            key={department.department}
                            className={`${styles.card} ${
                                isActive ? styles.active : ""
                            }`}
                            onMouseEnter={() =>
                                onDepartmentHover(department)
                            }
                            onMouseLeave={onDepartmentLeave}
                        >

                            <div className={styles.rank}>
                                #{index + 1}
                            </div>

                            <div className={styles.content}>

                                <div className={styles.topRow}>

                                    <div className={styles.department}>
                                        <FiTool />
                                        <span>{department.department}</span>
                                    </div>

                                    <FiChevronRight className={styles.arrow} />

                                </div>

                                <div className={styles.stats}>

                                    <div>
                                        <strong>{department.total}</strong>
                                        <span>Complaints</span>
                                    </div>

                                    <div>
                                        <strong>{department.resolutionRate}%</strong>
                                        <span>Resolved</span>
                                    </div>

                                <div>
                                    <strong>
                                        {department.averageDays == null
                                            ? "—"
                                            : department.averageDays < 1
                                                ? "< 1 Day"
                                                : `${department.averageDays} Days`}
                                    </strong>

                                    <span>Avg Days</span>
                                </div>

                                </div>

                                <div className={styles.progress}>

                                    <div
                                        className={styles.progressFill}
                                        style={{
                                            width: `${department.resolutionRate}%`,
                                        }}
                                    />

                                </div>

                                <div className={styles.footer}>
                                    <FiTrendingUp />

                                    <span>
                                        Resolution Rate {department.resolutionRate}%
                                    </span>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>
    );

};

export default DepartmentPerformance;