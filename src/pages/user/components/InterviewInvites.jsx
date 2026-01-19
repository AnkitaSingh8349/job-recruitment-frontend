import { useState } from "react";
import userApi from "../../../api/user.api";
import "../../../styles/InterviewInvites.css";

function InterviewInvites({ interview }) {
  const [loading, setLoading] = useState(false);

  // 🛡️ SAFETY CHECK
  if (!interview) return null;

  const handleResponse = async (status) => {
    if (!window.confirm(`Are you sure you want to ${status}?`)) return;

    try {
      setLoading(true);

      await userApi.post("/user/dashboard/interview/respond/", {
        interview_id: interview.id,
        status,
        message:
          status === "accepted"
            ? "I will attend"
            : "Sorry, I am not available",
      });

      alert(`Interview ${status}. Admin notified.`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h3>🎯 Interview Invitation</h3>

      <div className="card">
        <h4>{interview.role}</h4>

        <p>📅 {new Date(interview.scheduled_at).toDateString()}</p>
        <p>⏰ {new Date(interview.scheduled_at).toLocaleTimeString()}</p>
        <p>💻 Mode: <strong>{interview.mode}</strong></p>

        <p>
          📍{" "}
          <a href={interview.location} target="_blank" rel="noreferrer">
            {interview.location}
          </a>
        </p>

        <div className="action-row">
          <button
            className="btn-primary"
            disabled={loading}
            onClick={() => handleResponse("accepted")}
          >
            Accept
          </button>

          <button
            className="btn-danger"
            disabled={loading}
            onClick={() => handleResponse("rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewInvites;
