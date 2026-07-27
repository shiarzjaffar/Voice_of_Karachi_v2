import { useMemo } from "react";

import DataCard from "../../../Components/admin/ui/DataCard/DataCard";
import EmployeeRow from "./EmployeeRow";
import styles from "./EmployeesTable.module.css";

export default function EmployeesTable({
  employees,
  searchQuery,
  currentPage,
  setCurrentPage,
  onView,
  onApprove,
  onReject,
  actionLoading,
}) {
  const employeesPerPage = 10;

  const filteredEmployees = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return employees.filter((employee) => {
      return (
        employee.employeeId?.toLowerCase().includes(query) ||
        employee.fullname?.toLowerCase().includes(query) ||
        employee.department?.toLowerCase().includes(query) ||
        employee.email?.toLowerCase().includes(query) ||
        employee.phone?.includes(searchQuery)
      );
    });
  }, [employees, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / employeesPerPage)
  );

  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  return (
    <DataCard
      title="Employees"
      subtitle={`Total Employees: ${employees.length}`}
    >
      <>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.head}>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Approval</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className={styles.body}>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
                  <EmployeeRow
                    key={employee._id}
                    employee={employee}
                    onView={onView}
                    onApprove={onApprove}
                    onReject={onReject}
                    actionLoading={actionLoading}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className={styles.empty}
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            className={styles.pageButton}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </>
    </DataCard>
  );
}