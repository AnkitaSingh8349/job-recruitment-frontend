// src/pages/employer/EmployerDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/employerDashboard.css";
import {
  getEmployerDashboardStats,
  getEmployerProfile,
} from "../../api/employer.api";

import Navbar from "../../components/Navbar";


const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_jobs: 0,
    applications: 0,
    interviews: 0,
    hired: 0,
  });

  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const statsData = await getEmployerDashboardStats();
        const profileData = await getEmployerProfile();

        // Defensive: ensure objects exist and fallback to zero/empty strings
        setStats({
          total_jobs: statsData?.total_jobs ?? 0,
          applications: statsData?.applications ?? 0,
          interviews: statsData?.interviews ?? 0,
          hired: statsData?.hired ?? 0,
        });

        setProfile({
          company_name: profileData?.company_name ?? "",
          email: profileData?.email ?? "",
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  // Navigation helpers (adjust target routes if your routes differ)
  const goToPostJob = () => navigate("/employer/add-job");
  const goToMyJobs = () => navigate("/employer/jobs");
  const goToApplications = () => navigate("/employer/applications");
  const goToProfile = () => navigate("/employer/profile");

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard...</p>;
  }

  return (
    <div className="ed-dashboard">
      {/* Sidebar */}
      <aside className="ed-sidebar">
        <h2 className="ed-logo">HireHub</h2>
        <ul className="ed-nav">
          <li className="ed-nav-item" onClick={() => navigate("/employer/dashboard")}>
            Dashboard
          </li>
          <li className="ed-nav-item" onClick={goToPostJob}>
            Post Job
          </li>
          <li className="ed-nav-item" onClick={goToMyJobs}>
            My Jobs
          </li>
          <li className="ed-nav-item" onClick={goToApplications}>
            Applications
          </li>
          <li className="ed-nav-item" onClick={goToProfile}>
            Profile
          </li>
          <li className="ed-nav-item logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className="ed-main">
        {/* Header */}
        <header className="ed-header">
          <div>
            <h3>Employer Dashboard</h3>
            <div style={{ marginTop: 8 }}>
              <strong style={{ color: "#2563eb" }}>
                {profile.company_name || "Company"}
              </strong>
              <br />
              <small style={{ color: "#6b7280" }}>{profile.email || ""}</small>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="ed-stats">
          <div className="ed-card">
            <h4>Total Jobs</h4>
            <p>{stats.total_jobs}</p>
          </div>

          <div className="ed-card">
            <h4>Applications</h4>
            <p>{stats.applications}</p>
          </div>

          <div className="ed-card">
            <h4>Interviews</h4>
            <p>{stats.interviews}</p>
          </div>

          <div className="ed-card">
            <h4>Hired</h4>
            <p>{stats.hired}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmployerDashboard;
