import { Link } from "react-router-dom";

function QuickActions() {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Quick Actions</h3>

      <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
        <Link to="/admin/jobs/add" className="btn-edit">
          + Add Job
        </Link>

        <Link to="/admin/applications" className="btn-delete">
          View Applications
        </Link>
      </div>
    </div>
  );
}

export default QuickActions;
