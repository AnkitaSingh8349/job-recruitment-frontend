function AddJob() {
  return (
    <div className="admin-form">
      <h3>Add Job</h3>

      <input placeholder="Job Title" />
      <input placeholder="Location" />
      <input placeholder="Job Type" />
      <textarea placeholder="Job Description"></textarea>

      <button>Post Job</button>
    </div>
  );
}

export default AddJob;
