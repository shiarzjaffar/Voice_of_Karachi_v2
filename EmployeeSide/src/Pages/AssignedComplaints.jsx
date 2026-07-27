import { useEffect, useState } from "react";
import api from "../Services/api";
import styles from "./AssignedComplaints.module.css";

function AssignedComplaints() {


const [selectedComplaint, setSelectedComplaint] = useState(null);
const [showModal, setShowModal] = useState(false);
const [search,setSearch]=useState("");

const [complaints, setComplaints] = useState([]);

useEffect(() => {
  fetchAssigned();
}, []);

const fetchAssigned = async () => {
  try {
    const res = await api.get("/report/employee/assigned");
    setComplaints(res.data);
  } catch (err) {
    console.error(err);
  }
};

const handleComplete = async (id) => {
  try {
    await api.patch(`/report/close/${id}`);

    alert("Complaint marked as completed.");

    fetchAssigned();
  } catch (error) {
    console.error(error);

    alert("Failed to complete complaint.");
  }
};

const handleView = (complaint) => {
  setSelectedComplaint(complaint);
  setShowModal(true);
};

const filtered=complaints.filter(item=>
(item._id || "").toLowerCase().includes(search.toLowerCase())||
(item.category || "").toLowerCase().includes(search.toLowerCase())
);

return(

<div className={styles.page}>

<div className={styles.header}>

<div className={styles.title}>
<h2>My Assigned Complaints</h2>
<p>Track and update your assigned complaints.</p>
</div>

<input
className={styles.search}
placeholder="Search..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className={styles.card}>

<table className={styles.table}>

<thead>

<tr>
<th>ID</th>
<th>Category</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filtered.map(item=>(

<tr key={item._id || item.id}>

<td>{item._id.slice(-8).toUpperCase()}</td>

<td>{item.category}</td>

<td>

<span
className={`${styles.status}
${
item.status==="In Progress"
?styles.progress
:styles.completed
}`}
>

{item.status}

</span>

</td>

<td>{new Date(item.assignedAt).toLocaleDateString()}</td>

<td>

<div className={styles.actions}>

<button
  className={`${styles.btn} ${styles.view}`}
  onClick={() => handleView(item)}
>
  View
</button>

<button
  className={`${styles.btn} ${styles.complete}`}
  onClick={() => handleComplete(item._id)}
>
  Mark as Completed
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>

</div>

{showModal && selectedComplaint && (
  <div className={styles.modalOverlay}>

    <div className={styles.modal}>

      <div className={styles.modalHeader}>

        <div>
          <h2>Complaint Details</h2>
          <span className={styles.complaintId}>
            #{selectedComplaint._id.slice(-8).toUpperCase()}
          </span>
        </div>

        <span
          className={`${styles.statusBadge}
          ${
            selectedComplaint.status === "Pending"
              ? styles.pending
              : selectedComplaint.status === "In Progress"
              ? styles.progress
              : styles.closed
          }`}
        >
          {selectedComplaint.status}
        </span>

      </div>

      <div className={styles.section}>

        <h3>Citizen Information</h3>

        <div className={styles.grid}>

          <div>
            <label>Name</label>
            <p>{selectedComplaint.userId?.fullname}</p>
          </div>

          <div>
            <label>Phone</label>
            <p>{selectedComplaint.userId?.phone}</p>
          </div>

          <div>
            <label>Email</label>
            <p>{selectedComplaint.userId?.email}</p>
          </div>

          <div>
            <label>Category</label>
            <p>{selectedComplaint.category}</p>
          </div>

        </div>

      </div>

      <div className={styles.section}>

        <h3>Complaint Information</h3>

        <div className={styles.grid}>

          <div>
            <label>Location</label>
            <p>{selectedComplaint.location}</p>
          </div>

          <div>
            <label>Assigned Date</label>
            <p>
              {new Date(selectedComplaint.assignedAt).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>

      <div className={styles.section}>

        <h3>Description</h3>

        <div className={styles.descriptionBox}>
          {selectedComplaint.description}
        </div>

      </div>

      {selectedComplaint.photos?.length > 0 && (

        <div className={styles.section}>

          <h3>Uploaded Photos</h3>

          <div className={styles.photoGrid}>

            {selectedComplaint.photos.map((photo) => (

              <img
                key={photo}
                src={`http://localhost:5000/uploads/${photo}`}
                alt=""
                className={styles.photo}
              />

            ))}

          </div>

        </div>

      )}

      <div className={styles.footer}>

        <button
          className={styles.closeBtn}
          onClick={() => setShowModal(false)}
        >
          Close
        </button>

      </div>

    </div>

  </div>
)}


</div>

);

}

export default AssignedComplaints;