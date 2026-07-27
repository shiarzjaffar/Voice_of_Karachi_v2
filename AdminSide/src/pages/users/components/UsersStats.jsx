import StatCard from "../../../Components/admin/ui/StatCard/StatCard";
import {
    Users,
    UserCheck,
    UserX
} from "lucide-react";

export default function UsersStats({ users }) {
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.userstatus === 1
  ).length;

  const inactiveUsers = totalUsers - activeUsers;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
      }}
    >
<StatCard
    title="Total Users"
    value={totalUsers}
    icon={<Users />}
/>

<StatCard
    title="Active Users"
    value={activeUsers}
    icon={<UserCheck />}
    color="success"
/>

<StatCard
    title="Inactive Users"
    value={inactiveUsers}
    icon={<UserX />}
    color="danger"
/>
    </div>
  );
}