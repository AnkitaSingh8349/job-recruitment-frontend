// src/App.jsx
import { Routes, Route } from "react-router-dom";

/* Layouts */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmployerLayout from "./layouts/EmployerLayout";

/* Pages */
import Home from "./pages/Home";

/* Auth */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Employer (auth + pages) */
import EmployerRegister from "./pages/employer/EmployerRegister";
import Employer from "./pages/employer/Employer";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerAddJob from "./pages/employer/AddJob";
import EmployerJobs from "./pages/employer/jobs";
import EmployerApplication from "./pages/employer/EmployerApplications";


/* User pages */
import UserDashboard from "./pages/user/UserDashboard";
import UserApplications from "./pages/user/MyApplications";
import JobApply from "./pages/user/components/JobApply";
import JobDetails from "./pages/user/JobDetails";

/* Admin pages */
import AdminDashboard from "./pages/admin/AdminDashboard";
import Jobs from "./pages/admin/Jobs";
import AddJob from "./pages/admin/AddJob";
import AdminApplications from "./pages/admin/AdminApplications";
import InviteInterview from "./pages/admin/InviteInterview";

function App() {
  return (
    <Routes>

      {/* ================= USER LAYOUT ================= */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<JobApply />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/applications" element={<UserApplications />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

   {/* ================= EMPLOYER ================= */}
<Route path="/employer" element={<EmployerLayout />}>
  <Route path="register" element={<EmployerRegister />} />
  <Route path="dashboard" element={<EmployerDashboard />} />
  <Route path="jobs" element={<EmployerJobs />} />
  <Route path="add-job" element={<EmployerAddJob />} />
  <Route path="applications" element={<EmployerApplication />} />
  <Route path="profile" element={<Employer />} />
</Route>


      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/add" element={<AddJob />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="applications/invite/:id" element={<InviteInterview />} />
      </Route>

    </Routes>
  );
}

export default App;
