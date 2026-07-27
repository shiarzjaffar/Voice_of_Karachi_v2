import DataCard from "../../../Components/admin/ui/DataCard/DataCard";

export default function DeleteUserDialog({
  user,
  onCancel,
  onConfirm,
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
          width: "420px",
          maxWidth: "95%",
        }}
      >
        <DataCard
          title="Delete User"
          subtitle="This action cannot be undone."
        >
          <p style={{ marginBottom: "20px" }}>
            Are you sure you want to delete
            <strong> {user.fullname}</strong>?
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <button onClick={onCancel}>
              Cancel
            </button>

            <button
              onClick={onConfirm}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete User
            </button>
          </div>
        </DataCard>
      </div>
    </div>
  );
}