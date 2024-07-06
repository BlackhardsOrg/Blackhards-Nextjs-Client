import Breadcumb18 from "@/components/breadcumb/Breadcumb18";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import Listing19 from "@/components/section/Listing19";
import TabSection1 from "@/components/section/TabSection1";
import MetaComponent from "@/components/common/MetaComponent";
import AuctionListing from "@/components/section/AuctionListing";
import Breadcumb4 from "@/components/breadcumb/Breadcumb4";
const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | Project 1",
};

export default function ProjectPage4() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <TabSection1 />
      <Breadcumb3 path={["Home", "auctions"]} />
      <div className=" bgc-thm3">
        <Breadcumb4 title="Auctions" subtitle="Bid for the Best" img="/images/vector-img/Blackhards-auctions-532by300.png"/>
        <AuctionListing />
      </div>
    </>
  );
}
