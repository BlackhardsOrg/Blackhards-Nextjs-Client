import OurFaqSection1 from "@/components/section/OurFaqSection1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Blackhards - AI Powered Game Project Marketplace | Help",
};

export default function HelpPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <OurFaqSection1 />
    </>
  );
}
