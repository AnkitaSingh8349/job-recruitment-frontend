import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // ================= REDIRECT HANDLING =================
  const searchParams = new URLSearchParams(location.search);
  const nextUrl = searchParams.get("next"); // 👈 from ?next=/apply/123
  const redirectFromState = location.state?.from || null;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  useEffect(() => {
    const access = localStorage.getItem("access");
    const user = localStorage.getItem("user");

    if (access && user) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email and password required");
      return;
    }

    try {
      const data = await loginUser(formData);

      // ✅ SAVE AUTH DATA
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      // ================= FINAL REDIRECT PRIORITY =================
      if (nextUrl) {
        // 🔥 APPLY FLOW (HIGHEST PRIORITY)
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

    } catch (err) {
      console.error(err);
      alert(err?.detail || "Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

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
