function ProfileCompletion() {
  const percent = 70;

  return (
    <div className="section">
      <h3>👤 Profile Completion</h3>

      <div className="card">
        <div style={{ background: "#e5e7eb", height: "10px", borderRadius: "5px" }}>
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: "#22c55e",
              borderRadius: "5px",
            }}
          />
        </div>

        <p>{percent}% completed</p>
        <button className="btn-primary">Complete Profile</button>
      </div>
    </div>
  );
}

export default ProfileCompletion;
