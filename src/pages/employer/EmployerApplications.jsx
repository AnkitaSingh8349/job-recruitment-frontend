import { useEffect, useState } from "react";
import {
  acceptApplication,
  rejectApplication,
  inviteInterview,
  deleteApplication,
} from "../../api/application.api";
import "./EmployerApplications.css";

const API = "http://127.0.0.1:8000/api";

export default function EmployerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // ===== MODAL STATE =====
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  const [message, setMessage] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("online");

  // =========================
  // AUTH HEADER
  // =========================
  const getAuthHeader = () => {
    const token = localStorage.getItem("access");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // =========================
  // FETCH APPLICATIONS
  // =========================
  const fetchApplications = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("access");
      if (!token) {
        setErrorMsg("Not logged in. Please login as admin or employer.");
        setApplications([]);
        return;
      }

      const res = await fetch(`${API}/applications/`, {
        headers: {
          ...getAuthHeader(),
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        setErrorMsg("Unauthorized. Please login again.");
        setApplications([]);
        return;
      }

      if (res.status === 403) {
        setErrorMsg("Forbidden. Admin or Employer access required.");
        setApplications([]);
        return;
      }

      // success
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch applications error:", err);
      setErrorMsg("Failed to load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access")) fetchApplications();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // SUBMIT ACTION
  // =========================
  const submitAction = async () => {
    try {
      if (!selectedApp) return;

      if (currentAction === "accept") {
        await acceptApplication(selectedApp.id, message);
      }

      if (currentAction === "reject") {
        await rejectApplication(selectedApp.id, message);
      }

      if (currentAction === "invite") {
        if (!scheduledAt || !location || !mode) {
          alert("Please fill all interview fields");
          return;
        }

        // keep your existing invite payload shape (your API helper must accept this)
        await inviteInterview({
          user_id: selectedApp.user_id,
          role: selectedApp.job_title || "Interview",
          scheduled_at: scheduledAt,
          mode: mode,
          location: location,
          message: message || "",
        });
      }

      setShowModal(false);
      setCurrentAction(null);
      setSelectedApp(null);
      setMessage("");
      setScheduledAt("");
      setLocation("");
      setMode("online");

      await fetchApplications();
    } catch (err) {
      console.error("Action error:", err);
      alert("Action failed");
    }
  };

  // =========================
  // AUTH CHECK
  // =========================
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  // If no token -> ask to login
  if (!localStorage.getItem("access"))
    return <p className="error">Please login as admin or employer.</p>;

  // Allow Admin OR Employer (is_superuser OR is_staff)
  if (!storedUser || !(storedUser.is_superuser || storedUser.is_staff))
    return <p className="error">Admin or Employer access required.</p>;

  if (loading) return <p className="loading">Loading applications...</p>;

  // =========================
  // RENDER
  // =========================
  return (
    <div className="admin-applications">
      <h2>Job Applications</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="applications-grid">
          {applications.map((app) => (
            <div className="application-card" key={app.id}>
              <h3>{app.job_title || "No Job Title"}</h3>

              <p>
                <strong>Name:</strong> {app.user_name || "-"}
              </p>
              <p>
                <strong>Email:</strong> {app.user_email || "-"}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {app.experience ? `${app.experience} yrs` : "-"}
              </p>

              <p>
                <strong>Technologies:</strong> {app.technologies || "-"}
              </p>

              <p>
                <strong>Applied:</strong>{" "}
                {app.applied_at ? new Date(app.applied_at).toLocaleString() : "-"}
              </p>

              <p>
                <strong>Status:</strong> {app.status}
              </p>

              {app.message && <div className="admin-message">{app.message}</div>}

              <div className="actions">
                <button
                  className="accept"
                  onClick={() => {
                    setSelectedApp(app);
                    setCurrentAction("accept");
                    setShowModal(true);
                  }}
                >
                  Accept
                </button>

                <button
                  className="invite"
                  onClick={() => {
                    setSelectedApp(app);
                    setCurrentAction("invite");
                    setShowModal(true);
                  }}
                >
                  Invite
                </button>

                <button
                  className="reject"
                  onClick={() => {
                    setSelectedApp(app);
                    setCurrentAction("reject");
                    setShowModal(true);
                  }}
                >
                  Reject
                </button>

                <button
                  className="delete"
                  onClick={async () => {
                    if (window.confirm("Are you sure?")) {
                      try {
                        await deleteApplication(app.id);
                        fetchApplications();
                      } catch (err) {
                        console.error("Delete error:", err);
                        alert("Delete failed");
                      }
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== MODAL ========== */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>
              {currentAction === "accept" && "Accept Application"}
              {currentAction === "reject" && "Reject Application"}
              {currentAction === "invite" && "Invite for Interview"}
            </h3>

            <textarea
              placeholder="Message to candidate"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {currentAction === "invite" && (
              <>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />

                <select value={mode} onChange={(e) => setMode(e.target.value)}>
                  <option value="online">Online</option>
                  <option value="onsite">Onsite</option>
                </select>

                <input
                  type="text"
                  placeholder="Interview location / meeting link"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </>
            )}

            <div className="modal-actions">
              <button onClick={submitAction}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
