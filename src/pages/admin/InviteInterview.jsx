import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyJob } from "../../api/application.api";


export default function InviteInterview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    interview_date: "",
    interview_link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await inviteInterview(id, form);
    alert("Interview invited");
    navigate("/admin/applications");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="datetime-local"
        onChange={(e) =>
          setForm({ ...form, interview_date: e.target.value })
        }
        required
      />

      <input
        placeholder="Interview link"
        onChange={(e) =>
          setForm({ ...form, interview_link: e.target.value })
        }
        required
      />

      <button>Send Invite</button>
    </form>
  );
}
