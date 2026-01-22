import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  // ✅ MESSAGE STATES (ONLY UI)
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // clear old messages
    setErrorMsg("");
    setSuccessMsg("");

    // ❌ alert → ✅ message (SAME validation)
    if (!formData.email.includes("@")) {
      setErrorMsg("Enter valid email");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    const payload = {
      username: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const data = await registerUser(payload);

      // ✅ SAVE TOKENS (SAME)
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ❌ alert → ✅ message
      setSuccessMsg("Registration successful");

      // ✅ SAME REDIRECT LOGIC
      setTimeout(() => {
        if (data.user?.role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else {
          navigate("/user/dashboard", { replace: true });
        }
      }, 800);

    } catch (err) {
      // ✅ BACKEND VALIDATION (email already exists, etc.)
      if (err.response && err.response.data) {
        const data = err.response.data;

        if (data.email) {
          setErrorMsg(data.email[0]); // email already exists
        } else if (data.username) {
          setErrorMsg(data.username[0]);
        } else if (data.detail) {
          setErrorMsg(data.detail);
        } else {
          setErrorMsg("Registration failed");
        }
      } else {
        setErrorMsg("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create an Account</h2>

        {/* ✅ MESSAGE UI */}
        {successMsg && (
          <p style={{ color: "green", marginBottom: "10px" }}>
            {successMsg}
          </p>
        )}

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-row">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>

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

          <button type="submit">Register</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <div className="or-text">OR</div>

        <div className="google-btn">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
}

export default Register;
