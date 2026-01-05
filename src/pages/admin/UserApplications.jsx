import { useEffect, useState } from "react";
import { applyJob } from "../../api/application.api";


export default function UserApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    myApplications().then(setApps);
  }, []);

  return (
    <div>
      <h2>My Applications</h2>

      {apps.map((app) => (
        <div key={app.id}>
          <h4>{app.job}</h4>
          <p>Status: {app.status}</p>

          {app.status === "interview" && (
            <p>
              Interview Date: {app.interview_date}<br />
              <a href={app.interview_link}>Join Interview</a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
