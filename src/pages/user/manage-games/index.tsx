import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageGameInfo from "@/components/dashboard/section/ManageGameInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Manage Games",
};

export default function DasbPageManageProjects() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MobileNavigation2 />
      <DashboardLayout>
        <ManageGameInfo />
      </DashboardLayout>
    </>
  );
}
