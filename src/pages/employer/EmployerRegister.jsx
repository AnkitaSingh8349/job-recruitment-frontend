import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerEmployer } from "../../api/employer.api";
import "../../styles/employerRegister.css";

const EmployerRegister = () => {
  const navigate = useNavigate();

  /* ================= AUTH CHECK (IMPORTANT FIX) ================= */
 useEffect(() => {
  const token = localStorage.getItem("access");
  const user = JSON.parse(localStorage.getItem("user"));

  if (token && user) {
    if (user.role === "employer") {
      navigate("/employer/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }
}, [navigate]);

  /* ================= STATES ================= */
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= SUBMIT HANDLER ================= */
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Frontend validation
    if (!companyName || !email || !password) {
      setErrorMsg("All fields are required");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await registerEmployer({
        company_name: companyName,
        email: email,
        password: password,
      });

      setSuccessMsg("Employer registered successfully");

      setCompanyName("");
      setEmail("");
      setPassword("");

      // Redirect same as login flow
      setTimeout(() => {
        navigate("/employer/dashboard", { replace: true });
      }, 800);

    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;

        if (data.email) {
          setErrorMsg(data.email[0]);
        } else if (data.company_name) {
          setErrorMsg(data.company_name[0]);
        } else {
          setErrorMsg("Registration failed");
        }
      } else {
        setErrorMsg("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="employer-register-container">
      <div className="employer-register-box">
        <h2>Employer Register</h2>

        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="employer-register-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="employer-register-footer">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
