import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaArrowLeft,
  FaHome,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import "./UserNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.email?.split("@")[0] || "User";

  const [search, setSearch] = useState("");

  /* ✅ SMART BACK BUTTON */
  const handleBack = () => {
    const blockedPaths = ["/login", "/register"];

    const referrer = document.referrer;
    const previousPath = referrer
      ? new URL(referrer).pathname
      : "";

    // ❌ agar login/register se aaya hai
    if (blockedPaths.includes(previousPath)) {
      navigate("/user/dashboard", { replace: true });
      return;
    }

    // ✅ agar history safe hai
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  };

  /* ✅ LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload(); // 🔒 prevent back to dashboard
  };

  return (
    <header className="user-navbar">
      {/* LEFT */}
      <div className="nav-left">
        <button className="nav-btn back" onClick={handleBack}>
          <FaArrowLeft /> Back
        </button>

        <NavLink to="/" className="nav-btn home">
          <FaHome /> Home
        </NavLink>

        <span className="brand">User Dashboard</span>

        <nav className="nav-links">
          <NavLink to="/user/dashboard">Dashboard</NavLink>

          <NavLink to="/user/applications">Applications</NavLink>

          <NavLink to="/user/recommended-jobs">
            Recommended Jobs
          </NavLink>

          <NavLink to="/user/recent-applications">
            Recent Applications
          </NavLink>
        </nav>
      </div>

      {/* SEARCH */}
      <div className="nav-search">
        <FaSearch />
        <input
          type="text"
          placeholder="Search company or job title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <span className="username">👋 {name}</span>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
}

export default UserNavbar;
