import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <main className="home">

      <section className="hero">
        <div className="hero-inner split">

          <div className="hero-left">
            <h1 className="hero-title">
              Hire & Get Hired Faster with{" "}
              <span className="brand">AJX Recruiter</span>
            </h1>

            <p className="hero-sub">
              India’s modern recruitment platform for companies & professionals
            </p>

            <div className="hero-actions">
              <Link to="/find-jobs" className="primary-btn">
                Find Jobs
              </Link>

              <Link to="/employer/register" className="secondary-btn">
                Hire Talent
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="mock-board">
              <div className="mock-header" />
              <div className="mock-line" />
              <div className="mock-line short" />
            </div>

            <div className="float-card one">
              UI/UX Designer <span>Remote</span>
            </div>

            <div className="float-card two">
              Backend Developer <span>₹12 LPA</span>
            </div>

            <div className="bubble b1">A</div>
            <div className="bubble b2">R</div>
            <div className="bubble b3">S</div>
          </div>

        </div>
      </section>

      <section className="trust">
        <div>500+ Companies</div>
        <div>10k+ Job Seekers</div>
        <div>Verified Employers</div>
      </section>

    </main>
  );
}

export default Home;
