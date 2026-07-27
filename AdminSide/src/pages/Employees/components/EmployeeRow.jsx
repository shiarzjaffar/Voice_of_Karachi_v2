import {
  Mail,
  Phone,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

import IconActionButton from "../../../Components/admin/common/IconActionButton";
import StatusBadge from "../../../Components/admin/common/StatusBadge";
import styles from "./EmployeesTable.module.css";

export default function EmployeeRow({
  employee,
  onView,
  onApprove,
  onReject,
  actionLoading,
}) {
  return (
    <tr>
      <td>{employee.employeeId}</td>

      <td>{employee.fullname}</td>

      <td>{employee.department}</td>

      <td>
        <Mail size={15} /> {employee.email}
      </td>

      <td>
        <Phone size={15} /> {employee.phone}
      </td>

      <td>
        {employee.approved ? (
          <StatusBadge status="Approved" />
        ) : (
          <StatusBadge status="Pending" />
        )}
      </td>

      <td>
        <StatusBadge status={employee.userstatus} />
      </td>

      <td className={styles.actions}>
        <div className={styles.actionGroup}>
          <IconActionButton
            icon={<Eye size={16} />}
            title="View Employee"
            variant="primary"
            onClick={() => onView(employee)}
            disabled={actionLoading}
          />

          {!employee.approved && (
            <IconActionButton
              icon={<CheckCircle size={16} />}
              title="Approve Employee"
              variant="success"
              onClick={() => onApprove(employee)}
              disabled={actionLoading}
            />
          )}

          <IconActionButton
            icon={<XCircle size={16} />}
            title="Reject Employee"
            variant="danger"
            onClick={() => onReject(employee)}
            disabled={actionLoading}
          />
        </div>
      </td>
    </tr>
  );
}