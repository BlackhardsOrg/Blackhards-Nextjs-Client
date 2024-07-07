import Breadcumb10 from "@/components/breadcumb/Breadcumb10";

import TabSection1 from "@/components/section/TabSection1";

import MetaComponent from "@/components/common/MetaComponent";
import AuctionDetails from "@/components/section/AuctionDetails";
import MarketLayouts from "@/components/layouts/MarketLayouts"

const metadata = {
  title: "Blackhards - Freelance Marketplace ReactJs Template | Project Signle",
};

export default function AuctionPreview() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <TabSection1 />

      <Breadcumb10 path={["Home", "Auctions", "Ghost from Idemili"]} />
      {/* <Breadcumb11 /> */}
      <AuctionDetails />
    </MarketLayouts>
  );
}
