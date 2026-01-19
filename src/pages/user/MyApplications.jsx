import { useEffect, useState } from "react";
import "./MyApplications.css";

const API = "http://127.0.0.1:8000/api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // accept | reschedule
  const [activeInterview, setActiveInterview] = useState(null);
  const [modalDateTime, setModalDateTime] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("access");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // =========================
  // LOAD DATA
  // =========================
 useEffect(() => {
  async function loadData() {
    setLoading(true);
    try {
      // ✅ USER APPLICATIONS
      const appsRes = await fetch(`${API}/applications/`, {
        headers: authHeaders,
      });
      const appsData = await appsRes.json();
      setApplications(Array.isArray(appsData) ? appsData : []);

      // ✅ USER INTERVIEWS (DASHBOARD)
      const intRes = await fetch(`${API}/user/dashboard/interviews/`, {
        headers: authHeaders,
      });
      const intData = await intRes.json();
      setInterviews(Array.isArray(intData) ? intData : []);
    } catch (err) {
      console.error("Load error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (token) loadData();
}, []);

if (loading) return <p className="loading">Loading...</p>;

  // =========================
  // 🔔 UNREAD NOTIFICATION COUNT
  // =========================
  const unreadCount = interviews.filter(
    (i) =>
      i.admin_message &&
      i.status !== "accepted" &&
      i.status !== "rejected"
  ).length;

  // =========================
  // STATUS CLICK
  // =========================
  const onStatusClick = (interview) => {
    if (interview.status === "accepted" || interview.status === "rejected")
      return;

    if (interview.status === "accepted") setModalType("accept");
    else setModalType("reschedule");

    setActiveInterview(interview);
    setModalDateTime("");
    setModalMessage("");
    setShowModal(true);
  };

  // =========================
  // SUBMIT RESPONSE
  // =========================
  const submitModal = async () => {
  if (!activeInterview) return;
  setSubmitting(true);

  let message = modalMessage || "";
  if (modalDateTime) {
    message += `\nPreferred time: ${new Date(modalDateTime).toLocaleString()}`;
  }

  try {
    await fetch(`${API}/user/dashboard/interview/respond/`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        interview_id: activeInterview.id,
        status: modalType === "accept" ? "accepted" : "rejected",
        message: message,
      }),
    });

    alert("Response sent to HR");
    setShowModal(false);
  } catch (err) {
    alert("Failed to send");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="applications-container">
      {/* APPLICATIONS */}
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p className="muted">No applications found.</p>
      ) : (
        <div className="apps-grid">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="card-head">
                <h3>{app.job_title}</h3>
                <span className={`status ${app.status}`}>
                  {app.status}
                </span>
              </div>

              {app.admin_message && (
                <div className="admin-message">
                  <strong>Message:</strong>
                  <div>{app.admin_message}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* INTERVIEWS */}
      <h2 style={{ marginTop: 30 }}>
        My Interviews
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount}</span>
        )}
      </h2>

      {interviews.length === 0 ? (
        <p className="muted">No interviews scheduled.</p>
      ) : (
        <div className="apps-grid">
          {interviews.map((i) => (
            <div key={i.id} className="application-card interview-card">
              <div className="card-head">
                <h3>{i.role}</h3>
                <span
                  className={`status ${i.status}`}
                  onClick={() => onStatusClick(i)}
                  style={{
                    cursor:
                      i.status === "accepted" || i.status === "rejected"
                        ? "not-allowed"
                        : "pointer",
                    opacity:
                      i.status === "accepted" || i.status === "rejected"
                        ? 0.6
                        : 1,
                  }}
                >
                  {i.status}
                </span>
              </div>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(i.scheduled_at).toLocaleString()}
              </p>
              <p><strong>Mode:</strong> {i.mode}</p>
              <p><strong>Location:</strong> {i.location}</p>

              {i.admin_message && (
                <div className="admin-message">
                  <strong>HR:</strong>
                  <div>{i.admin_message}</div>
                </div>
              )}

              {/* 🟢 STATUS TIMELINE */}
              <div className="timeline">
                <span className="done">Applied</span>
                <span className="done">Interview</span>
                <span className={i.status === "accepted" ? "done" : ""}>
                  Responded
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              {modalType === "accept"
                ? "Interview Availability"
                : "Request Interview Reschedule"}
            </h3>

            <input
              type="datetime-local"
              value={modalDateTime}
              onChange={(e) => setModalDateTime(e.target.value)}
            />

            <textarea
              placeholder="Message to HR"
              value={modalMessage}
              onChange={(e) => setModalMessage(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={submitModal} disabled={submitting}>
                Submit
              </button>
              <button
                className="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
