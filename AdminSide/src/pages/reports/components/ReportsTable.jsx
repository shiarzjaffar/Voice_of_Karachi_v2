import ReportRow from "./ReportRow";
import styles from "./ReportsTable.module.css";

export default function ReportsTable({
  reports,
  onManage,
}) {
  if (!reports.length) {
    return (
      <div className={styles.empty}>
        No reports found.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
<thead>
  <tr>
    <th>Title</th>
    <th>Category</th>
    <th>Status</th>
    <th>Submitted</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>
          {reports.map((report) => (
<ReportRow
    key={report._id}
    report={report}
    onManage={onManage}
/>
          ))}
        </tbody>
      </table>
    </div>
  );
}