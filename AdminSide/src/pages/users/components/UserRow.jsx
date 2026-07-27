import {
  Mail,
  Phone,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react";
import IconActionButton from "../../../Components/admin/common/IconActionButton";

import StatusBadge from "../../../Components/admin/common/StatusBadge";
import styles from "./UsersTable.module.css";

export default function UserRow({
  user,
  onView,
  onDelete,
  onToggleStatus,
  actionLoading,
}) {
  return (
    <tr>
      <td>{user._id}</td>

      <td>{user.fullname}</td>

      <td>
        <Mail size={15} />
        {" "}
        {user.email}
      </td>

      <td>
        <Phone size={15} />
        {" "}
        {user.phone}
      </td>

      <td>{user.role}</td>

      <td>
        <StatusBadge status={user.userstatus} />
      </td>

      <td className={styles.actions}>
        <div className={styles.actionGroup}>
  <IconActionButton
    icon={<Eye size={16} />}
    title="View User"
    variant="primary"
    onClick={() => onView(user)}
    disabled={actionLoading}
  />

  <IconActionButton
    icon={<RefreshCw size={16} />}
    title={
      user.userstatus === 1
        ? "Deactivate User"
        : "Activate User"
    }
    variant="warning"
    onClick={() => onToggleStatus(user)}
    disabled={actionLoading}
  />

  <IconActionButton
    icon={<Trash2 size={16} />}
    title="Delete User"
    variant="danger"
    onClick={() => onDelete(user)}
    disabled={actionLoading}
  />
  </div>
</td>
    </tr>
  );
}