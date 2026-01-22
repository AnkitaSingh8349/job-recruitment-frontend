import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import EmployerLayout from "./layouts/EmployerLayout";

/* Pages */
import Home from "./pages/Home";
import FindJobs from "./pages/FindJobs";

/* Auth */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

/* Employer */
import EmployerRegister from "./pages/employer/EmployerRegister";
import Employer from "./pages/employer/Employer";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerAddJob from "./pages/employer/AddJob";
import EmployerJobs from "./pages/employer/jobs";
import EmployerApplication from "./pages/employer/EmployerApplications";

/* User */
import UserDashboard from "./pages/user/UserDashboard";
import UserApplications from "./pages/user/MyApplications";
import JobDetails from "./pages/user/JobDetails";

/* USER COMPONENTS */
import JobApply from "./pages/user/components/JobApply";
import RecommendedJobs from "./pages/user/components/RecommendedJobs";
import RecentApplications from "./pages/user/components/RecentApplications";

/* Admin */
import AdminDashboard from "./pages/admin/AdminDashboard";
import Jobs from "./pages/admin/Jobs";
import AddJob from "./pages/admin/AddJob";
import AdminApplications from "./pages/admin/AdminApplications";
import InviteInterview from "./pages/admin/InviteInterview";

function App() {
  return (
    <Routes>

      {/* 🌍 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/register" element={<EmployerRegister />} />
      </Route>

      {/* 🔁 REDIRECT /apply/:jobId → /user/apply/:jobId */}
      <Route
        path="/apply/:jobId"
        element={<Navigate to="/user/apply/:jobId" replace />}
      />

      {/* 👤 USER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="applications" element={<UserApplications />} />
          <Route path="apply/:jobId" element={<JobApply />} />
          <Route path="recommended-jobs" element={<RecommendedJobs />} />
          <Route path="recent-applications" element={<RecentApplications />} />
        </Route>
      </Route>

      {/* 🧑‍💼 EMPLOYER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="dashboard" element={<EmployerDashboard />} />
          <Route path="jobs" element={<EmployerJobs />} />
          <Route path="add-job" element={<EmployerAddJob />} />
          <Route path="applications" element={<EmployerApplication />} />
          <Route path="profile" element={<Employer />} />
        </Route>
      </Route>

      {/* 👑 ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/add" element={<AddJob />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="applications/invite/:id" element={<InviteInterview />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;
