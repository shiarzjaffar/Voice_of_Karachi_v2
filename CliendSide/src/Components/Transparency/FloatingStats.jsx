import React from "react";
import styles from "./FloatingStats.module.css";

const FloatingStats = ({ stats = {} }) => {

    const total = stats.total ?? 0;

    const cards = [
        {
            id: 1,
            title: "Pending",
            value: stats.pending ?? 0,
            className: styles.pending,
        },
        {
            id: 2,
            title: "In Progress",
            value: stats.inProgress ?? 0,
            className: styles.inProgress,
        },
        {
            id: 3,
            title: "Resolved",
            value: stats.closed ?? 0,
            className: styles.resolved,
        },
    ];

    return (
        <div className={styles.container}>

            {cards.map((card) => {

                const percentage =
                    total === 0
                        ? 0
                        : ((card.value / total) * 100).toFixed(1);

                return (

                    <div
                        key={card.id}
                        className={`${styles.card} ${card.className}`}
                    >

                        <div className={styles.topRow}>

                            <h4>{card.title}</h4>

                            <span className={styles.percent}>
                                {percentage}%
                            </span>

                        </div>

                        <h2>{card.value}</h2>

                        <p className={styles.subtitle}>
                            Reports
                        </p>

                    </div>

                );

            })}

        </div>
    );
};

export default FloatingStats;