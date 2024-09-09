import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb4 from "@/components/breadcumb/Breadcumb4";
import MarketLayouts from "@/components/layouts/MarketLayouts"
import Listing1 from "@/components/section/Listing1";
import TabSection1 from "@/components/section/TabSection1";

import MetaComponent from "@/components/common/MetaComponent";
import GameListing from "@/components/section/GameListing";
import { useRouter } from "next/router";
const metadata = {
  title: "Blackhards - Game Marketplace | Games",
};

export default function Games() {

  const router = useRouter()
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <TabSection1 />
      <Breadcumb3 path={["Home", router.pathname.split("/")[1]]} />
      <Breadcumb4 />
      <GameListing />
    </MarketLayouts>
  );
}
