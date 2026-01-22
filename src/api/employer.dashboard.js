import adminApi from "../pages/admin/services/adminApi";

export const getEmployerDashboardStats = async () => {
  const res = await adminApi.get("/employer/dashboard/");
  return res.data;
};

export const getEmployerProfile = async () => {
  const res = await adminApi.get("/employer/profile/");
  return res.data;
};
