import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminApi";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading...</p>;

  const cards = [
    { label: "Total Jobs", value: stats.totalJobs },
    { label: "Total Applications", value: stats.totalApplications },
    { label: "Shortlisted", value: stats.shortlisted },
    { label: "Rejected", value: stats.rejected },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((item, index) => (
        <div className="dashboard-card" key={index}>
          <h4>{item.label}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
