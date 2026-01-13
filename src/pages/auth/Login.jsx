import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      // 🔥 CLEAR ANY OLD TOKENS (ADMIN / USER)
      localStorage.clear();

      // 🔥 STORE TOKENS ROLE-WISE
      if (data.user?.role === "admin") {
        localStorage.setItem("admin_access", data.access);
        localStorage.setItem("admin_refresh", data.refresh);
      } else {
        localStorage.setItem("user_access", data.access);
        localStorage.setItem("user_refresh", data.refresh);
      }

      // 🔥 STORE USER INFO
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful");

      // 🔥 ROLE BASED REDIRECT
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
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
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
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
