import "../../../styles/RecentApplications.css";
import { useEffect, useState } from "react";
import api from "../../../utils/api";


function RecentApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api
      .get("user/dashboard/applications/")
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!apps.length) return <p>No applications yet</p>;

  return (
    <div className="applications-wrapper">
      {apps.map((app) => (
        <div key={app.id} className="application-card">
          <strong>{app.job_title}</strong>
          <span className={`status ${app.status}`}>
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentApplications;
