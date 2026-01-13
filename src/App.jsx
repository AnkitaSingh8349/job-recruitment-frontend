import { Routes, Route } from "react-router-dom";

/* Layouts */
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

/* Public */
import Home from "./pages/Home";

/* Auth */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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

      {/* PUBLIC + USER LAYOUT */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:jobId" element={<JobApply />} />

        {/* ✅ CORRECT PLACE */}
        <Route path="/jobs/:id" element={<JobDetails />} />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="applications" element={<UserApplications />} />
      </Route>

      {/* ADMIN */}
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
