import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= REDIRECT HANDLING ================= */
  const searchParams = new URLSearchParams(location.search);
  const nextUrl = searchParams.get("next"); // ?next=/apply/123
  const redirectFromState = location.state?.from || null;

  /* ================= AUTH CHECK ================= */
  const access = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  if (access && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }
    return <Navigate to="/user/dashboard" replace />;
  }

  /* ================= FORM STATE ================= */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password required");
      return;
    }

    try {
      const data = await loginUser(formData);

      /* ✅ SAVE AUTH DATA */
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccessMessage("Login successful");

      /* ================= FINAL REDIRECT PRIORITY ================= */
      setTimeout(() => {
        if (nextUrl) {
          navigate(nextUrl, { replace: true });
        } else if (data.user.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (data.user.role === "employer") {
          navigate("/employer/dashboard", { replace: true });
        } else if (redirectFromState) {
          navigate(redirectFromState, { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }, 500);

    } catch (err) {
      console.error(err);
      setErrorMessage(err?.detail || "Invalid credentials");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {successMessage && (
          <p style={{ color: "green", marginBottom: "10px" }}>
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <div className="or-text">OR</div>

        <div className="google-btn">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
