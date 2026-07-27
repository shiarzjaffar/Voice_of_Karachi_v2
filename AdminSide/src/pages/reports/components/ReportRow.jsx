import StatusBadge from "../../../Components/admin/common/StatusBadge";
import styles from "./ReportRow.module.css";
import IconActionButton from "../../../Components/admin/common/IconActionButton";
import { Eye } from "lucide-react";

export default function ReportRow({
    report,
    onManage,
}) {
  return (
    <tr>
      <td>{report.title}</td>

      <td>{report.category}</td>

      <td>
        <StatusBadge status={report.status} />
      </td>

      <td>
        {new Date(
          report.reportSubmittedAt
        ).toLocaleDateString()}
      </td>

<td>
  <IconActionButton
    icon={Eye}
    title="Manage Report"
    onClick={() => onManage(report)}
  />
</td>
    </tr>
  );
}