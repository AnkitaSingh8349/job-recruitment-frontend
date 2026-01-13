import { Link } from "react-router-dom";

const FindJobs = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>

          <Link to={`/dashboard/apply/${job.id}`}>
            Apply
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FindJobs;
