import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/EmployerDashboard.module.css";

// -------------------------
// API BASE (MATCH BACKEND)
// -------------------------
const API_BASE = "http://localhost:8000";

// -------------------------
// AUTH HEADER (FINAL FIX – DO NOT CHANGE KEY NAME)
// -------------------------
// Read the token stored by your auth flow. Prefer "access" (common) but
// fall back to "token" if present so this component works either way.
const authHeaders = () => {
  const token = localStorage.getItem("access") || localStorage.getItem("token");

  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

// -------------------------
// DASHBOARD STATS
// -------------------------
const getEmployerDashboardStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/employer/dashboard/stats/`, {
      headers: authHeaders(),
    });

    // If backend says unauthorized, clear token and force login
    if (res.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("token");
      // Hard redirect to login so user can re-auth
      window.location.href = "/login";
      return {
        total_jobs: 0,
        active_jobs: 0,
        expired_jobs: 0,
        expiring_soon: 0,
      };
    }

    if (!res.ok) {
      console.error("Dashboard API failed:", res.status);
      return {
        total_jobs: 0,
        active_jobs: 0,
        expired_jobs: 0,
        expiring_soon: 0,
      };
    }

    const json = await res.json();
    console.log("DASHBOARD API RESPONSE:", json);

    return {
      total_jobs: json.total_jobs ?? 0,
      active_jobs: json.active_jobs ?? 0,
      expired_jobs: json.expired_jobs ?? 0,
      expiring_soon: json.expiring_soon ?? 0,
    };
  } catch (err) {
    console.error("Dashboard stats error", err);
  }

  return {
    total_jobs: 0,
    active_jobs: 0,
    expired_jobs: 0,
    expiring_soon: 0,
  };
};

// -------------------------
// EMPLOYER PROFILE
// -------------------------
const getEmployerProfile = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/employer/profile/`, {
      headers: authHeaders(),
    });

    if (res.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return { company_name: "", email: "", avatar_url: "" };
    }

    if (res.ok) {
      const json = await res.json();
      return {
        company_name: json.company_name ?? "",
        email: json.email ?? "",
        avatar_url: "",
      };
    }
  } catch (err) {
    console.error("Profile fetch error", err);
  }

  return { company_name: "", email: "", avatar_url: "" };
};

// -------------------------
// MAIN COMPONENT
// -------------------------
const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_jobs: 0,
    active_jobs: 0,
    expired_jobs: 0,
    expiring_soon: 0,
  });

  const [profile, setProfile] = useState({
    company_name: "",
    email: "",
    avatar_url: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [dashboardStats, employerProfile] = await Promise.all([
          getEmployerDashboardStats(),
          getEmployerProfile(),
        ]);

        setStats(dashboardStats);
        setProfile(employerProfile);
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleLogout = () => {
    // Remove all possible token keys
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("token");
    window.location.href = "/login"; // hard reload
  };

  const goToPostJob = () => navigate("/employer/add-job");
  const goToApplications = () => navigate("/employer/applications");
  const goToProfile = () => navigate("/employer/profile");
  const goToJobs = (filter) => navigate(`/employer/jobs?filter=${filter}`);

  if (loading) {
    return <div className={styles["ed-loading"]}>Loading dashboard...</div>;
  }

  return (
    <div className={styles["ed-dashboard"]}>
      {/* Sidebar */}
      <aside className={styles["ed-sidebar"]}>
        <div className={styles["ed-side-top"]}>
          <div className={styles["ed-avatar"]}>
            <div className={styles["ed-avatar-fallback"]}>
              {profile.company_name || "Company"}
            </div>
          </div>

          <div className={styles["ed-company"]}>
            <div className={styles["ed-company-name"]}>
              {profile.company_name || "Company"}
            </div>
            <div className={styles["ed-company-sub"]}>You n Employer...</div>
          </div>
        </div>

        <ul className={styles["ed-nav"]}>
          <li
            className={styles["active"]}
            onClick={() => navigate("/employer/dashboard")}
          >
            <span className={styles["icon"]}>🏠</span> Dashboard
          </li>
          <li onClick={goToPostJob}>
            <span className={styles["icon"]}>➕</span> Post Job
          </li>
          <li onClick={() => goToJobs("all")}>
            <span className={styles["icon"]}>📄</span> My Jobs
          </li>
          <li onClick={goToApplications}>
            <span className={styles["icon"]}>📥</span> Applications
          </li>
          <li onClick={goToProfile}>
            <span className={styles["icon"]}>⚙️</span> Profile
          </li>
          <li className={styles["logout"]} onClick={handleLogout}>
            <span className={styles["icon"]}>⬅️</span> Logout
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className={styles["ed-main"]}>
        <header className={styles["ed-header"]}>
          <div>
            <h1 className={styles["ed-title"]}>Employer Dashboard</h1>
            <p className={styles["ed-subtext"]}>{profile.email}</p>
          </div>
        </header>

        <section className={styles["ed-stats"]}>
          <article
            className={`${styles["ed-card"]} ${styles["ed-blue"]}`}
            onClick={() => goToJobs("all")}
          >
            <div className={styles["ed-card-icon"]}>💼</div>
            <div className={styles["ed-card-title"]}>Total Jobs</div>
            <div className={styles["ed-card-number"]}>{stats.total_jobs}</div>
          </article>

          <article
            className={`${styles["ed-card"]} ${styles["ed-green"]}`}
            onClick={() => goToJobs("active")}
          >
            <div className={styles["ed-card-icon"]}>✅</div>
            <div className={styles["ed-card-title"]}>Active Jobs</div>
            <div className={styles["ed-card-number"]}>{stats.active_jobs}</div>
          </article>

          <article
            className={`${styles["ed-card"]} ${styles["ed-grey"]}`}
            onClick={() => goToJobs("expired")}
          >
            <div className={styles["ed-card-icon"]}>✖️</div>
            <div className={styles["ed-card-title"]}>Expired Jobs</div>
            <div className={styles["ed-card-number"]}>
              {stats.expired_jobs}
            </div>
          </article>

          <article
            className={`${styles["ed-card"]} ${styles["ed-orange"]}`}
            onClick={() => goToJobs("expiring")}
          >
            <div className={styles["ed-card-icon"]}>⏳</div>
            <div className={styles["ed-card-title"]}>Expiring Soon</div>
            <div className={styles["ed-card-number"]}>
              {stats.expiring_soon}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default EmployerDashboard;
