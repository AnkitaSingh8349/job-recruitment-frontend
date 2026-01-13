import { useEffect, useState } from "react";
import api from "../../utils/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("applications/").then((res) => {
      setApplications(res.data);
    });
  }, []);

  return (
    <div>
      <h2>My Applications</h2>

      {applications.map((app) => (
        <div key={app.id}>
          <p>{app.job.title}</p>
          <p>Status: {app.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
