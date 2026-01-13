function Profile() {
  return (
    <>
      <h2 className="user-title">My Profile</h2>

      <div className="card">
        <input placeholder="First Name" />
        <input placeholder="Last Name" />
        <input placeholder="Email" disabled />
        <button className="btn-primary">Save</button>
      </div>
    </>
  );
}

export default Profile;
