function StatsCards({ stats }) {
  return (
    <div className="dashboard-cards">
      <div className="dashboard-card">
        <h4>Total Jobs</h4>
        <p>{stats.totalJobs}</p>
      </div>

      <div className="dashboard-card">
        <h4>Total Applications</h4>
        <p>{stats.totalApplications}</p>
      </div>

      <div className="dashboard-card">
        <h4>Shortlisted</h4>
        <p>{stats.shortlisted}</p>
      </div>

      <div className="dashboard-card">
        <h4>Rejected</h4>
        <p>{stats.rejected}</p>
      </div>
    </div>
  );
}

export default StatsCards;
