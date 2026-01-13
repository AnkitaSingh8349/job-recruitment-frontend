function InterviewInvites() {
  return (
    <div className="section">
      <h3>🎯 Interview Invite</h3>

      <div className="card">
        <h4>Frontend Developer</h4>
        <p>Date: 10 Jan 2026</p>
        <p>Mode: Google Meet</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary">Accept</button>
          <button className="btn-danger">Reject</button>
        </div>
      </div>
    </div>
  );
}

export default InterviewInvites;
