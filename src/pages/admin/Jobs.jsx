import { useEffect, useState } from "react";
import adminApi from "./services/adminApi";
import "../../styles/Jobs.css";



function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await adminApi.get("/jobs/");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await adminApi.delete(`/jobs/${id}/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="jobs-page">
      <h2 className="page-title">All Jobs</h2>

      {error && <p className="error-text">{error}</p>}

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-desc">{job.description}</p>

            <div className="job-meta">
              <span><b>Location:</b> {job.location}</span>
              <span><b>Salary:</b> {job.salary ?? "N/A"}</span>
              <span><b>Experience:</b> {job.experience ?? "N/A"} years</span>
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteJob(job.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
