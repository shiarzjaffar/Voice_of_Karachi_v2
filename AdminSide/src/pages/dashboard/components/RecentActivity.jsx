import { useEffect, useState } from "react";
import DataCard from "../../../components/admin/ui/DataCard/DataCard";
import styles from "./RecentActivity.module.css";
import { MapPin } from "lucide-react";

export default function RecentActivity() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentComplaints();
  }, []);

  const fetchRecentComplaints = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/dashboard/recent-complaints"
      );

      const data = await res.json();

      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return styles.pending;
      case "In Progress":
        return styles.progress;
      case "Closed":
        return styles.closed;
      default:
        return "";
    }
  };

  return (
    <DataCard
      title="Latest Complaints"
      subtitle="Recently submitted complaints"
    >
      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No recent complaints found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
<th>Complaint</th>
<th>Status</th>
<th>Date</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((item) => (
              <tr key={item._id}>
<td>
    <div className={styles.categoryCell}>
        <strong>{item.category}</strong>

<div className={styles.location}>
    <MapPin size={14} />
    {item.location?.split(",")[0] || "-"}
</div>
    </div>
</td>

                <td>
                  <span
                    className={`${styles.badge} ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DataCard>
  );
}