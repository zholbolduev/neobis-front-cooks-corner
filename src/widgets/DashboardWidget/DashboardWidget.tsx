import axios from "axios";
import "./DashboardWidget.scss";
import logo from "./assets/logo.svg";
import logoOn from "./assets/logoOn.svg";
import logout from "./assets/logout.svg";
import home from "./assets/home.svg";
import homeOn from "./assets/homeOn.svg";
import search from "./assets/search.svg";
import searchOn from "./assets/searchOn.svg";
import user from "./assets/user.svg";
import userOn from "./assets/userOn.svg";
import { useLocation, useNavigate } from "react-router";

const DashboardWidget = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isProfilePage = pathname === "/profile";
  const isSearchPage = pathname === "/search";

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://grumpy-weight-cookercorner.up.railway.app/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      handleLogout();
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div className="dashboard__logo">
          <img src={isHomePage ? logoOn : logo} alt="Logo" />
        </div>

        <div className="dashboard__line"></div>

        <div className="dashboard__top">
          <div
            onClick={() => navigate("/")}
            className={`${"dashboard__btn"} ${isHomePage ? "active" : ""}`}
          >
            <img src={isHomePage ? homeOn : home} alt="Home" />
          </div>
          <div
            onClick={() => navigate("/search")}
            className={`${"dashboard__btn"} ${isSearchPage ? "active" : ""}`}
          >
            <img src={isSearchPage ? searchOn : search} alt="Search" />
          </div>
          <div
            onClick={() => navigate("/profile")}
            className={`${"dashboard__btn"} ${isProfilePage ? "active" : ""}`}
          >
            <img src={isProfilePage ? userOn : user} alt="Users" />
          </div>
        </div>

        <div className="dashboard__bottom">
          <div onClick={confirmLogout} className="dashboard__btn">
            <img src={logout} alt="Logout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
