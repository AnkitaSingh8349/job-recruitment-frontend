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

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ai-search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchText,
          filters: {
            location,
            job_type,
            work_mode,
            experience,
            salary,
          },
        }),
      });

      const data = await res.json();

      if (data.jobs_found && data.jobs.length > 0) {
        const filteredJobs = data.jobs.filter((job) => {
          let matched = false;

          // 🔍 SEARCH TEXT
          if (searchText) {
            const text = searchText.toLowerCase();
            const title = (
              job.title ||
              job.job_title ||
              job.name ||
              ""
            ).toLowerCase();
            const company = (job.company_name || "").toLowerCase();

            if (title.includes(text) || company.includes(text)) {
              matched = true;
            }
          }

          // 📍 LOCATION
          if (location && job.location) {
            if (job.location.toLowerCase().includes(location.toLowerCase())) {
              matched = true;
            }
          }

          // 🕒 JOB TYPE
          if (job_type) {
            const type = (
              job.job_type ||
              job.employment_type ||
              ""
            ).toLowerCase();

            if (
              (job_type === "full_time" && type.includes("full")) ||
              (job_type === "part_time" && type.includes("part")) ||
              (job_type === "internship" && type.includes("intern"))
            ) {
              matched = true;
            }
          }

          // 🏠 WORK MODE
          if (work_mode && job.work_mode) {
            if (job.work_mode.toLowerCase() === work_mode.toLowerCase()) {
              matched = true;
            }
          }

          // 🎓 EXPERIENCE
          if (experience && job.experience !== undefined) {
            const exp = parseInt(job.experience);
            if (!isNaN(exp) && exp >= Number(experience)) {
              matched = true;
            }
          }

          // 💰 SALARY
          if (salary && job.salary !== undefined) {
            const sal = parseInt(
              job.salary.toString().replace(/,/g, "")
            );
            if (!isNaN(sal) && sal >= Number(salary)) {
              matched = true;
            }
          }

          return matched;
        });

        if (filteredJobs.length === 0) {
          setNoMatch(true);
        } else {
          setJobs(filteredJobs);
        }
        return;
      }

      setNoMatch(true);
    } catch (err) {
      console.error("Search error", err);
      setShowGoogle(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= SEARCH ================= */}
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

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Experience</option>
            <option value="0">Fresher</option>
            <option value="1">1+ Year</option>
            <option value="2">2+ Years</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
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

      {/* ================= RESULTS ================= */}
      <div style={{ marginTop: 30 }}>
        <div className="job-grid">
          {jobs.map((job) => (
            <AjxJobCard key={job.id} job={job} />
          ))}
        </div>

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
