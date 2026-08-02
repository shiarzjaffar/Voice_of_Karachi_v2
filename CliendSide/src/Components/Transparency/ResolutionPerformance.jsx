import React from "react";
import styles from "./ResolutionPerformance.module.css";

const ResolutionPerformance = ({ data }) => {

    const metrics = [

        {
            id: 1,
            label: "Resolution Rate",
            value: `${data?.resolutionRate ?? 0}%`,
        },

        {
            id: 2,
            label: "Total Reports",
            value: (data?.total ?? 0).toLocaleString(),
        },

        {
            id: 3,
            label: "Closed Reports",
            value: (data?.resolved ?? 0).toLocaleString(),
        },

        {
            id: 4,
            label: "Pending Reports",
            value: (data?.pending ?? 0).toLocaleString(),
        },

        {
            id: 5,
            label: "In Progress",
            value: (data?.inProgress ?? 0).toLocaleString(),
        },

    ];

    return (

        <section className={styles.container}>

            <div className={styles.header}>

                <h2>Resolution Performance</h2>

                <p>
                    Monitor how efficiently complaints are handled across departments.
                </p>

            </div>

            <div className={styles.grid}>

                {metrics.map(metric => (

                    <div
                        key={metric.id}
                        className={styles.card}
                    >

                        <h3>{metric.value}</h3>

                        <p>{metric.label}</p>

                    </div>

                ))}

            </div>

        </section>

    );

};

export default ResolutionPerformance;