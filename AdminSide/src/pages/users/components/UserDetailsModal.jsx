import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import StatusBadge from "../../../Components/admin/common/StatusBadge";

export default function UserDetailsModal({
  user,
  onClose,
}) {
  if (!user) return null;

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
          width: "520px",
          maxWidth: "95%",
        }}
      >
        <DataCard
          title="User Details"
          subtitle="Citizen information"
          actions={
            <button onClick={onClose}>
              Close
            </button>
          }
        >
          <table
            style={{
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td><strong>ID</strong></td>
                <td>{user._id}</td>
              </tr>

              <tr>
                <td><strong>Name</strong></td>
                <td>{user.fullname}</td>
              </tr>

              <tr>
                <td><strong>Email</strong></td>
                <td>{user.email}</td>
              </tr>

              <tr>
                <td><strong>Phone</strong></td>
                <td>{user.phone}</td>
              </tr>

              <tr>
                <td><strong>Role</strong></td>
                <td>{user.role}</td>
              </tr>

              <tr>
                <td><strong>Status</strong></td>
                <td>
                  <StatusBadge
                    status={user.userstatus}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </DataCard>
      </div>
    </div>
  );
}