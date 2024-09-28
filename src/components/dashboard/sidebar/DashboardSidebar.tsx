
import { dasboardNavigation } from "@/data/dashboard";
import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { persistor } from "@/redux/app/store";
import { logoutUser } from "@/redux/features/auth/api/authApi";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

export default function DashboardSidebar() {
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  const navigate = useRouter().push

  const user = useAppSelector(state => state.auth.user)

  const handleLogout = async (e: any) => {
    await dispatch(logoutUser(user.token));
    persistor.purge().then(() => {
      navigate(links.login);
    });
  };


  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {/* <p className="fz15 fw400 ff-heading pl30">Organize</p> */}
          <p className="fz15 fw400 ff-heading pl30">Organize and Manage</p>

          {dasboardNavigation.slice(0, 3).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${pathname === item.path ? "-is-active" : ""
                  }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          <p className="fz15 fw400 ff-heading pl30 mt30">Account</p>

          
          {dasboardNavigation.slice(3, 4).map((item, i) => (
            <div
              // onClick={handleLogout}
              key={i}
              className="sidebar_list_item mb-1"
            >
              <Link

                data-bs-toggle="modal"
                href="#logoutModalToggle"
                className={`items-center ${pathname === item.path ? "-is-active" : ""
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
