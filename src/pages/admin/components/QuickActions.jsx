function QuickActions() {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Quick Actions</h3>

      <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
        <a href="/admin/jobs/add" className="btn-edit">
          + Post New Job
        </a>

        <a href="/admin/applications" className="btn-delete">
          View Applications
        </a>
      </div>
    </div>
  );
}

export default QuickActions;
