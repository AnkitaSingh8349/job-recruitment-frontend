import API from "./auth.api";
/* =========================
   EMPLOYER AUTH
========================= */

// Register Employer
export const registerEmployer = async (data) => {
  const res = await API.post("/api/employer/register/", data);
  return res.data;
};

// Employer Profile
export const getEmployerProfile = async () => {
  const res = await API.get("/api/employer/profile/");
  return res.data;
};


/* =========================
   JOB MANAGEMENT
========================= */

// Create Job (Employer only)
export const createJob = async (data) => {
  const res = await API.post("/api/employer/jobs/create/", data);
  return res.data;
};

// My Jobs
export const getEmployerJobs = async () => {
  const res = await API.get("/api/employer/jobs/");
  return res.data;
};
