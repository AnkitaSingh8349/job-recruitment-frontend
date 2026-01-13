import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/user.api";
import "../../styles/JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`jobs/${id}/`)
      .then(res => setJob(res.data))
      .catch(console.error);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details-container">
      <div className="job-details-header">
        <h2>{job.title}</h2>
      </div>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>💼 {job.job_type}</span>
        <span>⏳ {job.experience}</span>
        <span>💰 {job.salary}</span>
      </div>

      <div className="job-section">
        <h4>Description</h4>
        <p>{job.description}</p>
      </div>

      <button
        className="apply-btn"
        onClick={() => navigate(`/apply/${job.id}`)}
      >
        Apply Now
      </button>
    </div>
  );
}

export default JobDetails;
