import DashboardLayout from "@/components/dashboard/DashboardLayout";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

import MetaComponent from "@/components/common/MetaComponent";
import ManageAuctionInfo from "@/components/dashboard/section/ManageAuctionInfo";
const metadata = {
  title: "Blackhards - Ai Powered Game Marketplace | Manage Auctions",
};

export default function DasbPageManageService() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MobileNavigation2 />
      <DashboardLayout>
        <ManageAuctionInfo />
      </DashboardLayout>
    </>
  );
}
