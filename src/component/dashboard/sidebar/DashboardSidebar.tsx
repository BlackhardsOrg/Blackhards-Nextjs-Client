import { logout } from "@/redux/features/auth/authThunks";

import { dasboardNavigation } from "@/data/dashboard";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleClick = async () => {
    console.log("called");
    await dispatch(logout());
  };


  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          <p className="fz15 fw400 ff-heading pl30">Organize</p>
          {dasboardNavigation.slice(0, 10).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link
                to={item.path}
                className={`items-center ${
                  pathname === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          <p className="fz15 fw400 ff-heading pl30 mt30">Account</p>

          {dasboardNavigation.slice(10, 12).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link
                // to={item.path}
                className={`items-center ${
                  pathname === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          {dasboardNavigation.slice(12, 13).map((item, i) => (
            <div
              onClick={async () => {
                console.log("called")
                await dispatch(logout());
              }}
              key={i}
              className="sidebar_list_item mb-1"
            >
              <Link
                to={item.path}
                className={`items-center ${
                  pathname === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
}
