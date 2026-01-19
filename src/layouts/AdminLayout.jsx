import { Outlet, Link, Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import Navbar from "../components/Navbar";
import "../styles/admin_dashbord.css";

function AdminLayout() {
  // 🔒 Route protection
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* ✅ GLOBAL NAVBAR (same as user & home) */}
      <Navbar />

      <div className="admin-layout">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <h2>Recruiter Admin</h2>

          <ul>
            <li>
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/admin/jobs">Jobs</Link>
            </li>

            <li>
              <Link to="/admin/jobs/add">Add Job</Link>
            </li>

            <li>
              <Link to="/admin/applications">Applications</Link>
            </li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
