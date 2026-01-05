export const getDashboardStats = async () => {
  return {
    totalJobs: 12,
    totalApplications: 87,
    shortlisted: 24,
    rejected: 15,
  };
};

export const getRecentJobs = async () => {
  return [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      date: "01 Jan 2026",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "Bangalore",
      type: "Full Time",
      date: "30 Dec 2025",
    },
  ];
};
