const API = "http://127.0.0.1:8000/api";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("access")}`,
  "Content-Type": "application/json",
});

// USER APPLY
export async function applyJob(data) {
  const response = await fetch(`${API}/applications/apply/`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw result;
  return result;
}

// USER VIEW
export async function myApplications() {
  const response = await fetch(`${API}/applications/my/`, {
    headers: authHeader(),
  });

  const result = await response.json();
  if (!response.ok) throw result;
  return result;
}

// ADMIN VIEW PENDING
export async function pendingApplications() {
  const response = await fetch(`${API}/admin/applications/pending/`, {
    headers: authHeader(),
  });

  const result = await response.json();
  if (!response.ok) throw result;
  return result;
}

// ADMIN INVITE
export async function inviteInterview(appId, data) {
  const response = await fetch(
    `${API}/admin/applications/invite/${appId}/`,
    {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();
  if (!response.ok) throw result;
  return result;
}
