import StatsCards from "./components/StatsCards";
import RecentJobs from "./components/RecentJobs";
import QuickActions from "./components/QuickActions";

function AdminDashboard() {
  return (
    <div>
      {/* ===== TOP STATS ===== */}
      <StatsCards />

      {/* ===== RECENT JOBS ===== */}
      <RecentJobs />

      {/* ===== QUICK ACTIONS ===== */}
      <QuickActions />
    </div>
  );
}

export default AdminDashboard;
