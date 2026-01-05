import { Outlet, Link, Navigate } from "react-router-dom";
import { isAdmin, logout } from "../utils/auth";
import "../styles/admin_dashbord.css";

function AdminLayout() {
  if (!isAdmin()) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Recruiter Admin</h2>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/jobs">Jobs</Link></li>
          <li><Link to="/admin/jobs/add">Add Job</Link></li>
          <li>
            <button
              onClick={logout}
              style={{
                marginTop: "20px",
                background: "transparent",
                border: "1px solid #475569",
                color: "#fff",
                padding: "8px",
                width: "100%",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h3>Admin Dashboard</h3>
        </div>

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
