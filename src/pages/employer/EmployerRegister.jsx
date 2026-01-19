import React, { useState } from "react";
import { registerEmployer } from "../../api/employer.api";
import "../../styles/employerRegister.css";

const EmployerRegister = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    /* ================= FRONTEND VALIDATION ================= */
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

      alert("Employer registered successfully");

      setCompanyName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      /* ================= BACKEND VALIDATION ================= */
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

  return (
    <div className="employer-register-container">
      <div className="employer-register-box">
        <h2>Employer Register</h2>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          Already registered? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
