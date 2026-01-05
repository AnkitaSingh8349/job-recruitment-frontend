import { Routes, Route } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";

/* User pages */
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ApplyJob from "./pages/admin/ApplyJob";
import UserApplications from "./pages/admin/UserApplications";

/* Admin layout & pages */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Jobs from "./pages/admin/Jobs";
import AddJob from "./pages/admin/AddJob";
import AdminApplications from "./pages/admin/AdminApplications";
import InviteInterview from "./pages/admin/InviteInterview";

function App() {
  return (
    <Routes>
      {/* USER LAYOUT */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
        <Route path="/applications" element={<UserApplications />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/add" element={<AddJob />} />

        {/* APPLICATION MANAGEMENT */}
        <Route path="applications" element={<AdminApplications />} />
        <Route path="applications/invite/:id" element={<InviteInterview />} />
      </Route>
    </Routes>
  );
}

export default App;
