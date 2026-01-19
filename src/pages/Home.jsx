import "./home.css";
import AjxSearch from "../ajx_search/AjxSearch";

function Home() {
  return (
    <main className="home">
      {/* 🔹 HERO SECTION */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            Find your next job with{" "}
            <span className="brand">AJX Recruiter</span>
          </h1>

          <p className="hero-sub">
            Search jobs, companies, and career opportunities across India
          </p>

          {/* 🔍 SEARCH COMPONENT (AI + FILTERS + POST API) */}
          <AjxSearch />
        </div>
      </section>
    </main>
  );
}

export default Home;
