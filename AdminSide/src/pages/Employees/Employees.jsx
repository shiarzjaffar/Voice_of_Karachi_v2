import { useEffect, useState } from "react";
import styles from "./Employees.module.css";

import PageHeader from "../../Components/admin/ui/PageHeader/PageHeader";

import EmployeesStats from "./components/EmployeesStats";
import EmployeesToolbar from "./components/EmployeesToolbar";
import EmployeesTable from "./components/EmployeesTable";
import EmployeeDetailsModal from "./components/EmployeeDetailsModal";

import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/admin/common/LoadingSpinner";

import {
  getEmployees,
  approveEmployee,
  rejectEmployee,
} from "./services/employeesService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data = await getEmployees();

      setEmployees(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleView = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleApprove = async (employee) => {
    try {
      setActionLoading(true);

      await approveEmployee(employee._id);

      toast.success("Employee approved successfully");

      await loadEmployees();
    } catch (error) {
      console.error(error);
      toast.error("Failed to approve employee");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (employee) => {
    try {
      setActionLoading(true);

      await rejectEmployee(employee._id);

      toast.success("Employee rejected");

      await loadEmployees();
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject employee");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner
        text="Loading employees..."
        fullScreen
      />
    );
  }

  return (
    <div className={styles.employees}>
      <PageHeader
        title="Employees"
        subtitle="Manage employee registrations and approvals"
      />

      <EmployeesStats employees={employees} />

      <EmployeesToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />

      <EmployeesTable
        employees={employees}
        searchQuery={searchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onView={handleView}
        onApprove={handleApprove}
        onReject={handleReject}
        actionLoading={actionLoading}
      />

      <EmployeeDetailsModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}