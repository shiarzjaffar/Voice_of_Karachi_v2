import { useEffect, useState } from "react";
import api from "../Services/api";
import styles from "./CompletedComplaints.module.css";

function CompletedComplaints() {


const [selectedComplaint, setSelectedComplaint] = useState(null);
const [showModal, setShowModal] = useState(false);
const [search,setSearch]=useState("");

const [complaints, setComplaints] = useState([]);

useEffect(() => {
  fetchAssigned();
}, []);

const fetchAssigned = async () => {
  try {
    const res = await api.get("/report/employee/completed");
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

const filtered = complaints.filter((item) => {

    const text = search.toLowerCase();

    return (

        String(item._id ?? "").toLowerCase().includes(text) ||

        String(item.category ?? "").toLowerCase().includes(text) ||

        String(item.location ?? "").toLowerCase().includes(text) ||

        String(item.userId?.fullname ?? "")
            .toLowerCase()
            .includes(text)

    );

});

return(

<div className={styles.page}>

<div className={styles.header}>

<div className={styles.title}>
<h2>Completed Complaints</h2>
<p>View all complaints you have successfully resolved.</p>
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
<th>Completed On</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filtered.map(item=>(

<tr key={item._id || item.id}>

<td>{item._id?.slice(-8).toUpperCase() ?? "-"}</td>

<td>{item.category}</td>

{filtered.length === 0 && (
    <tr>
        <td
            colSpan="5"
            style={{
                textAlign: "center",
                padding: "24px",
                color: "#6b7280",
            }}
        >
            No completed complaints found.
        </td>
    </tr>
)}

<td>

<span className={`${styles.status} ${styles.completed}`}>
    Closed
</span>

</td>

<td>
    {item.reportClosedAt
        ? new Date(item.reportClosedAt).toLocaleDateString()
        : "-"}
</td>

<td>

<div className={styles.actions}>

<button
    className={`${styles.btn} ${styles.view}`}
    onClick={() => handleView(item)}
>
    View
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

<span className={`${styles.status} ${styles.completed}`}>
    Closed
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

        <div>
    <label>Completed On</label>
    <p>
        {selectedComplaint.reportClosedAt
            ? new Date(selectedComplaint.reportClosedAt).toLocaleDateString()
            : "-"}
    </p>
</div>

      </div>

      <div className={styles.section}>

        <h3>Description</h3>

        <div className={styles.descriptionBox}>
          {selectedComplaint.description}
        </div>

      </div>

      {selectedComplaint.status === "Closed" && (

    <div className={styles.section}>

        <h3>Citizen Feedback</h3>

        {selectedComplaint.rating ? (

            <>

                <div className={styles.ratingDisplay}>

                    {"★".repeat(selectedComplaint.rating)}
                    {"☆".repeat(5 - selectedComplaint.rating)}

                </div>

                <div className={styles.feedbackBox}>

                    {selectedComplaint.feedback
                        ? `"${selectedComplaint.feedback}"`
                        : "Citizen submitted a rating without comments."}

                </div>

            </>

        ) : (

            <div className={styles.noFeedback}>

                No feedback has been submitted by the citizen yet.

            </div>

        )}

    </div>

)}

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

export default CompletedComplaints;