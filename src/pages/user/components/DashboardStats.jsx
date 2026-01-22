function DashboardStats({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-box">
        <p className="stat-number">{stats.applied || 0}</p>
        <p>Applied Jobs</p>
      </div>

      <div className="stat-box">
        <p className="stat-number">{stats.shortlisted || 0}</p>
        <p>Shortlisted</p>
      </div>

      <div className="stat-box">
        <p className="stat-number">{stats.interviews || 0}</p>
        <p>Interviews</p>
      </div>

      <div className="stat-box">
        <p className="stat-number">{stats.rejected || 0}</p>
        <p>Rejected</p>
      </div>
    </div>
  );
}

export default DashboardStats;
