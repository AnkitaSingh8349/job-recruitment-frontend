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

  // 🔹 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 FORM VALIDATION
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

    if (!form.experience.trim()) {
      err.experience = "Experience is required";
    }

    if (!form.expected_salary.trim()) {
      err.expected_salary = "Expected salary is required";
    }

    if (!form.preferred_language.trim()) {
      err.preferred_language = "Please select a language";
    }

    if (!form.cover_letter.trim()) {
      err.cover_letter = "Cover letter is required";
    } else if (form.cover_letter.length < 20) {
      err.cover_letter = "Minimum 20 characters required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 🔹 SUBMIT FORM (BACKEND MATCHING)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    api
      .post("applications/", {
        job: jobId,
        phone: form.phone,
        experience_years: form.experience,
        expected_salary: form.expected_salary,
        cover_letter: form.cover_letter,
      })
      .then(() => {
        alert("✅ Application submitted successfully!");
        navigate("/user/applications");
      })
      .catch((err) => {
        if (err.response?.data === "Already applied") {
          alert("⚠️ Aap already is job ke liye apply kar chuke ho");
        } else {
          alert("❌ Application submit nahi hui");
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="apply-container">
      <h2>Apply for Job</h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input name="full_name" onChange={handleChange} />
          {errors.full_name && (
            <p className="error-text">{errors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input name="email" onChange={handleChange} />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" onChange={handleChange} />
          {errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        {/* Experience */}
        <div className="form-group">
          <label>Experience (Years)</label>
          <input name="experience" onChange={handleChange} />
          {errors.experience && (
            <p className="error-text">{errors.experience}</p>
          )}
        </div>

        {/* Expected Salary */}
        <div className="form-group">
          <label>Expected Salary</label>
          <input name="expected_salary" onChange={handleChange} />
          {errors.expected_salary && (
            <p className="error-text">{errors.expected_salary}</p>
          )}
        </div>

        {/* Preferred Language */}
        <div className="form-group">
          <label>Preferred Language / Technology</label>
          <select name="preferred_language" onChange={handleChange}>
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

        {/* Cover Letter */}
        <div className="form-group">
          <label>Cover Letter</label>
          <textarea name="cover_letter" onChange={handleChange} />
          {errors.cover_letter && (
            <p className="error-text">{errors.cover_letter}</p>
          )}
        </div>

        <button className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

export default JobApply;
