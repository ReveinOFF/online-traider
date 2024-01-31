import Header from "../header";
import Footer from "../footer";
import { Outlet } from "react-router-dom";
import "./layout.style.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
