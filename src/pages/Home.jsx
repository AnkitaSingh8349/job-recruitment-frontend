const Home = () => {
  return (
    <div className="page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">AJX Recruiter</h1>

          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#">Companies</a>
            <a href="#">Salaries</a>
          </div>

          <div className="nav-actions">
            <a href="/login" className="signin">Sign in</a>
            <a href="/register" className="register">Register</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Find your next job with <span>AJX Recruiter</span>
        </h1>

        <p className="hero-subtitle">
          Search jobs, companies, and career opportunities across India
        </p>

        {/* Search Box */}
        <div className="search-box">

          <div className="search-inputs">
            <input placeholder="Job title, keywords, or company" />
            <input placeholder="City, state, or remote" />
            <button>Search Jobs</button>
          </div>

          <div className="filters">
            <select>
              <option>Job Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <select>
              <option>Work Mode</option>
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>

            <select>
              <option>Experience</option>
              <option>Fresher</option>
              <option>1–3 Years</option>
              <option>3–5 Years</option>
              <option>5+ Years</option>
            </select>

            <select>
              <option>Salary</option>
              <option>₹0–3 LPA</option>
              <option>₹3–6 LPA</option>
              <option>₹6–10 LPA</option>
              <option>₹10+ LPA</option>
            </select>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
