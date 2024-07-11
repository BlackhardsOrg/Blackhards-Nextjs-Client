import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageGameInfo from "@/components/dashboard/section/ManageGameInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

import MetaComponent from "@/components/common/MetaComponent";
import LibraryInfo from "@/components/dashboard/section/LibraryInfo";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Manage Project",
};

export default function DasbPageManageProjects() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MobileNavigation2 />
      <DashboardLayout>
        <LibraryInfo />
      </DashboardLayout>
    </>
  );
}
