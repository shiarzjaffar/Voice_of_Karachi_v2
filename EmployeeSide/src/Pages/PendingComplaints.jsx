import { useEffect, useState } from "react";
import api from "../Services/api";
import styles from "./PendingComplaints.module.css";

function PendingComplaints() {

    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("All");
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchPendingComplaints();
}, []);

const assignComplaint = async (id) => {
    try {
        const res = await api.patch(`/report/employee/assign/${id}`);

        console.log(res.data);

        fetchPendingComplaints();

    } catch (err) {

        console.log(err.response);

        alert(
            err.response?.data?.error ||
            err.response?.data?.message ||
            "Failed to assign complaint."
        );
    }
};

const fetchPendingComplaints = async () => {

    try {

        setLoading(true);

        const res = await api.get("/report/employee/pending");

        setComplaints(res.data);

    } catch (err) {

        console.error(err);

    } finally {

        setLoading(false);

    }

};



const filtered = complaints.filter((item) => {

    const text = search.toLowerCase();

    const matchesSearch =
        String(item.category ?? "").toLowerCase().includes(text) ||
        String(item.location ?? "").toLowerCase().includes(text) ||
        String(item._id ?? "").toLowerCase().includes(text) ||
        String(item.userId?.fullname ?? "").toLowerCase().includes(text);

    const matchesPriority =
        priority === "All" ||
        item.priority === priority;

    return matchesSearch && matchesPriority;

});

return (

    <div className={styles.page}>

        <div className={styles.header}>

            <div className={styles.title}>
                <h2>Pending Complaints</h2>
                <p>View and manage department complaints.</p>
            </div>

            <div className={styles.actions}>

                <input
                    type="text"
                    placeholder="Search complaint..."
                    className={styles.search}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

<select
    className={styles.filter}
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
>
    <option value="All">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
</select>

            </div>

        </div>

    {loading ? (

    <div className={styles.loading}>
        Loading pending complaints...
    </div>

) : (
      

        <div className={styles.tableCard}>


            <table className={styles.table}>

                

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Citizen</th>
                        <th>Location</th>
                        <th>Priority</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {filtered.map((item) => (

                        <tr key={item._id}>

                            <td>{item._id?.slice(-6)}</td>

                            <td>{item.category ?? "-"}</td>

                            <td>{item.userId?.fullname ?? "-"}</td>

                            <td>{item.location ?? "-"}</td>

                            <td>
                                <span
                                    className={`${styles.priority} ${
                                        item.priority === "High"
                                            ? styles.high
                                            : item.priority === "Medium"
                                            ? styles.medium
                                            : styles.low
                                    }`}
                                >
                                    {item.priority ?? "-"}
                                </span>
                            </td>

                            <td>
                                {item.createdAt
                                    ? new Date(item.createdAt).toLocaleDateString()
                                    : "-"}
                            </td>

                            <td>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => assignComplaint(item._id)}
                                >
                                    Assign To Me
                                </button>
                            </td>

                        </tr>

                    ))}

                    {filtered.length === 0 && (
                        <tr>
                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                }}
                            >
                                No pending complaints found.
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>

        </div>

        )}

    </div> 

);

}

export default PendingComplaints;