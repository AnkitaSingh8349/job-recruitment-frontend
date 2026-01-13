import "../../../styles/RecommendedJobs.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/user.api";

function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("user/dashboard/jobs/")
      .then(res => setJobs(res.data))
      .catch(console.error);
  }, []);

  if (!jobs.length) return <p>No jobs available</p>;

  return (
    <div className="recommended-wrapper">
      <h3>🔥 Recommended Jobs</h3>

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h4>{job.title}</h4>
            <p>{job.location}</p>
            <p>{job.job_type}</p>

          <button
  className="apply-btn"
  onClick={() => navigate(`/jobs/${job.id}`)}
>
  View Details
</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedJobs;
