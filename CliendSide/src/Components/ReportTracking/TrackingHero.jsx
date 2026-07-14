import styles from "./TrackingHero.module.css";

const TrackingHero = () => {
    return (
        <div className={styles.hero}>

            <span className={styles.breadcrumb}>
                Dashboard / Report Tracking
            </span>

            <h1>Report Tracking</h1>

            <p>
                Track the progress of your submitted complaints and receive updates from the responsible department.
            </p>

        </div>
    );
};

export default TrackingHero;