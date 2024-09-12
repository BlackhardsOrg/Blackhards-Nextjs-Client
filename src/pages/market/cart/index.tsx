import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import HeaderInfo1 from "@/components/section/HeaderInfo1";
import ShopCartArea1 from "@/components/section/ShopCartArea1";

import MetaComponent from "@/components/common/MetaComponent";
import MarketLayouts from "@/components/layouts/MarketLayouts";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Cart",
};

export default function ShopPageCart() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <Breadcumb3 path={["Home", "cart"]} />
      <HeaderInfo1
        title="Cart"
        brief="Your digital basket"
      />
      <ShopCartArea1 />
    </MarketLayouts>
  );
}
