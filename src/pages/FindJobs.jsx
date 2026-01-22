import AjxSearch from "../ajx_search/AjxSearch";
import "./findJobs.css";

const FindJobs = () => {
  return (
    <div className="findjobs-page">
      {/* HERO */}
      <section className="findjobs-hero">
        <h1>
          Find Your <span>Next Job</span>
        </h1>
        <p>
          Search thousands of jobs by skill, location and experience
        </p>

        <div className="search-card-wrapper">
          <AjxSearch />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-row">
        <span>💼 10,000+ Jobs</span>
        <span>🏢 1,200+ Companies</span>
        <span>⚡ AI Powered Search</span>
      </section>
    </div>
  );
};

export default FindJobs;
