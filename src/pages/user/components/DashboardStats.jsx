function DashboardStats({ stats }) {
  return (
    <div className="stats-grid">
      <div>Applied: {stats.applied}</div>
      <div>Shortlisted: {stats.shortlisted}</div>
      <div>Rejected: {stats.rejected}</div>
    </div>
  );
}

export default DashboardStats;
