import Invoice from "@/components/section/Invoice";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Invoices",
};

export default function InvoicePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Invoice />
    </>
  );
}
