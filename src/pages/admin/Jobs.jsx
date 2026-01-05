function Jobs() {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Location</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Frontend Developer</td>
          <td>Remote</td>
          <td>Full Time</td>
          <td>
            <button className="btn-edit">Edit</button>
            <button className="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Jobs;
