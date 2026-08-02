import React from "react";
import styles from "./MonthlyTrend.module.css";

const defaultMonthlyData = [
    { month: "Jan", reports: 320 },
    { month: "Feb", reports: 410 },
    { month: "Mar", reports: 370 },
    { month: "Apr", reports: 480 },
    { month: "May", reports: 540 },
    { month: "Jun", reports: 620 },
];

const MonthlyTrend = ({
    monthlyData = defaultMonthlyData,
}) => {

    if (!monthlyData.length) {

    return (
        <section className={styles.container}>
            <h2>Monthly Complaint Trend</h2>
            <p>No data available.</p>
        </section>
    );

}

    const maxValue = Math.max(
        ...monthlyData.map(item => item.reports),
        25
    );

    const chartWidth = 600;
    const chartHeight = 260;
    const topPadding = 20;
    const bottomPadding = 20;
    const usableHeight = chartHeight - topPadding - bottomPadding;

    const points = monthlyData
        .map((item, index) => {

            const denominator =
    Math.max(monthlyData.length - 1, 1);

const x =
    (index / denominator) *
    chartWidth;

            const y =
            topPadding +
            usableHeight -
            (item.reports / maxValue) * usableHeight;

            return `${x},${y}`;
        })
        .join(" ");

    return (
        <section className={styles.container}>

            <div className={styles.header}>

                <h2>Monthly Complaint Trend</h2>

                <p>
                    Overview of complaint volumes over
                    recent months.
                </p>

            </div>

            <div className={styles.chartWrapper}>

                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className={styles.chart}
                    preserveAspectRatio="none"
                >

                    <polyline
                        fill="none"
                        stroke="#25eb6a"
                        strokeWidth="4"
                        points={points}
                    />

                    {monthlyData.map((item, index) => {

                        const denominator =
    Math.max(monthlyData.length - 1, 1);

const x =
    (index / denominator) *
    chartWidth;

            const y =
                topPadding +
                usableHeight -
                (item.reports / maxValue) * usableHeight;

                        return (
                            <circle
                                key={item.month}
                                cx={x}
                                cy={y}
                                r="6"
                                fill="#2563eb"
                            />
                        );

                    })}

                </svg>

            </div>

            <div className={styles.labels}>

                {monthlyData.map(item => (

                    <span key={item.month}>
                        {item.month}
                    </span>

                ))}

            </div>

        </section>
    );

};

export default MonthlyTrend;