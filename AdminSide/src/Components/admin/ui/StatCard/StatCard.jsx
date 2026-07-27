import styles from "./StatCard.module.css";

export default function StatCard({
    title,
    value,
    icon,
    color = "primary",
    change,
    footer,
    onClick
}) {

    return (

        <div
            className={`${styles.card} ${styles[color]}`}
            onClick={onClick}
        >

            <div className={styles.top}>

                <div>

                    <span className={styles.label}>
                        {title}
                    </span>

                    <h2 className={styles.value}>
                        {value}
                    </h2>

                </div>

                <div className={styles.icon}>

                    {icon}

                </div>

            </div>

            {(change || footer) && (

                <div className={styles.bottom}>

                    {change && (
                        <span className={styles.change}>
                            {change}
                        </span>
                    )}

                    {footer && (
                        <span className={styles.footer}>
                            {footer}
                        </span>
                    )}

                </div>

            )}

        </div>

    );

}