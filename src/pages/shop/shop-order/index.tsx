import OrderComplete1 from "@/components/element/OrderComplete1";

import MetaComponent from "@/components/common/MetaComponent";
import MarketLayouts from "@/components/layouts/MarketLayouts";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Order",
};

export default function ShopPageOrder() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <OrderComplete1 />
    </MarketLayouts>
  );
}
