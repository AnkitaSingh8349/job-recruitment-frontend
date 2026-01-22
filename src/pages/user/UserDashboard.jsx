import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/user.api";

import DashboardStats from "./components/DashboardStats";
import "../../styles/dashboard.css";

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.email?.split("@")[0];

  const [stats, setStats] = useState(null);

  useEffect(() => {
    userApi.get("user/dashboard/")
      .then(res => setStats(res.data))
      .catch(() => {});
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard-home">
      <h1>👋 Hi, {name}</h1>
      <p className="subtext">Welcome to your job seeker dashboard</p>

      {/* RUNNING TEXT */}
      <marquee className="running-text">
        🚀 Apply jobs • Track applications • Attend interviews • Grow your career
      </marquee>

      {/* STATS */}
      <DashboardStats stats={stats} />

      {/* INFO */}
      <div className="info-box">
        <h3>Your Account</h3>
        <p>Email: {user.email}</p>
        <p>Role: Job Seeker</p>
        <p>Status: Active</p>
      </div>
    </div>
  );
}

export default UserDashboard;