import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Payout",
};

export default function DasbPagePayouts() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <MobileNavigation2 />
      <DashboardLayout>
        <PayoutInfo />
      </DashboardLayout>
    </>
  );
}
