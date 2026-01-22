import { Outlet } from "react-router-dom";
import UserNavbar from "../pages/user/components/UserNavbar";

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
