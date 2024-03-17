import { Outlet, useLocation } from "react-router";
import "./globalStyles.scss";
import DashboardWidget from "../widgets/DashboardWidget/DashboardWidget";

const AppLayout = () => {
  const { pathname } = useLocation();
  const watch = pathname.slice(0, 6);

  return (
    <div className={watch === "/watch" ? "app__layout-none" : "app__layout"}>
      <DashboardWidget />

      <div className="app__layout_content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
