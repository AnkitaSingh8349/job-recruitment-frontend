import { useState } from "react";
import AjxJobCard from "./AjxJobCard";
import "../styles/AjxSearch.css";

const AjxSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [job_type, setJobType] = useState("");
  const [work_mode, setWorkMode] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setJobs([]);
    setShowGoogle(false);
    setNoMatch(false);

    const payload = {
      query: searchText,
      filters: {
        location,
        job_type,
        work_mode,
        experience,
        salary,
      },
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ai-search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.jobs_found && data.jobs.length > 0) {
        setJobs(data.jobs);
        return;
      }

      if (data.jobs_found === true && data.jobs.length === 0) {
        setNoMatch(true);
        return;
      }

      setShowGoogle(true);
    } catch (err) {
      console.error("Search error", err);
      setShowGoogle(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-card">
        <div className="search-grid">
          <input
            type="text"
            placeholder="Job title or company"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search Jobs"}
          </button>
        </div>

        <div className="filters-grid">
          <select value={job_type} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Job Type</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="internship">Internship</option>
          </select>

          <select value={work_mode} onChange={(e) => setWorkMode(e.target.value)}>
            <option value="">Work Mode</option>
            <option value="remote">Remote</option>
            <option value="onsite">Onsite</option>
            <option value="hybrid">Hybrid</option>
          </select>

          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="">Experience</option>
            <option value="0">Fresher</option>
            <option value="1">1+ Year</option>
            <option value="2">2+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
            <option value="7">7+ Years</option>
            <option value="10">10+ Years</option>
          </select>

          <select value={salary} onChange={(e) => setSalary(e.target.value)}>
            <option value="">Salary (₹ LPA)</option>
            <option value="3">₹3 LPA+</option>
            <option value="6">₹6 LPA+</option>
            <option value="10">₹10 LPA+</option>
            <option value="15">₹15 LPA+</option>
            <option value="20">₹20 LPA+</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        {jobs.length > 0 &&
          jobs.map((job) => <AjxJobCard key={job.id} job={job} />)}

        {noMatch && (
          <p style={{ textAlign: "center", color: "#ff9800" }}>
            No jobs match your filters. Try changing filters.
          </p>
        )}

        {showGoogle && (
          <div className="google-card">
            <p>No jobs found on our portal.</p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                searchText
              )}+jobs`}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔍 Search jobs on Google
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default AjxSearch;
