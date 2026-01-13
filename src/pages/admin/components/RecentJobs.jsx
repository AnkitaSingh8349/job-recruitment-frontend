function RecentJobs({ jobs }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>Recent Job Posts</h3>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.location}</td>
              <td>{job.job_type}</td>
              <td>{new Date(job.created_at).toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentJobs;
