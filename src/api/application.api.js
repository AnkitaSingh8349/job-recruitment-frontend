// const API = "http://127.0.0.1:8000/api";

// const authHeader = () => ({
//   Authorization: `Bearer ${localStorage.getItem("access")}`,
//   "Content-Type": "application/json",
// });

// /* =======================
//    USER APPLY JOB
// ======================= */
// export async function applyJob(data) {
//   const response = await fetch(`${API}/applications/`, {
//     method: "POST",
//     headers: authHeader(),
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// }

// /* =======================
//    USER VIEW APPLICATIONS
// ======================= */
// export async function getMyApplications() {
//   const response = await fetch(`${API}/applications/`, {
//     headers: authHeader(),
//   });

//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// }

// /* =======================
//    ADMIN ACTIONS
// ======================= */

// /* ========= ACCEPT APPLICATION ========= */
// export async function acceptApplication(appId, message = "") {
//   const response = await fetch(
//     `${API}/user/dashboard/applications/${appId}/accept/`,
//     {
//       method: "POST",
//       headers: authHeader(),
//       body: JSON.stringify({ message }),
//     }
//   );

//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// }

// /* ========= REJECT APPLICATION ========= */
// export async function rejectApplication(appId, message) {
//   const response = await fetch(
//     `${API}/user/dashboard/applications/${appId}/reject/`,
//     {
//       method: "POST",
//       headers: authHeader(),
//       body: JSON.stringify({ message }),
//     }
//   );

//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// }

// /* =======================
//    ADMIN INVITE INTERVIEW
// ======================= */
// export async function inviteInterview(payload) {
//   const response = await fetch(
//     `${API}/user/dashboard/admin/interview/create/`,
//     {
//       method: "POST",
//       headers: authHeader(),
//       body: JSON.stringify(payload),
//     }
//   );

//   const result = await response.json();
//   if (!response.ok) throw result;
//   return result;
// }

// /* =======================
//    DELETE APPLICATION
// ======================= */
// export async function deleteApplication(appId) {
//   const response = await fetch(
//     `${API}/applications/${appId}/remove/`,
//     {
//       method: "DELETE",
//       headers: authHeader(),
//     }
//   );

//   if (!response.ok) {
//     const err = await response.json();
//     throw err;
//   }
// }
// src/services/applicationApi.js
import apiBase from "../services/apiBase";

export async function applyJob(data) {
  const res = await apiBase.post("/applications/", data);
  return res.data;
}

export async function getMyApplications() {
  const res = await apiBase.get("/applications/");
  return res.data;
}

export async function acceptApplication(appId, message = "") {
  const res = await apiBase.post(
    `/user/dashboard/applications/${appId}/accept/`,
    { message }
  );
  return res.data;
}

export async function rejectApplication(appId, message) {
  const res = await apiBase.post(
    `/user/dashboard/applications/${appId}/reject/`,
    { message }
  );
  return res.data;
}

export async function inviteInterview(payload) {
  const res = await apiBase.post(
    "/user/dashboard/admin/interview/create/",
    payload
  );
  return res.data;
}

export async function deleteApplication(appId) {
  await apiBase.delete(`/applications/${appId}/remove/`);
}
