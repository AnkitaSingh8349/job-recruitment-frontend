import { useNavigate } from "react-router-dom";
import "./AjxJobCard.css";

const AjxJobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      navigate(`/login?next=/apply/${job.id}`);
      return;
    }
    navigate(`/apply/${job.id}`);
  };

  return (
    <div className="emp-job-card">
      {/* ===== TITLE ===== */}
      <h3 className="emp-job-title">
        {job.title || job.job_title || "Job Title"}
      </h3>

      {/* ===== COMPANY ===== */}
      <p className="emp-company">
        <i className="fa fa-building icon-blue"></i>
        <strong>{job.company_name || "Company"}</strong>
      </p>

      {/* ===== OPTIONAL SHORT DESCRIPTION (REMOVE IF NOT NEEDED) ===== */}
      {job.description && (
        <p className="emp-desc">
          {job.description.length > 80
            ? job.description.slice(0, 80) + "..."
            : job.description}
        </p>
      )}

      {/* ===== TAGS ===== */}
      <div className="emp-tags">
        {job.location && (
          <span className="tag blue">
            <i className="fa fa-map-marker"></i>
            {job.location}
          </span>
        )}

        {job.salary && (
          <span className="tag green">
            <i className="fa fa-money"></i>
            {job.salary}
          </span>
        )}

        {job.experience !== undefined && (
          <span className="tag purple">
            <i className="fa fa-briefcase"></i>
            {job.experience} yrs
          </span>
        )}

        {job.job_type && (
          <span className="tag orange">
            <i className="fa fa-clock-o"></i>
            {job.job_type.replace("_", " ").toUpperCase()}
          </span>
        )}

        {job.created_at && (
          <span className="tag orange">
            <i className="fa fa-calendar"></i>
            {new Date(job.created_at).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* ===== APPLY BUTTON ===== */}
      <button className="apply-btn full" onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default AjxJobCard;
