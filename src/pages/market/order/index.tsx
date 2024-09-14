import OrderComplete from "@/components/element/OrderComplete";

import MetaComponent from "@/components/common/MetaComponent";
import MarketLayouts from "@/components/layouts/MarketLayouts";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Order",
};

export default function Order() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <OrderComplete />
    </MarketLayouts>
  );
}
