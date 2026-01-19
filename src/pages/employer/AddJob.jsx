import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../admin/services/adminApi";
import "../../styles/AddjobEmp.css";

function AddJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company_name: "",   // ✅ ADDED
    location: "",
    job_type: "FT",
    salary: "",
    experience: "",
    description: "",
  });

  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // submit job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // send form as-is (company_name included)
      const res = await adminApi.post("/jobs/", form);

      navigate("/employer/jobs", { state: { refresh: true } });
    } catch (err) {
      console.error("CREATE JOB ERROR:", err.response?.data || err.message);
      setError("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="add-job-container">
      <h2>Add Job</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="add-job-form">

        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* ✅ Company Name added */}
        <input
          name="company_name"
          placeholder="Company Name"
          value={form.company_name}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <select name="job_type" value={form.job_type} onChange={handleChange}>
          <option value="FT">Full Time</option>
          <option value="PT">Part Time</option>
          <option value="CT">Contract</option>
          <option value="IN">Internship</option>
        </select>

        <input
          name="salary"
          placeholder="Salary (Negotiable / 50k-70k)"
          value={form.salary}
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Experience (2-4 years / Fresher)"
          value={form.experience}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default AddJob;
