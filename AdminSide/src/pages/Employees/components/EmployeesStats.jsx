import StatCard from "../../../Components/admin/ui/StatCard/StatCard";
import {
  Users,
  Clock3,
  UserCheck,
  UserX,
} from "lucide-react";

export default function EmployeesStats({ employees }) {
  const totalEmployees = employees.length;

  const pendingEmployees = employees.filter(
    (employee) => !employee.approved && employee.userstatus === 1
  ).length;

  const approvedEmployees = employees.filter(
    (employee) => employee.approved
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.userstatus === 0
  ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      <StatCard
        title="Total Employees"
        value={totalEmployees}
        icon={<Users />}
      />

      <StatCard
        title="Pending Approval"
        value={pendingEmployees}
        icon={<Clock3 />}
        color="warning"
      />

      <StatCard
        title="Approved"
        value={approvedEmployees}
        icon={<UserCheck />}
        color="success"
      />

      <StatCard
        title="Inactive"
        value={inactiveEmployees}
        icon={<UserX />}
        color="danger"
      />
    </div>
  );
}