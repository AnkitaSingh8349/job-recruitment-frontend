// import adminApi from "./adminApi";

// export const fetchDashboardStats = async () => {
//   const res = await adminApi.get("dashboard/stats/");
//   return res.data;
// };

// export const fetchRecentJobs = async () => {
//   const res = await adminApi.get("dashboard/recent-jobs/");
//   return res.data;
// };
import adminApi from "./adminApi";

export const fetchDashboardStats = async () => {
  const res = await adminApi.get("/dashboard/stats/");
  return res.data;
};

export const fetchRecentJobs = async () => {
  const res = await adminApi.get("/dashboard/recent-jobs/");
  return res.data;
};
