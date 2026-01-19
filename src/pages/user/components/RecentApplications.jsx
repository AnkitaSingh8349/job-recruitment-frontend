import "../../../styles/RecentApplications.css";
import { useEffect, useState } from "react";
import userApi from "../../../api/user.api"; // ✅ CORRECT axios

function RecentApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi
      .get("applications/") // ✅ CORRECT endpoint
      .then((res) => {
        setApps(res.data);
      })
      .catch((err) => {
        console.error("Failed to load applications", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!apps.length) return <p>No applications yet</p>;

  return (
    <div className="applications-wrapper">
      {apps.map((app) => (
        <div key={app.id} className="application-card">
          <strong>{app.job_title}</strong>

          <span className={`status ${app.status}`}>
            {app.status}
          </span>

          {app.admin_message && (
            <p className="admin-message">
              {app.admin_message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecentApplications;
