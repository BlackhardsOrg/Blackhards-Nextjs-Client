import OrderComplete1 from "@/components/element/OrderComplete1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Shop Order",
};

export default function ShopPageOrder() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <OrderComplete1 />
    </>
  );
}
