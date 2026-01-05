import { useState } from "react";
import { applyJob } from "../../api/application.api";


export default function ApplyJob({ jobId }) {
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      await applyJob({ job: jobId });
      alert("Application submitted");
    } catch {
      alert("Already applied or error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleApply} disabled={loading}>
      Apply
    </button>
  );
}
