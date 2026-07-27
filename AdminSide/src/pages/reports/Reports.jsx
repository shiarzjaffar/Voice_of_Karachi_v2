import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "./Reports.module.css";

import PageHeader from "../../Components/admin/ui/PageHeader/PageHeader";
import LoadingSpinner from "../../Components/admin/common/LoadingSpinner";

import { getReports } from "./services/reportsService";
import ReportsStats from "./components/ReportsStats";
import ReportsToolbar from "./components/ReportsToolbar";
import ReportsTable from "./components/ReportsTable";
import ReportManager from "./components/ReportManager";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [managerOpen, setManagerOpen] = useState(false);



  const loadReports = async () => {
    try {
      setLoading(true);

      const data = await getReports();

      console.log("Reports:", data);

      setReports(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return (
      <LoadingSpinner
        text="Loading reports..."
        fullScreen
      />
    );
  }

  const filteredReports = reports.filter((report) => {
  const matchesSearch =
    report.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    report.category
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    report.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const openManager = (report) => {
  setSelectedReport(report);
  setManagerOpen(true);
};

const closeManager = () => {
  setSelectedReport(null);
  setManagerOpen(false);
};

  return (
    <div className={styles.reports}>
      <PageHeader
        title="Reports"
        subtitle="Manage citizen reports"
      />

<ReportsStats reports={reports} />

<ReportsToolbar
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  onRefresh={loadReports}
/>

<ReportsTable
    reports={filteredReports}
    onManage={openManager}
/>

<ReportManager
  open={managerOpen}
  report={selectedReport}
  onClose={closeManager}
  onRefresh={loadReports}
/>


    </div>
  );
}