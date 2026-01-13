import { useEffect, useState } from "react";
import userApi from "../../api/user.api";

import DashboardStats from "./components/DashboardStats";
import RecentApplications from "./components/RecentApplications";
import RecommendedJobs from "./components/RecommendedJobs";
import ProfileCompletion from "./components/ProfileCompletion";
import InterviewInvites from "./components/InterviewInvites";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    userApi
      .get("user/dashboard/")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load dashboard");
      });
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2>👋 Hi, {user?.email?.split("@")[0]}</h2>
        <p>Here’s what’s happening with your job search today</p>
      </div>

      <DashboardStats stats={stats} />
      <RecentApplications />
      <RecommendedJobs />
      <ProfileCompletion percent={70} />
      <InterviewInvites />
    </div>
  );
}

export default UserDashboard;
