import { useEffect, useState } from "react";
import userApi from "../../api/user.api";

import DashboardStats from "./components/DashboardStats";
import RecentApplications from "./components/RecentApplications";
import RecommendedJobs from "./components/RecommendedJobs";
import InterviewInvites from "./components/InterviewInvites";

import "../../styles/dashboard.css";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);
  const [interviews, setInterviews] = useState([]);   // ✅ NEW
  const [error, setError] = useState("");

  useEffect(() => {
    userApi.get("user/dashboard/")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load dashboard"));

    // ✅ INTERVIEWS API
    userApi.get("user/dashboard/interviews/")
      .then((res) => setInterviews(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (error) return <p className="dash-error">{error}</p>;
  if (!stats) return <p className="dash-loading">Loading dashboard...</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>👋 Hi, {user?.email?.split("@")[0]}</h2>
          <p>Here’s what’s happening with your job search today</p>
        </div>
      </div>

      <DashboardStats stats={stats} />

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <RecentApplications />
          <RecommendedJobs />
        </div>

        <div className="dashboard-side">
          {interviews.length === 0 ? (
            <p>No interview invitations</p>
          ) : (
            interviews.map((item) => (
              <InterviewInvites key={item.id} interview={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
