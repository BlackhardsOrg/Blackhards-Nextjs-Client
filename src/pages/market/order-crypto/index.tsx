import OrderCompleteCrypto from "@/components/element/OrderCompleteCrypto";

import MetaComponent from "@/components/common/MetaComponent";
import MarketLayouts from "@/components/layouts/MarketLayouts";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Order",
};

export default function OrderCrypto() {
  return (
    <MarketLayouts>
      <MetaComponent meta={metadata} />
      <OrderCompleteCrypto />
    </MarketLayouts>
  );
}
