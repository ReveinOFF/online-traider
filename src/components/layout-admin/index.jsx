import { Outlet } from "react-router-dom";
import Footer from "../footer";
import AdminHeader from "../header-admin";

const AdminLayout = () => {
  return (
    <div className="layout">
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
