import Breadcumb3 from "@/components/breadcumb/Breadcumb3";

import HeaderInfo1 from "@/components/section/HeaderInfo1";

import MetaComponent from "@/components/common/MetaComponent";
import MarketLayouts from "@/components/layouts/MarketLayouts";
import CheckoutArea from "@/components/section/CheckoutArea";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Checkout",
};

export default function ShopPageCheckout() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <Breadcumb3 path={["Home", "Checkout"]} />
      <HeaderInfo1
        title="Checkout"
        brief="Become a Game owner 'as e dey hot!'"
      />
      <CheckoutArea />
    </MarketLayouts>
  );
}
