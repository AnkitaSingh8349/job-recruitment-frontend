import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_STACK_KEY = "nav_stack";
const MAX_STACK_LENGTH = 50;
const SKIP_WHEN_LOGGED_IN = ["/login"];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= AUTH STATE ================= */
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  const role = user?.role; // admin | user | employer

  /* ================= SYNC AUTH ================= */
  const syncAuth = useCallback(() => {
    const token = localStorage.getItem("access");
    let u = null;
    try {
      u = JSON.parse(localStorage.getItem("user"));
    } catch {
      u = null;
    }
    setIsLoggedIn(!!token);
    setUser(u);
  }, []);

  useEffect(() => {
    syncAuth();
  }, [location.pathname, syncAuth]);

  /* ================= NAV STACK ================= */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(NAV_STACK_KEY) || "[]";
      const stack = JSON.parse(raw);
      const last = stack[stack.length - 1];
      if (last !== location.pathname) {
        stack.push(location.pathname);
        if (stack.length > MAX_STACK_LENGTH) stack.shift();
        sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(stack));
      }
    } catch {
      sessionStorage.setItem(
        NAV_STACK_KEY,
        JSON.stringify([location.pathname])
      );
    }
  }, [location.pathname]);

  const popStack = (count = 1) => {
    try {
      const raw = sessionStorage.getItem(NAV_STACK_KEY) || "[]";
      const stack = JSON.parse(raw);
      if (count >= stack.length) {
        sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify([]));
        return [];
      }
      const newStack = stack.slice(0, stack.length - count);
      sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(newStack));
      return newStack;
    } catch {
      sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify([]));
      return [];
    }
  };

  const getStack = () => {
    try {
      return JSON.parse(sessionStorage.getItem(NAV_STACK_KEY) || "[]");
    } catch {
      return [];
    }
  };

  /* ================= BACK BUTTON ================= */
  const handleBack = () => {
    const stack = getStack();

    if (isLoggedIn) {
      for (let i = stack.length - 2; i >= 0; i--) {
        const candidate = stack[i];
        if (!SKIP_WHEN_LOGGED_IN.includes(candidate)) {
          const newStack = stack.slice(0, i + 1);
          sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(newStack));
          navigate(candidate);
          return;
        }
      }
      sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(["/"]));
      navigate("/", { replace: true });
      return;
    }

    if (location.pathname === "/login") {
      navigate("/", { replace: true });
      sessionStorage.setItem(NAV_STACK_KEY, JSON.stringify(["/"]));
      return;
    }

    if (stack.length > 1) {
      const prev = stack[stack.length - 2];
      popStack(1);
      navigate(prev);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setUser(null);

    sessionStorage.removeItem(NAV_STACK_KEY);
    navigate("/", { replace: true });
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  /* ================= UI ================= */
  return (
    <header className="app-navbar">
      <div className="nav-left">
        <button className="nav-back" onClick={handleBack}>
          ← Back
        </button>

        <Link to="/" className={`nav-logo ${isActive("/") ? "active" : ""}`}>
          Job Recruitment
        </Link>
      </div>

      <nav className="nav-right">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          Home
        </Link>

        {/* ✅ EMPLOYER REGISTER LINK */}
        {!isLoggedIn && (
          <Link
            to="/employer/register"
            className={`nav-link ${
              isActive("/employer/register") ? "active" : ""
            }`}
          >
            Employer Register
          </Link>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        ) : (
          <button className="nav-btn danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
