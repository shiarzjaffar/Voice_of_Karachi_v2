import { useEffect, useState } from "react";
import api from "../Services/api";
import styles from "./PendingComplaints.module.css";

function PendingComplaints() {

    const [search, setSearch] = useState("");
const [complaints, setComplaints] = useState([]);

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
        const res = await api.get("/report/employee/pending");
        setComplaints(res.data);
    } catch (err) {
        console.error(err);
    }
};



    const filtered = complaints.filter((item)=>
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
    );

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
                        onChange={(e)=>setSearch(e.target.value)}
                    />

                    <select className={styles.filter}>
                        <option>All Priorities</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>

                </div>

            </div>

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

                                <td>{item._id.slice(-6)}</td>

                                <td>{item.category}</td>

                                <td>{item.userId?.fullname || "-"}</td>

                                <td>{item.location}</td>

                                <td>

                                    <span
                                        className={`${styles.priority} ${
                                            item.priority==="High"
                                            ? styles.high
                                            : item.priority==="Medium"
                                            ? styles.medium
                                            : styles.low
                                        }`}
                                    >
                                        {item.priority}
                                    </span>

                                </td>

                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

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
                                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                                    No pending complaints found.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default PendingComplaints;