import { useNavigate } from "react-router-dom";
import "./AjxJobCard.css";

const AjxJobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    const accessToken = localStorage.getItem("access");

    // ❌ NOT LOGGED IN → LOGIN WITH NEXT
    if (!accessToken) {
      navigate(`/login?next=/apply/${job.id}`);
      return;
    }

    // ✅ LOGGED IN → DIRECT APPLY PAGE
    navigate(`/apply/${job.id}`);
  };

  return (
    <div className="job-card">
      <div className="job-title">{job.title}</div>

      <div className="job-company">
        {job.company_name || "Company not specified"}
      </div>

      <div className="job-location">{job.location}</div>

      <div className="job-details">
        <span className="job-badge">{job.job_type}</span>
        <span className="job-badge">{job.experience}</span>
        <span className="job-badge">{job.salary}</span>
      </div>

      <div className="job-date">
        Hiring Date:{" "}
        {job.created_at
          ? new Date(job.created_at).toDateString()
          : "N/A"}
      </div>

      <button className="apply-btn" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default AjxJobCard;
