import { useEffect, useState } from "react";
import { pendingApplications } from "../../api/application.api";
import { Link } from "react-router-dom";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    pendingApplications().then(setApps);
  }, []);

  return (
    <div>
      <h2>Pending Applications</h2>

      {apps.map((app) => (
        <div key={app.id}>
          <p>
            {app.user} applied for {app.job}
          </p>

          <Link to={`/admin/applications/invite/${app.id}`}>
            Invite Interview
          </Link>
        </div>
      ))}
    </div>
  );
}
