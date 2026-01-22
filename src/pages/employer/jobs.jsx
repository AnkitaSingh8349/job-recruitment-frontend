import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import adminApi from "../admin/services/adminApi";
import "../../styles/JobEmp.css";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 URL se filter read karo
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter"); 
  // filter = expired | expiring | active | null

  // ============================
  // FETCH JOBS (FILTER AWARE)
  // ============================
  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      let url = "/employer/jobs/";

      // ✅ filter backend ko bhejo
      if (filter) {
        url += `?filter=${filter}`;
      }

      const res = await adminApi.get(url);
      setJobs(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // DELETE JOB
  // ============================
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await adminApi.delete(`/jobs/${id}/`);
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  // ============================
  // HELPERS
  // ============================
  const getCompanyName = (job) => {
    if (job.company_name) return job.company_name;
    if (job.company && typeof job.company === "object" && job.company.name) {
      return job.company.name;
    }
    if (job.company) return job.company;
    return "Unknown Company";
  };

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleDateString("en-IN");
    } catch {
      return iso;
    }
  };

  // ============================
  // EMPTY MESSAGE BASED ON FILTER
  // ============================
  const renderEmptyMessage = () => {
    if (filter === "expired") return "No expired jobs found.";
    if (filter === "expiring") return "No jobs expiring in next 5 days.";
    if (filter === "active") return "No active jobs found.";
    return "No jobs posted yet.";
  };

  // ============================
  // UI
  // ============================
  return (
    <div className="jobs-page">
      <h2 className="page-title">My Jobs</h2>

      {loading && <p style={{ padding: "20px" }}>Loading jobs...</p>}

      {error && <p className="error-text">{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p style={{ padding: "20px" }}>{renderEmptyMessage()}</p>
      )}

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>

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
                <b>Posted On:</b> {formatDate(job.created_at)}
              </span>
              <span>
                <b>Expires On:</b>{" "}
                {job.expiry_date ? formatDate(job.expiry_date) : "No expiry"}
              </span>
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
