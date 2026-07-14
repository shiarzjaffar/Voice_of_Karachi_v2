import styles from "./ReportCard.module.css";

const ReportCard = ({
    report,
    onViewDetails,
}) => {

    const getStatusClass = (status) => {

        switch(status){

            case "Pending":
                return styles.pending;

            case "Assigned":
                return styles.assigned;

            case "In Progress":
                return styles.progress;

            case "Resolved":
                return styles.resolved;

            case "Closed":
                return styles.closed;

            default:
                return "";
        }

    };

    return (

        <div className={styles.card}>

            <div className={styles.header}>

                <h3>{report.title}</h3>

                <span className={`${styles.badge} ${getStatusClass(report.status)}`}>
                    {report.status}
                </span>

            </div>

            <div className={styles.info}>

                <p>
                    <strong>Tracking ID</strong>

                    <span>{report._id}</span>
                </p>

                <p>
                    <strong>Category</strong>

                    <span>{report.category}</span>
                </p>

                <p>
                    <strong>Department</strong>

                    <span>{report.department || "Pending Assignment"}</span>
                </p>

                <p>
                    <strong>Location</strong>

                    <span>{report.location}</span>
                </p>

                <p>
                    <strong>Submitted</strong>

                    <span>
                        {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                </p>

            </div>

            <button
                className={styles.button}
                onClick={() => onViewDetails(report)}
            >

                View Timeline →

            </button>

        </div>

    );

};

export default ReportCard;