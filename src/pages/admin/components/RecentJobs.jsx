import { useEffect, useState } from "react";
import { getRecentJobs } from "../services/adminApi";

function RecentJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getRecentJobs().then(setJobs);
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Recent Job Posts</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.type}</td>
              <td>{job.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentJobs;
