import { useEffect, useState } from "react";
import adminApi from "../admin/services/adminApi";
import "../../styles/JobEmp.css";
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

  // helper to show company name safely with fallbacks
  const getCompanyName = (job) => {
    // Preferred: serializer provides `company_name`
    if (job.company_name) return job.company_name;

    // If API returned company as object: { company: { name: "..." } }
    if (job.company && typeof job.company === "object" && job.company.name) {
      return job.company.name;
    }

    // If API returned company as plain string or ID
    if (job.company) return job.company;

    return "Unknown Company";
  };

  // optional: format created_at/hiring date if available
  const formatDate = (iso) => {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleDateString("en-IN");
    } catch {
      return iso;
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

            {/* COMPANY NAME - ADDED */}
            <p className="job-company">
              <b>Company:</b> {getCompanyName(job)}
            </p>

            <p className="job-desc">{job.description}</p>

            <div className="job-meta">
              <span>
                <b>Location:</b> {job.location ?? "N/A"}
              </span>
              <span>
                <b>Salary:</b> {job.salary ?? "N/A"}
              </span>
              <span>
                <b>Experience:</b> {job.experience ?? "N/A"} years
              </span>
              <span>
                <b>Hiring Date:</b> {formatDate(job.created_at)}
              </span>
            </div>

            <button className="delete-btn" onClick={() => deleteJob(job.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
