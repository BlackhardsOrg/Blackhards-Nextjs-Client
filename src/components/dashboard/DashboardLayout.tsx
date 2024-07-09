import toggleStore from "@/store/toggleStore";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import DashboardFooter from "./footer/DashboardFooter";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/app/hooks";
import { useRouter } from "next/router";
import { links } from "@/data/links";

export default function DashboardLayout({ children }: any) {
  const isActive = toggleStore((state: any) => state.isDasboardSidebarActive);
  const user = useAppSelector(state => state.auth.user)
  let navigate = useRouter().push
  useEffect(() => {
    if (!user) {
      navigate(links.login)
    }
  }, [user])
  return (
    <>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div
          className={`dashboard dashboard_wrapper pr30 pr0-xl ${isActive ? "dsh_board_sidebar_hidden" : ""
            }`}
        >
          <DashboardSidebar />
          <div className="dashboard__main pl0-md">
            {children}
            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}
