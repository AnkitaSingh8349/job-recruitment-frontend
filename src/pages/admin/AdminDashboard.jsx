import { useEffect, useState } from "react";
import StatsCards from "./components/StatsCards";
import RecentJobs from "./components/RecentJobs";
import QuickActions from "./components/QuickActions";
import {
  fetchDashboardStats,
  fetchRecentJobs,
} from "./services/dashboardService";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const statsData = await fetchDashboardStats();
      const jobsData = await fetchRecentJobs();

      setStats(statsData);
      setJobs(jobsData);
    } catch (error) {
      console.error("Dashboard API error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}

      {/* Cards */}
      <StatsCards
        stats={
          stats || {
            totalJobs: 0,
            totalApplications: 0,
            shortlisted: 0,
            rejected: 0,
          }
        }
      />

      {/* Table */}
      <RecentJobs jobs={jobs || []} />

      {/* Buttons */}
      <QuickActions />
    </>
  );
}

export default AdminDashboard;
