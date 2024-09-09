import Breadcumb10 from "@/components/breadcumb/Breadcumb10";

import TabSection1 from "@/components/section/TabSection1";

import MetaComponent from "@/components/common/MetaComponent";
import AuctionDetails from "@/components/section/AuctionDetails";
import MarketLayouts from "@/components/layouts/MarketLayouts"
import PlaceBidModal from "@/components/modal/PlaceBidModal";

const metadata = {
  title: "Blackhards - Game Marketplace| Game",
};

export default function AuctionPreview() {
  return (
    <MarketLayouts>
        {/* <PlaceBidModal /> */}

      <MetaComponent meta={metadata} />
      <TabSection1 />

      <Breadcumb10 path={["Home", "Auctions", "Ghost from Idemili"]} />
      {/* <Breadcumb11 /> */}
      <AuctionDetails />
    </MarketLayouts>
  );
}
