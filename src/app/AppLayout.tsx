import { Outlet, useLocation } from "react-router";
import "./globalStyles.scss";

const AppLayout = () => {
  const { pathname } = useLocation();
  const watch = pathname.slice(0, 6);

  return (
    <div className={watch === "/watch" ? "app__layout-none" : "app__layout"}>
      {/* <Dashboard /> */}

      <div className="app__layout_content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
