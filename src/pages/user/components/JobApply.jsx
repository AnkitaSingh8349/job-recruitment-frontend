import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../../api/user.api";
import "../../../styles/JobApply.css";

function JobApply() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    experience: "",
    expected_salary: "",
    preferred_language: "",
    cover_letter: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE (controlled inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // SIMPLE VALIDATION
  const validate = () => {
    let err = {};

    if (!form.full_name.trim()) err.full_name = "Full name is required";

    if (!form.email.trim()) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email format";
    }

    if (!form.phone.trim()) {
      err.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      err.phone = "Phone must be 10 digits";
    }

    if (!form.experience.toString().trim()) {
      err.experience = "Experience is required";
    }

    if (!form.expected_salary.toString().trim()) {
      err.expected_salary = "Expected salary is required";
    }

    if (!form.preferred_language.trim()) {
      err.preferred_language = "Please select a technology";
    }

    if (!form.cover_letter.trim()) {
      err.cover_letter = "Cover letter is required";
    } else if (form.cover_letter.length < 20) {
      err.cover_letter = "Minimum 20 characters required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    api
      .post("applications/", {
        job: jobId,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        experience_years: form.experience,
        expected_salary: form.expected_salary,
        preferred_technology: form.preferred_language,
        cover_letter: form.cover_letter,
      })
      .then(() => {
        navigate("/user/applications", { replace: true });
      })
      .catch((err) => {
        // handle "Already applied" message from backend
        if (err?.response?.data?.detail === "Already applied") {
          alert("⚠️ You have already applied for this job");
          navigate("/user/applications", { replace: true });
        } else {
          console.error(err);
          alert("❌ Application submit failed");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="apply-container">
      <h2>Apply for Job</h2>

      <form className="apply-form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.full_name && <p className="error-text">{errors.full_name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="10 digit phone"
            inputMode="numeric"
          />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        {/* Experience */}
        <div className="form-group">
          <label htmlFor="experience">Experience (Years)</label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            value={form.experience}
            onChange={handleChange}
            placeholder="e.g. 2"
          />
          {errors.experience && <p className="error-text">{errors.experience}</p>}
        </div>

        {/* Expected Salary */}
        <div className="form-group">
          <label htmlFor="expected_salary">Expected Salary</label>
          <input
            id="expected_salary"
            name="expected_salary"
            type="number"
            min="0"
            value={form.expected_salary}
            onChange={handleChange}
            placeholder="expected salary"
          />
          {errors.expected_salary && (
            <p className="error-text">{errors.expected_salary}</p>
          )}
        </div>

        {/* Preferred Technology */}
        <div className="form-group">
          <label htmlFor="preferred_language">Preferred Language / Technology</label>
          <select
            id="preferred_language"
            name="preferred_language"
            value={form.preferred_language}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="React">React</option>
            <option value="Node">Node</option>
            <option value="Other">Other</option>
          </select>
          {errors.preferred_language && (
            <p className="error-text">{errors.preferred_language}</p>
          )}
        </div>

        {/* Cover Letter (full width) */}
        <div className="form-group full-width">
          <label htmlFor="cover_letter">Cover Letter</label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            value={form.cover_letter}
            onChange={handleChange}
            placeholder="Write a short cover letter (min 20 characters)"
          />
          {errors.cover_letter && (
            <p className="error-text">{errors.cover_letter}</p>
          )}
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default JobApply;
