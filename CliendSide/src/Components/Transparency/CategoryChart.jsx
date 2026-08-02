import React from "react";
import styles from "./CategoryChart.module.css";

const CategoryChart = ({
    categories = [],
}) => {

    const highestValue =
        categories.length > 0
            ? Math.max(...categories.map(c => c.reports))
            : 1;

    return (
        <section className={styles.container}>

            <div className={styles.header}>
                <h2>Complaint Categories</h2>

                <p>
                    Breakdown of reported complaints by category across Karachi.
                </p>
            </div>

            <div className={styles.chart}>

                {categories.map((category) => (

                    <div
                        key={category.category}
                        className={styles.row}
                    >

                        <div className={styles.info}>

                            <span>{category.category}</span>

                            <strong>
                                {category.reports.toLocaleString()}
                            </strong>

                        </div>

                        <div className={styles.progress}>

                            <div
                                className={styles.bar}
                                style={{
                                    width: `${Math.max(
                                        (category.reports / highestValue) * 100,
                                        8
                                    )}%`,
                                }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default CategoryChart;