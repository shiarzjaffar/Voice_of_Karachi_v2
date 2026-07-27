import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import StatusBadge from "../../../Components/admin/common/StatusBadge";

export default function EmployeeDetailsModal({
  employee,
  onClose,
}) {
  if (!employee) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "600px",
          maxWidth: "95%",
        }}
      >
        <DataCard
          title="Employee Details"
          subtitle="Employee information"
          actions={
            <button onClick={onClose}>
              Close
            </button>
          }
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              <tr>
                <td><strong>Employee ID</strong></td>
                <td>{employee.employeeId}</td>
              </tr>

              <tr>
                <td><strong>Full Name</strong></td>
                <td>{employee.fullname}</td>
              </tr>

              <tr>
                <td><strong>Email</strong></td>
                <td>{employee.email}</td>
              </tr>

              <tr>
                <td><strong>Phone</strong></td>
                <td>{employee.phone}</td>
              </tr>

              <tr>
                <td><strong>Department</strong></td>
                <td>{employee.department}</td>
              </tr>

              <tr>
                <td><strong>Role</strong></td>
                <td>{employee.role}</td>
              </tr>

              <tr>
                <td><strong>Approval Status</strong></td>
                <td>
                  {employee.approved ? (
                    <StatusBadge status="Approved" />
                  ) : (
                    <StatusBadge status="Pending" />
                  )}
                </td>
              </tr>

              <tr>
                <td><strong>Account Status</strong></td>
                <td>
                  <StatusBadge status={employee.userstatus} />
                </td>
              </tr>

              <tr>
                <td><strong>Registered On</strong></td>
                <td>
                  {employee.createdAt
                    ? new Date(employee.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </DataCard>
      </div>
    </div>
  );
}