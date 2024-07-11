import PriceTable1 from "@/components/section/PriceTable1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Pricing",
};

export default function PricingPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PriceTable1 />
    </>
  );
}
